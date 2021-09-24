from typing import Tuple, Optional

well_known = {
    "white": (1, 1, 1),
    "black": (0, 0, 0),
}


def try_parse_color(color_str: str) -> Optional[Tuple[float, float, float]]:
    color_str = color_str.lower()
    if color_str in well_known:
        return well_known[color_str]
    if color_str.startswith("#"):
        # o  Hexadecimal specification such as #3a7.  This form consists of an initial sharp sign character followed by one of the following formats:
        #
        # 	#RGB   (one character per color)
        # 	#RRGGBB   (two characters per color)
        # 	#RRRGGGBBB   (three characters per color)
        # 	#RRRRGGGGBBBB	(four characters per color)
        #
        #      where R, G, and B represent single hexadecimal digits (uppercase or lowercase).  The hexadecimal strings must be NULL-terminated so that
        #      XParseColor()  knows  when it has reached the end.  When fewer than 16 bits each are specified, they represent the most significant bits
        #      of the value.  For example, #3a7 is the same as #3000a0007000.  The hexadecimal style is discouraged in Release 5 and later.
        color_str = color_str[1:]
        assert len(color_str) in (3, 6, 9, 12)
        per_comp = len(color_str) // 3
        r, g, b = [
            int(color_str[i * per_comp : (i + 1) * per_comp].ljust(4, "0"), 16)
            / 65535.0
            for i in range(3)
        ]
        return (r, g, b)
    return None


def parse_color(color_str: str) -> Tuple[float, float, float]:
    color = try_parse_color(color_str)
    if color:
        return color
    raise NotImplementedError(color_str)
