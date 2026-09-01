"""
Draws a 1200×630 PNG for every shareable route, using the site's Geist faces
so the card matches the page it links to.

OpenGraph.to rules this script enforces:
- 1200×630 (1.91:1), never larger than 4096 on a side
- PNG, under 500 KB (WhatsApp drops anything heavier)
- absolute files in public/, so og:image can be an HTTPS URL

Usage: python3 scripts/build-og-image.py
"""
import math
import pathlib
import re
import tempfile

from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONTS = ROOT / 'public/fonts'
PUBLIC = ROOT / 'public'
OG_DIR = PUBLIC / 'og'

BG = (0, 0, 0, 255)
FG = (237, 237, 237, 255)
MUTED = (155, 152, 145, 255)
FAINT = (74, 72, 68, 255)
STAR = (240, 180, 41, 255)
RULE = (31, 31, 31, 255)

WIDTH, HEIGHT = 1200, 630
PAD = 72
MAX_BYTES = 500 * 1024


def static_face(woff2_name, weight=None):
    """woff2 -> a static TTF Pillow can render, pinned to one weight."""
    source = FONTS / woff2_name
    font = TTFont(source, fontNumber=0)
    if weight is not None and 'fvar' in font:
        font = instancer.instantiateVariableFont(font, {'wght': weight})
    handle = tempfile.NamedTemporaryFile(suffix='.ttf', delete=False)
    font.save(handle.name)
    return handle.name


sans_bold = static_face('geist-latin-wght-normal.woff2', 600)
sans_regular = static_face('geist-latin-wght-normal.woff2', 400)
mono = static_face('geist-mono-latin-wght-normal.woff2', 400)

headline = ImageFont.truetype(sans_bold, 76)
headline_sm = ImageFont.truetype(sans_bold, 56)
body = ImageFont.truetype(sans_regular, 30)
label = ImageFont.truetype(mono, 22)
figure = ImageFont.truetype(mono, 40)
caption = ImageFont.truetype(mono, 20)


def wrap(draw, text, font, max_width, limit=3):
    words = text.split()
    lines, current = [], ''
    for word in words:
        trial = f'{current} {word}'.strip()
        if draw.textlength(trial, font=font) <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    if len(lines) > limit:
        head, last = lines[:limit], lines[limit - 1]
        while draw.textlength(last + '…', font=font) > max_width and last:
            last = last.rsplit(' ', 1)[0] if ' ' in last else last[:-1]
        head[-1] = f'{last}…'
        return head
    return lines


def asterisk(draw, centre, reach, width, fill):
    """The wordmark's mark: three strokes crossing, six arms."""
    for index in range(3):
        angle = math.pi / 2 + index * math.pi / 3
        dx, dy = math.cos(angle) * reach, math.sin(angle) * reach
        draw.line(
            [(centre[0] - dx, centre[1] - dy), (centre[0] + dx, centre[1] + dy)],
            fill=fill, width=width
        )
        for sign in (-1, 1):
            x, y = centre[0] + sign * dx, centre[1] + sign * dy
            draw.ellipse([x - width / 2, y - width / 2, x + width / 2, y + width / 2], fill=fill)


def draw_wordmark(draw):
    asterisk(draw, (PAD + 17, PAD + 17), 15, 7, FG)
    draw.text((PAD + 48, PAD + 2), "it's free", font=label, fill=FG)
    mark_width = draw.textlength("it's free", font=label)
    draw.text((PAD + 48 + mark_width, PAD + 2), '*', font=label, fill=STAR)
    draw.text(
        (PAD + 48 + mark_width + draw.textlength('*', font=label), PAD + 2),
        '.ai',
        font=label,
        fill=MUTED
    )


def draw_figures(draw, figures):
    if not figures:
        return
    draw.line([(PAD, 528), (WIDTH - PAD, 528)], fill=RULE, width=1)
    x = PAD
    for value, name in figures:
        draw.text((x, 556), value, font=figure, fill=FG)
        value_width = draw.textlength(value, font=figure)
        draw.text((x + value_width + 12, 568), name, font=caption, fill=FAINT)
        x += value_width + draw.textlength(name, font=caption) + 60


def save(card, path: pathlib.Path):
    path.parent.mkdir(parents=True, exist_ok=True)
    card.convert('RGB').save(path, 'PNG', optimize=True)
    size = path.stat().st_size
    if size >= MAX_BYTES:
        raise SystemExit(f'{path} is {size} bytes — WhatsApp drops OG images over 500 KB')
    image = Image.open(path)
    if image.size != (WIDTH, HEIGHT):
        raise SystemExit(f'{path} is {image.size}, expected {WIDTH}x{HEIGHT}')
    return size


def render_home(headline_lines, sub_lines, figures):
    card = Image.new('RGBA', (WIDTH, HEIGHT), BG)
    draw = ImageDraw.Draw(card)
    draw_wordmark(draw)
    y = 196
    for line in headline_lines:
        draw.text((PAD, y), line, font=headline, fill=FG)
        y += 90
    y = 402
    for line in sub_lines:
        draw.text((PAD, y), line, font=body, fill=MUTED)
        y += 40
    draw_figures(draw, figures)
    return card


def render_page(eyebrow, title, sub, figures):
    card = Image.new('RGBA', (WIDTH, HEIGHT), BG)
    draw = ImageDraw.Draw(card)
    draw_wordmark(draw)
    inner = WIDTH - PAD * 2

    draw.text((PAD, 168), eyebrow.upper(), font=label, fill=MUTED)

    title_font = headline if draw.textlength(title, font=headline) <= inner else headline_sm
    title_lines = wrap(draw, title, title_font, inner, limit=2)
    y = 214
    step = 88 if title_font == headline else 68
    for line in title_lines:
        draw.text((PAD, y), line, font=title_font, fill=FG)
        y += step

    y = max(y + 16, 390)
    for line in wrap(draw, sub, body, inner, limit=2):
        draw.text((PAD, y), line, font=body, fill=MUTED)
        y += 40

    draw_figures(draw, figures)
    return card


def read(rel):
    return (ROOT / rel).read_text()


def parse_resources():
    text = read('src/data/resources.ts')
    start = text.index('export const RESOURCES')
    chunk = text[start:]
    items = []
    for match in re.finditer(
        r"id: '([^']+)',\s*name: '([^']+)',\s*url: '[^']+',\s*description: '([^']*)'",
        chunk,
    ):
        items.append({'id': match.group(1), 'name': match.group(2), 'description': match.group(3)})
    quotas = dict(re.findall(r"id: '([^']+)'.*?quota: '([^']*)'", chunk, re.S))
    categories = dict(re.findall(r"id: '([^']+)'.*?category: '([^']*)'", chunk, re.S))
    for item in items:
        item['quota'] = quotas.get(item['id'], '')
        item['category'] = categories.get(item['id'], '')
    return items


def parse_provider_ids():
    text = read('src/data/providers.ts')
    ids = set()
    for match in re.finditer(r"^\t(?:'([^']+)'|([A-Za-z][A-Za-z0-9_-]*)): \{", text, re.M):
        ids.add(match.group(1) or match.group(2))
    free = sum(int(n) for n in re.findall(r'freeModels: (\d+)', text))
    return ids, free


def parse_models():
    text = read('src/data/models.ts')
    models = []
    for match in re.finditer(r"slug: '([^']+)',\s*name: '([^']+)',\s*vendor: '([^']+)'", text):
        models.append({'slug': match.group(1), 'name': match.group(2), 'vendor': match.group(3)})
    vendors = dict(re.findall(r"^\t([a-z0-9]+): \{ id: '[^']+', name: '([^']+)'", text, re.M))
    open_weights = len(re.findall(r'openWeights: true', text))
    return models, vendors, open_weights


def parse_collections():
    text = read('src/data/collections.ts')
    collections = []
    for match in re.finditer(
        r"slug: '([^']+)',\s*title: '([^']*)',\s*description:\s*'([^']*)',\s*heading: '([^']*)'",
        text,
    ):
        collections.append({
            'slug': match.group(1),
            'title': match.group(2),
            'description': match.group(3),
            'heading': match.group(4),
        })
    return collections


resources = parse_resources()
provider_ids, free_model_count = parse_provider_ids()
models, vendors, open_weights = parse_models()
collections = parse_collections()

providers = [item for item in resources if item['id'] in provider_ids]
access = [item for item in resources if item['category'] == 'api' and item['id'] in provider_ids]
runtimes = [item for item in resources if item['category'] == 'local']

written = []


def write(rel, card):
    path = PUBLIC / rel
    size = save(card, path)
    written.append((rel, size))


write('og.png', render_home(
    ['Every free way', 'to run an AI model.'],
    [
        'Rate limits, context windows and base URLs for every',
        'provider with a real free tier.',
    ],
    [
        (str(free_model_count), 'free models'),
        (str(len(access)), 'providers'),
        (str(len(runtimes)), 'local runtimes'),
    ],
))

write('og/models.png', render_page(
    'Models',
    'Every model you can use for free.',
    'Pick a model and see which providers hand it to you at zero cost.',
    [
        (str(len(models)), 'models'),
        (str(open_weights), 'open weights'),
        (str(len(vendors)), 'vendors'),
    ],
))

for collection in collections:
    write(f'og/{collection["slug"]}.png', render_page(
        'Collection',
        collection['heading'],
        collection['description'],
        [],
    ))

for provider in providers:
    write(f'og/provider/{provider["id"]}.png', render_page(
        'Provider',
        provider['name'],
        provider['description'] or 'Free tier, limits and a key you can use today.',
        [],
    ))

for model in models:
    vendor = vendors.get(model['vendor'], model['vendor'])
    write(f'og/model/{model["slug"]}.png', render_page(
        vendor,
        f'Use {model["name"]} for free',
        'Every provider that serves this model at no cost, compared.',
        [],
    ))

heaviest = max(written, key=lambda item: item[1])
print(f'wrote {len(written)} OG cards, heaviest {heaviest[0]} ({heaviest[1] // 1024} KB)')
