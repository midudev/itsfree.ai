"""
Renders the favicon: the asterisk from the "it's free*" wordmark, drawn as six
arms so it stays readable down to 16px. Keep this in sync with public/favicon.svg.

Usage: python3 scripts/build-favicons.py
"""
import math
import pathlib
from PIL import Image, ImageDraw

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public'

ARMS = 3          # three strokes through the centre make six arms
REACH = 0.30      # arm length as a share of the canvas
THICKNESS = 0.115 # stroke width as a share of the canvas
RADIUS = 0.22     # corner radius of the tile


def render(size: int, bg: tuple[int, ...], fg: tuple[int, ...]) -> Image.Image:
    """Draws at 8x and downsamples, which keeps the strokes and corner clean."""
    scale = 8
    side = size * scale
    image = Image.new('RGBA', (side, side), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle([0, 0, side - 1, side - 1], radius=int(side * RADIUS), fill=bg)

    centre = side / 2
    reach = side * REACH
    width = int(side * THICKNESS)

    for index in range(ARMS):
        angle = math.pi / 2 + index * math.pi / ARMS
        dx, dy = math.cos(angle) * reach, math.sin(angle) * reach
        draw.line(
            [(centre - dx, centre - dy), (centre + dx, centre + dy)],
            fill=fg,
            width=width,
            joint='curve'
        )
        # Round the ends off; PIL has no line caps of its own
        for sign in (-1, 1):
            x, y = centre + sign * dx, centre + sign * dy
            draw.ellipse([x - width / 2, y - width / 2, x + width / 2, y + width / 2], fill=fg)

    return image.resize((size, size), Image.LANCZOS)


BLACK, WHITE = (0, 0, 0, 255), (255, 255, 255, 255)

ico = [render(size, BLACK, WHITE) for size in (16, 32, 48, 64)]
ico[0].save(PUBLIC / 'favicon.ico', sizes=[(image.width, image.height) for image in ico])

render(180, BLACK, WHITE).save(PUBLIC / 'apple-touch-icon.png')
render(512, BLACK, WHITE).save(PUBLIC / 'icon-512.png')

# The SVG uses the same geometry, in a 32-unit viewBox, and follows the browser theme
lines = []
for index in range(ARMS):
    angle = math.pi / 2 + index * math.pi / ARMS
    dx, dy = math.cos(angle) * 32 * REACH, math.sin(angle) * 32 * REACH
    lines.append(
        f'M{16 - dx:.2f} {16 - dy:.2f}L{16 + dx:.2f} {16 + dy:.2f}'
    )

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
\t<style>
\t\t:root {{ --bg: #000; --fg: #fff; }}
\t\t@media (prefers-color-scheme: dark) {{
\t\t\t:root {{ --bg: #fff; --fg: #000; }}
\t\t}}
\t</style>
\t<rect width="32" height="32" rx="{32 * RADIUS:.0f}" fill="var(--bg)" />
\t<path
\t\td="{' '.join(lines)}"
\t\tstroke="var(--fg)"
\t\tstroke-width="{32 * THICKNESS:.2f}"
\t\tstroke-linecap="round"
\t/>
</svg>
'''
(PUBLIC / 'favicon.svg').write_text(svg)

print('wrote favicon.ico, favicon.svg, apple-touch-icon.png, icon-512.png')
