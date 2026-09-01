"""
Draws the social share card at public/og.png (1200x630), using the site's own
Geist faces so the card matches the pages it links to.

Usage: python3 scripts/build-og-image.py
"""
import math
import pathlib
import tempfile

from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONTS = ROOT / 'public/fonts'
OUT = ROOT / 'public/og.png'

BG = (0, 0, 0, 255)
FG = (237, 237, 237, 255)
MUTED = (155, 152, 145, 255)
FAINT = (74, 72, 68, 255)
STAR = (240, 180, 41, 255)

WIDTH, HEIGHT = 1200, 630
PAD = 72


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
body = ImageFont.truetype(sans_regular, 30)
label = ImageFont.truetype(mono, 22)
figure = ImageFont.truetype(mono, 40)
caption = ImageFont.truetype(mono, 20)

card = Image.new('RGBA', (WIDTH, HEIGHT), BG)
draw = ImageDraw.Draw(card)


def asterisk(centre, reach, width, fill):
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


# Wordmark
asterisk((PAD + 17, PAD + 17), 15, 7, FG)
draw.text((PAD + 48, PAD + 2), "it's free", font=label, fill=FG)
mark_width = draw.textlength("it's free", font=label)
draw.text((PAD + 48 + mark_width, PAD + 2), '*', font=label, fill=STAR)
draw.text((PAD + 48 + mark_width + draw.textlength('*', font=label), PAD + 2), '.ai',
          font=label, fill=MUTED)

# Headline
draw.text((PAD, 196), 'Every free way', font=headline, fill=FG)
draw.text((PAD, 286), 'to run an AI model.', font=headline, fill=FG)

draw.text((PAD, 402),
          'Rate limits, context windows and base URLs for every',
          font=body, fill=MUTED)
draw.text((PAD, 442), 'provider with a real free tier.', font=body, fill=MUTED)

# Figures along the bottom, on a hairline
draw.line([(PAD, 528), (WIDTH - PAD, 528)], fill=(31, 31, 31, 255), width=1)

figures = [('403', 'free models'), ('24', 'providers'), ('9', 'local runtimes')]
x = PAD
for value, name in figures:
    draw.text((x, 556), value, font=figure, fill=FG)
    value_width = draw.textlength(value, font=figure)
    draw.text((x + value_width + 12, 568), name, font=caption, fill=FAINT)
    x += value_width + draw.textlength(name, font=caption) + 60

card.convert('RGB').save(OUT, 'PNG', optimize=True)
print(f'wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB)')
