import glob
import json
import os

from cvt.color import parse_color


def parse_palettes():
    for filename in glob.glob("original/palettes/*.dp"):
        palette_name = os.path.splitext(os.path.basename(filename))[0]
        with open(filename) as f:
            colors = [parse_color(line.strip()) for line in f.readlines()]
        yield (palette_name, colors)


def main():
    palette_data = dict(parse_palettes())
    print(f"{len(palette_data)} palettes.")
    with open("./frontend/src/palettes.json", "w") as outf:
        json.dump(palette_data, outf, sort_keys=True)


if __name__ == "__main__":
    main()
