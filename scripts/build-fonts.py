"""
Subsets the three Geist faces down to the characters this site actually prints.

Fontsource's "latin" files carry the whole Latin-1 range plus punctuation no
page uses, so every visitor pays for glyphs nothing renders. This pulls the
upstream woff2 from the Fontsource CDN, keeps only the characters below, and
rewrites public/fonts/ — no npm dependency, no build-time step.

The sans and mono faces stay variable: the wght axis is preserved because the
site paints 100/400/550/600 and the browser synthesises 700 for <strong>.

Writes public/fonts/*.woff2 and rewrites the unicode-range of each @font-face
in src/styles/fonts.css so it matches. Re-run after adding copy in a new
language, then rebuild.
Usage: python3 scripts/build-fonts.py [--check]
"""
import argparse
import glob
import html
import pathlib
import re
import subprocess
import sys
import tempfile
import textwrap
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONTS = ROOT / 'public/fonts'
FONTS_CSS = ROOT / 'src/styles/fonts.css'
DIST = ROOT / 'dist'
CDN = 'https://cdn.jsdelivr.net/fontsource/fonts'
TIMEOUT = 30

# Everything the pages print today: ASCII plus the punctuation the copy uses
# (middle dot, em dash, curly quotes, ellipsis, north-east arrow).
CONTENT = ''.join(chr(c) for c in range(0x20, 0x7F)) + '·—’“”…↗'
# Accents and symbols no page needs yet but a provider name, a price or a line
# of Spanish copy might. ~5 KB across the two text faces, and without them such
# a character drops to the system fallback mid-word.
RESERVE = (
    'ÀÁÂÄÇÈÉÊËÍÏÑÓÔÖÚÜ'
    'àáâäçèéêëíïñóôöúüÿß'
    '–•×°€©®←↑→↓'
)
# The pixel face only renders tallies, stat values, a provider initial and a
# literal "!", so it gets ASCII and nothing else.
PIXEL = CONTENT
TEXT = CONTENT + RESERVE

# Geist ships ccmp dnom frac liga locl numr pnum tnum / kern mark mkmk; Geist
# Mono ships ccmp dnom frac locl numr. Only these four earn their bytes: kern
# and liga for prose, tnum for the font-variant-numeric: tabular-nums tables,
# ccmp for mark composition.
FEATURES = 'kern,liga,tnum,ccmp'

FACES = [
    ('geist-latin-wght-normal.woff2', f'{CDN}/geist:vf@latest/latin-wght-normal.woff2', TEXT),
    ('geist-mono-latin-wght-normal.woff2', f'{CDN}/geist-mono:vf@latest/latin-wght-normal.woff2', TEXT),
    ('geist-pixel-latin-400-normal.woff2', f'{CDN}/geist-pixel@latest/latin-400-normal.woff2', PIXEL),
]


def subset(source: pathlib.Path, target: pathlib.Path, chars: str) -> None:
    subprocess.run(
        [
            sys.executable, '-m', 'fontTools.subset', str(source),
            f'--output-file={target}',
            '--flavor=woff2',
            '--unicodes=' + ','.join(f'U+{ord(c):04X}' for c in sorted(set(chars))),
            f'--layout-features={FEATURES}',
            '--no-hinting',
            '--desubroutinize',
            '--drop-tables+=DSIG',
            '--name-IDs=1,2,3,4,5,6',
        ],
        check=True,
    )


def unicode_range(chars: str) -> str:
    """The @font-face descriptor for a charset, collapsed into runs."""
    points = sorted({ord(c) for c in chars} | {0xFEFF, 0xFFFD})
    runs, start, previous = [], points[0], points[0]
    for point in points[1:]:
        if point != previous + 1:
            runs.append((start, previous))
            start = point
        previous = point
    runs.append((start, previous))
    spans = ', '.join(f'U+{a:04X}' if a == b else f'U+{a:04X}-{b:04X}' for a, b in runs)
    return '\t' + '\n\t\t'.join(textwrap.wrap(f'unicode-range: {spans};', 92))


def sync_css() -> None:
    """Point each @font-face at exactly the characters its file now carries."""
    css = FONTS_CSS.read_text(encoding='utf-8')
    declared = re.findall(r'\tunicode-range: [^;]*;', css)
    if len(declared) != len(FACES):
        print(f'warning: {FONTS_CSS.name} has {len(declared)} unicode-range rules, '
              f'expected {len(FACES)} — left untouched', file=sys.stderr)
        return
    for old, (_, _, chars) in zip(declared, FACES):
        css = css.replace(old, unicode_range(chars), 1)
    FONTS_CSS.write_text(css, encoding='utf-8')


def audit_dist() -> None:
    """Warn if the last build printed a character the subset would not cover."""
    pages = glob.glob(str(DIST / '**/*.html'), recursive=True)
    if not pages:
        return
    rendered = set()
    for page in pages:
        markup = pathlib.Path(page).read_text(encoding='utf-8')
        markup = re.sub(r'<(script|style)\b.*?</\1>', '', markup, flags=re.S | re.I)
        rendered.update(html.unescape(re.sub(r'<[^>]+>', ' ', markup)))
    missing = sorted(c for c in rendered - set(TEXT) if c.isprintable())
    if missing:
        codes = ' '.join(f'U+{ord(c):04X} ({c})' for c in missing)
        print(f'warning: {len(pages)} built pages print characters the subset drops: {codes}',
              file=sys.stderr)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true',
                        help='fail instead of writing if public/fonts is stale')
    args = parser.parse_args()

    audit_dist()
    FONTS.mkdir(parents=True, exist_ok=True)
    stale = []

    with tempfile.TemporaryDirectory() as tmp:
        for name, url, chars in FACES:
            source = pathlib.Path(tmp) / f'src-{name}'
            built = pathlib.Path(tmp) / name
            with urllib.request.urlopen(url, timeout=TIMEOUT) as response:
                source.write_bytes(response.read())
            subset(source, built, chars)

            target = FONTS / name
            before, after = source.stat().st_size, built.stat().st_size
            print(f'{name}: {before:,} -> {after:,} bytes '
                  f'(-{100 * (before - after) / before:.0f}%)')

            if args.check:
                if not target.exists() or target.read_bytes() != built.read_bytes():
                    stale.append(name)
            else:
                target.write_bytes(built.read_bytes())

    if not args.check:
        sync_css()

    if stale:
        print(f'stale, re-run without --check: {", ".join(stale)}', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
