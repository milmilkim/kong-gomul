import { getPaletteFromURL } from 'color-thief-node';

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const getPalette = async (imageUrl) => {
  const colorPallete = await getPaletteFromURL(imageUrl, 4);

  const colors = [];
  for (let i = 0; i < colorPallete.length; i++) {
    const r = colorPallete[i][0];
    const g = colorPallete[i][1];
    const b = colorPallete[i][2];

    colors.push(rgbToHex(r, g, b));
  }

  return colors;
};

export default getPalette;
