"""
Renders the favicon set OpenGraph.to asks for: ico, SVG, 16/32 PNG,
apple-touch-icon (180, square — iOS rounds it), and the 192/512 PWA icons.

The mark is the asterisk from the "it's free*" wordmark, six arms, readable
down to 16px. Keep the SVG geometry in sync with the raster sizes.

Usage: python3 scripts/build-favicons.py
"""
import math
import pathlib
import struct
from io import BytesIO
from PIL import Image, ImageDraw

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public'

ARMS = 3          # three strokes through the centre make six arms
REACH = 0.30      # arm length as a share of the canvas
THICKNESS = 0.115 # stroke width as a share of the canvas
RADIUS = 0.22     # corner radius of the favicon tile


def render(size: int, bg: tuple[int, ...], fg: tuple[int, ...], rounded: bool = True) -> Image.Image:
    """Draws at 8x and downsamples, which keeps the strokes and corner clean."""
    scale = 8
    side = size * scale
    image = Image.new('RGBA', (side, side), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    radius = int(side * RADIUS) if rounded else 0
    draw.rounded_rectangle([0, 0, side - 1, side - 1], radius=radius, fill=bg)

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
        for sign in (-1, 1):
            x, y = centre + sign * dx, centre + sign * dy
            draw.ellipse([x - width / 2, y - width / 2, x + width / 2, y + width / 2], fill=fg)

    return image.resize((size, size), Image.LANCZOS)


BLACK, WHITE = (0, 0, 0, 255), (255, 255, 255, 255)


def write_ico(path: pathlib.Path, images: list[Image.Image]) -> None:
    """PNG-in-ICO so 16/32/48/64 all stay sharp. Pillow's ICO writer drops frames."""
    payloads = []
    for image in images:
        buffer = BytesIO()
        image.save(buffer, format='PNG')
        payloads.append(buffer.getvalue())
    offset = 6 + 16 * len(images)
    out = bytearray(struct.pack('<HHH', 0, 1, len(images)))
    for image, payload in zip(images, payloads):
        width = 0 if image.width >= 256 else image.width
        height = 0 if image.height >= 256 else image.height
        out += struct.pack('<BBBBHHII', width, height, 0, 0, 1, 32, len(payload), offset)
        offset += len(payload)
    for payload in payloads:
        out += payload
    path.write_bytes(out)


ico = [render(size, BLACK, WHITE) for size in (16, 32, 48, 64)]
write_ico(PUBLIC / 'favicon.ico', ico)

render(16, BLACK, WHITE).save(PUBLIC / 'favicon-16x16.png')
render(32, BLACK, WHITE).save(PUBLIC / 'favicon-32x32.png')
# iOS applies its own mask — a pre-rounded tile gets double-rounded
render(180, BLACK, WHITE, rounded=False).save(PUBLIC / 'apple-touch-icon.png')
render(192, BLACK, WHITE, rounded=False).save(PUBLIC / 'icon-192x192.png')
icon_512 = render(512, BLACK, WHITE, rounded=False)
icon_512.save(PUBLIC / 'icon-512x512.png')
icon_512.save(PUBLIC / 'icon-512.png')

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

print(
    'wrote favicon.ico, favicon.svg, favicon-16x16.png, favicon-32x32.png, '
    'apple-touch-icon.png, icon-192x192.png, icon-512x512.png'
)
