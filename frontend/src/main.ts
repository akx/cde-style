import "./style.css";
import { Image, Palette } from "./types";
import rawPalettes from "./palettes.json";
import rawImages from "./images.json";
import { pick, shuffle } from "./utils";
import { colorTo8bitRGB, renderImage } from "./render";
import { html, render } from "lit-html";

const palettes = rawPalettes as unknown as Record<string, Palette>;
const images = rawImages as unknown as Record<string, Image>;
let paletteName = "";
let origPalette: Palette = [];
let imageName = "";
let image: Image | null = null;
let palette: Palette = [];

function shuffleColors() {
  palette = shuffle(origPalette);
}

function shufflePalette() {
  [paletteName, origPalette] = pick(Object.entries(palettes));
  shuffleColors();
}

function shuffleImage() {
  [imageName, image] = pick(Object.entries(images));
}

function shuffleAll() {
  shufflePalette();
  shuffleImage();
}

function renderUI(butFirst?: () => void) {
  butFirst?.();
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const canvas = image ? renderImage(image, palette) : null;
  if (canvas) {
    const imageUrl = canvas.toDataURL("image/png");
    document.body.style.background = `url(${imageUrl})`;
  }
  const rgbs = palette.map((ent) => {
    const [r, g, b] = colorTo8bitRGB(ent);
    return `rgb(${r}, ${g}, ${b})`;
  });
  const swatches = rgbs.map((rgb) => {
    return html` <div
      class="swatch"
      style="color:${rgb};background:${rgb};border-color:${rgb}"
    ></div>`;
  });
  const tpl = html`
    <main style="--button-color: ${rgbs[0]}; --text-color: ${rgbs.at(-1)};">
      <h1>${paletteName} / ${imageName}</h1>
      <div class="controls">
        <button @click=${() => renderUI(shuffleAll)}>randomize all</button>
        <button @click=${() => renderUI(shuffleColors)}>
          shuffle current palette
        </button>
        <button @click=${() => renderUI(shufflePalette)}>
          randomize palette
        </button>
        <button @click=${() => renderUI(shuffleImage)}>randomize image</button>
      </div>
      <div class="palette">${swatches}</div>
    </main>
  `;
  render(tpl, app);
}

renderUI(shuffleAll);
