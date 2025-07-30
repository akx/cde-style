export type Color = [number, number, number];
export type Palette = Color[];
export type Image = {
  "chars-per-pixel": number;
  colors: Record<string, Record<"c" | "m" | "s", string | Color>>;
  height: number;
  width: number;
  hotx?: number;
  hoty?: number;
  pixels: string[];
};
