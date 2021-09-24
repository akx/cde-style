import glob
import json
import os

from cvt.color import try_parse_color

header_names = "width height colors chars-per-pixel hotx hoty".split()


def parse_xpm(filename: str):
    state = 0
    header = None
    colors = {}
    pixels = []
    with open(filename) as f:
        for line in f:
            line = line.strip()
            if line.startswith('"'):
                if state == 0:
                    line = line.strip('",')
                    header = dict(zip(header_names, [int(bit) for bit in line.split()]))
                    state = 1
                    continue
                elif state == 1:  # colors
                    line = line.strip('",')
                    colchr = line[0]
                    coline = line[1:].strip().split()
                    colors[colchr] = {
                        k: (try_parse_color(v) or v)
                        for (k, v) in zip(coline[::2], coline[1::2])
                    }
                    if len(colors) == header["colors"]:
                        state = 2
                    continue
                elif state == 2:  # pixels
                    line = line[1:]
                    if line.endswith('"};'):
                        line = line[:-3]
                    if line.endswith('",'):
                        line = line[:-2]
                    elif line.endswith('"'):
                        line = line[:-1]
                    if len(line) != header["width"]:
                        print(filename, line, header)
                    pixels.append(line)
    return {
        **header,
        "colors": colors,
        "pixels": pixels,
    }


def parse_images():
    for filename in glob.glob("original/backdrops/*.pm"):
        image_name = os.path.splitext(os.path.basename(filename))[0]
        yield (image_name, parse_xpm(filename))


def main():
    images_data = dict(parse_images())
    print(f"{len(images_data)} images.")
    with open("./frontend/src/images.json", "w") as outf:
        json.dump(images_data, outf, sort_keys=True)


if __name__ == "__main__":
    main()
