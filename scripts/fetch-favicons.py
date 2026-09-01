"""
Downloads the sharpest icon each site offers, and records whether it is a pale
logo that needs a dark tile behind it.

Candidates come from the page's <link> tags, its web app manifest and the
conventional paths, and every one is decoded and measured — the biggest wins,
so a 32x32 favicon.ico never beats a 512px apple-touch-icon.

Writes public/icons/, public/vendors/ and src/data/icons.json.
Usage: python3 scripts/fetch-favicons.py [--only groq,mistral]
"""
import argparse
import io
import json
import pathlib
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public'
MANIFEST = ROOT / 'src/data/icons.json'

UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/126 Safari/537.36')
TIMEOUT = 12
# 256 is four times the largest size the site renders an icon at
MAX_EDGE = 256
SVG_SCORE = 10_000

EXT_BY_TYPE = {
    'image/svg+xml': 'svg', 'image/png': 'png', 'image/jpeg': 'jpg',
    'image/webp': 'webp', 'image/x-icon': 'ico', 'image/vnd.microsoft.icon': 'ico',
    'image/gif': 'gif'
}

CONVENTIONAL = [
    '/apple-touch-icon.png', '/apple-touch-icon-precomposed.png',
    '/android-chrome-512x512.png', '/android-chrome-192x192.png',
    '/icon.svg', '/favicon.svg', '/icon.png', '/favicon-196x196.png',
    '/favicon-192x192.png', '/favicon-96x96.png', '/favicon.ico'
]

# Hosts where the apex is somebody else's brand, so never climb to it
SHARED_HOSTS = {
    'vercel.app', 'github.io', 'netlify.app', 'pages.dev', 'herokuapp.com',
    'fly.dev', 'workers.dev', 'web.app', 'firebaseapp.com', 'streamlit.app',
    'hf.space', 'gitbook.io', 'readthedocs.io', 'notion.site'
}


def apex_of(host):
    """console.groq.com -> groq.com, where the good assets usually live."""
    labels = host.split('.')
    if len(labels) < 3:
        return None
    apex = '.'.join(labels[-2:])
    return None if apex in SHARED_HOSTS else apex


# Logos the automatic tone pass gets wrong: multicolour marks that read fine on
# white, and pale marks whose colour lives in a gradient the parser cannot see.
TONE_OVERRIDES = {'google': 'dark', 'openai': 'dark', 'poolside': 'light'}


def get(url, as_text=False):
    request = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept': '*/*'})
    with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
        body = response.read()
        kind = response.headers.get('content-type', '')
    return (body.decode('utf-8', 'replace'), kind) if as_text else (body, kind)


def looks_like_image(data, ext):
    head = data[:5].strip().lower()
    if head.startswith(b'<!doc') or head.startswith(b'<html'):
        return False
    if ext == 'svg':
        return b'<svg' in data[:400].lower()
    if ext == 'png':
        return data[1:4] == b'PNG'
    if ext == 'jpg':
        return data[:2] == b'\xff\xd8'
    if ext == 'webp':
        return data[8:12] == b'WEBP'
    if ext == 'ico':
        return data[:3] == b'\x00\x00\x01'
    return True


def candidates_from_html(html, base):
    """<link rel=icon> and friends, plus whatever the web app manifest lists."""
    found = []
    for tag in re.findall(r'<link\b[^>]*>', html, re.I):
        def attr(name):
            match = re.search(rf'{name}=["\']([^"\']+)["\']', tag, re.I)
            return match.group(1) if match else ''

        rel = attr('rel').lower()
        href = attr('href')
        if not href or href.startswith('data:'):
            continue
        if 'icon' in rel and 'mask-icon' not in rel:
            found.append(urllib.parse.urljoin(base, href))
        elif rel == 'manifest':
            try:
                raw, _ = get(urllib.parse.urljoin(base, href), as_text=True)
                for icon in json.loads(raw).get('icons', []):
                    if icon.get('src'):
                        found.append(urllib.parse.urljoin(base, icon['src']))
            except Exception:
                pass
    return found


def measure(data, ext):
    """Score by the shortest edge; vectors always win."""
    if ext == 'svg':
        return SVG_SCORE, None
    try:
        image = Image.open(io.BytesIO(data))
        if ext == 'ico':
            # Pillow opens the first frame; the largest is what we want
            best = max(image.ico.sizes()) if hasattr(image, 'ico') else image.size
            return min(best), best
        return min(image.size), image.size
    except Exception:
        return 0, None


def normalise(data, ext):
    """Trim anything far larger than the page needs; leave vectors alone."""
    if ext == 'svg':
        return data, ext
    image = Image.open(io.BytesIO(data))
    if ext == 'ico':
        image = Image.open(io.BytesIO(data))
        largest = max(image.ico.sizes()) if hasattr(image, 'ico') else image.size
        image = image.ico.getimage(largest) if hasattr(image, 'ico') else image
    image = image.convert('RGBA')
    if max(image.size) > MAX_EDGE:
        image.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
    buffer = io.BytesIO()
    image.save(buffer, 'PNG', optimize=True)
    return buffer.getvalue(), 'png'


def tone_of(data, ext):
    """`light` marks a pale logo, which needs a dark tile to stay visible."""
    if ext == 'svg':
        text = re.sub(r'<defs\b.*?</defs>', '', data.decode('utf-8', 'replace'), flags=re.S | re.I)
        values = []
        for raw in re.findall(
            r'(?:fill|stop-color|stroke)\s*[:=]\s*["\']?(#[0-9a-fA-F]{3,6}|white|black)', text
        ):
            if raw == 'white':
                values.append(255.0)
            elif raw == 'black':
                values.append(0.0)
            else:
                value = raw.lstrip('#')
                if len(value) == 3:
                    value = ''.join(char * 2 for char in value)
                if len(value) != 6:
                    continue
                r, g, b = (int(value[i:i + 2], 16) for i in (0, 2, 4))
                values.append(0.2126 * r + 0.7152 * g + 0.0722 * b)
        if not values:
            return 'dark'
        return 'light' if sum(values) / len(values) > 178 else 'dark'

    image = Image.open(io.BytesIO(data)).convert('RGBA').resize((48, 48))
    total = weight = 0.0
    for r, g, b, a in image.getdata():
        if a < 32:
            continue
        alpha = a / 255
        total += (0.2126 * r + 0.7152 * g + 0.0722 * b) * alpha
        weight += alpha
    if weight < 8:
        return 'dark'
    return 'light' if total / weight > 178 else 'dark'


def best_icon(site):
    origin = '{0.scheme}://{0.netloc}'.format(urllib.parse.urlsplit(site))
    host = urllib.parse.urlsplit(site).hostname or ''

    # A subdomain often ships only a 32px .ico while the brand site has an SVG
    apex = apex_of(host)
    roots = [origin] + ([f'https://{apex}'] if apex else [])

    urls = []
    for root in roots:
        try:
            html, _ = get(root, as_text=True)
            urls += candidates_from_html(html, root)
        except Exception:
            pass
        urls += [root + path for path in CONVENTIONAL]
    urls.append(f'https://www.google.com/s2/favicons?sz=256&domain={host}')

    seen, ordered = set(), []
    for url in urls:
        if url not in seen:
            seen.add(url)
            ordered.append(url)

    best = None
    for url in ordered[:26]:
        try:
            data, kind = get(url)
        except Exception:
            continue
        ext = EXT_BY_TYPE.get(kind.split(';')[0].strip().lower())
        if not ext:
            ext = url.rsplit('.', 1)[-1].split('?')[0].lower()
        if ext not in EXT_BY_TYPE.values() or not data or not looks_like_image(data, ext):
            continue
        score, size = measure(data, ext)
        if score and (best is None or score > best[0]):
            best = (score, data, ext, size, url)
        if best and best[0] >= SVG_SCORE:
            break
    return best


def run(target):
    key, site, folder = target
    best = best_icon(site)
    if not best:
        return key, folder, None, 'no usable icon'

    score, data, ext, size, url = best
    data, ext = normalise(data, ext)
    path = PUBLIC / folder / f'{key}.{ext}'
    for stale in (PUBLIC / folder).glob(f'{key}.*'):
        stale.unlink()
    path.write_bytes(data)

    tone = TONE_OVERRIDES.get(key, tone_of(data, ext))
    label = 'vector' if score >= SVG_SCORE else f'{size[0]}x{size[1]}'
    return key, folder, {'src': f'/{folder}/{path.name}', 'tone': tone}, label


def targets(only):
    resources = (ROOT / 'src/data/resources.ts').read_text()
    models = (ROOT / 'src/data/models.ts').read_text()

    found = [
        (rid, url, 'icons')
        for rid, url in re.findall(
            r"id: '([^']+)',\n\t\tname: '[^']*',\n\t\turl: '([^']+)'", resources
        )
    ] + [
        (vid, site, 'vendors')
        for vid, site in re.findall(r"\{ id: '([^']+)', name: '[^']*', site: '([^']+)' \}", models)
    ]
    if only:
        wanted = {name.strip() for name in only.split(',')}
        found = [item for item in found if item[0] in wanted]
    return found


parser = argparse.ArgumentParser()
parser.add_argument('--only', help='comma-separated ids, for re-fetching a few')
parser.add_argument('--tones', action='store_true',
                    help='recompute light/dark from the files already on disk')
args = parser.parse_args()

if args.tones:
    existing = json.loads(MANIFEST.read_text())
    for folder, entries in existing.items():
        for key, entry in entries.items():
            path = PUBLIC / entry['src'].lstrip('/')
            if not path.exists():
                print(f'  missing   {entry["src"]}')
                continue
            tone = TONE_OVERRIDES.get(key, tone_of(path.read_bytes(), path.suffix.lstrip('.')))
            if tone != entry['tone']:
                print(f'  {entry["tone"]} -> {tone}  {entry["src"]}')
            entry['tone'] = tone
    MANIFEST.write_text(json.dumps(existing, indent='\t') + '\n')
    total = sum(1 for f in existing.values() for e in f.values() if e['tone'] == 'light')
    print(f'\n{total} light logos need a dark tile')
    sys.exit(0)

work = targets(args.only)
if not work:
    sys.exit('nothing to fetch')

for folder in ('icons', 'vendors'):
    (PUBLIC / folder).mkdir(parents=True, exist_ok=True)

manifest = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}
manifest.setdefault('icons', {})
manifest.setdefault('vendors', {})

failed = []
with ThreadPoolExecutor(max_workers=8) as pool:
    for key, folder, entry, label in pool.map(run, work):
        if entry:
            manifest[folder][key] = entry
            print(f'  {label:>9}  {folder}/{key}  {entry["tone"]}')
        else:
            failed.append(f'{folder}/{key}')
            print(f'  {"failed":>9}  {folder}/{key} — {label}')

for folder in ('icons', 'vendors'):
    manifest[folder] = dict(sorted(manifest[folder].items()))

MANIFEST.write_text(json.dumps(manifest, indent='\t') + '\n')
print(f'\n{len(work) - len(failed)}/{len(work)} icons')
if failed:
    print('missing:', ', '.join(failed))
