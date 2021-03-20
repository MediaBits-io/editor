import { RGBColor } from 'react-color';
import tinycolor from 'tinycolor2';

export const isValidHex = (hex: string) => {
  return hex.length >= 6 && tinycolor(hex, { format: 'hex' }).isValid();
};

export function toRgba(color: RGBColor) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
}

export function toHex(color: RGBColor) {
  return (
    '#' +
    ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b)
      .toString(16)
      .slice(1)
  );
}

export function fromRgba(rgba: string): RGBColor {
  const str = rgba.replace(/^rgba?/, '');
  const [r, g, b, a = 1] = str
    .substring(1, str.length - 1)
    .split(',')
    .map((str) => +str.trim());
  return { r, g, b, a };
}

export function fromHex(hex: string, a = 1): RGBColor {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a,
      }
    : { r: 0, g: 0, b: 0 };
}
