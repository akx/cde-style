import "./style.css";
import { Image, Palette } from "./types";
import rawPalettes from "./palettes.json";
import rawImages from "./images.json";
import { pick } from "./utils";
import { renderImage } from "./render";

const palettes = rawPalettes as unknown as Record<string, Palette>;
const images = rawImages as unknown as Record<string, Image>;

function main() {
  const [paletteName, palette] = pick(Object.entries(palettes));
  const [imageName, image] = pick(Object.entries(images));
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const canvas = renderImage(image, palette);
  const imageUrl = canvas.toDataURL("image/png");
  document.body.style.background = `url(${imageUrl})`;
  app.innerHTML = `<h1>${paletteName} / ${imageName}</h1>`;
}

document.body.addEventListener("click", main, false);

main();
