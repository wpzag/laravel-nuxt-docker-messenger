import { ref } from "@nuxtjs/composition-api";

  const  useColors = (type, headers) => {
  const color = ref();

  const getColorFromCssVariable = (colorVariable) =>
    (color.value = getComputedStyle(document.documentElement).getPropertyValue(
      "--" + colorVariable
    ));
  const ColorToHex = (color) => {
    let hex = Number(color).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  };
  const lightenDarkenColor = (col, amt) => {
    let usePound = false;

    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }

    let num = parseInt(col, 16);

    let r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let b = ((num >> 8) & 0x00ff) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    let g = (num & 0x0000ff) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  };

  const ConvertRGBtoHex = (red, green, blue) => {
    return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
  };
  const getColor = (color, amt = 0) => {
    let rgb = getColorFromCssVariable(color);

    let result = ConvertRGBtoHex(
      ...rgb.replace(/[ ,]+/g, ",").substring(1).split(",")
    );
    return lightenDarkenColor(result, amt);
  };

  return {
    getColor,
  };
};
export default useColors;