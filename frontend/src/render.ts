import { Image, Palette } from "./types";

function colorTo8bitRGB(color: string | [number, number, number]): number[] {
  return (typeof color === "string" ? [0xFF, 0, 0xFF] : color.map(s => Math.round(s * 255)));
}

export function renderImage(image: Image, palette: Palette): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d")!;
  const pxd = ctx.createImageData(canvas.width, canvas.height);
  const rgbColors: Record<string, number[]> = {};
  Object.entries(image.colors).forEach(([chr, spec], i) => {
    console.log(chr, spec);
    // TODO: don't just round-robin :)
    rgbColors[chr] = colorTo8bitRGB(palette[i % palette.length]);// spec.c ? parseColor(spec.c) : [0x2F, 0x2f, 0];
  });
  image.pixels.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      let col = rgbColors[line[x]];
      if (!col) {
        console.log("???", rgbColors, line[x]);
        col = [0xFF, 0, 0];
      }
      const [r, g, b] = col;
      const offset = y * (pxd.width * 4) + x * 4;
      pxd.data[offset] = r;
      pxd.data[offset + 1] = g;
      pxd.data[offset + 2] = b;
      pxd.data[offset + 3] = 255;
    }
  });
  ctx.putImageData(pxd, 0, 0);
  return canvas;
}
