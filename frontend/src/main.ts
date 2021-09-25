import "./style.css";
import { Image, Palette } from "./types";
import rawPalettes from "./palettes.json";
import rawImages from "./images.json";
import { pick, shuffle } from "./utils";
import { colorTo8bitRGB, renderImage } from "./render";

const palettes = rawPalettes as unknown as Record<string, Palette>;
const images = rawImages as unknown as Record<string, Image>;

function main() {
  const [paletteName, origPalette] = pick(Object.entries(palettes));
  const [imageName, image] = pick(Object.entries(images));
  const palette = shuffle(origPalette);
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const canvas = renderImage(image, palette);
  const imageUrl = canvas.toDataURL("image/png");
  document.body.style.background = `url(${imageUrl})`;
  app.innerHTML = `<h1>${paletteName} / ${imageName}</h1>`;
  palette.forEach(ent => {
    const [r, g, b] = colorTo8bitRGB(ent);
    const div = document.createElement("div");
    div.className = "swatch";
    div.style.background = `rgb(${r},${g},${b})`;
    app.appendChild(div);
  })
}

document.body.addEventListener("click", main, false);

main();
