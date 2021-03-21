import Konva from 'konva';
import { Filter } from 'konva/types/Node';
import { uniq } from 'ramda';
import { EditorPanel } from './interfaces/Editor';
import { ShapeType } from './interfaces/Shape';

export const EDITOR_MARGIN = 8;

export const IMAGE_FILTERS: { [filter: string]: Filter } = {
  blur: Konva.Filters.Blur,
};

export const SHAPE_PROPERTIES_PANEL: Partial<
  { [key in ShapeType]: EditorPanel }
> = {
  [ShapeType.Image]: EditorPanel.ImageProperties,
  [ShapeType.Text]: EditorPanel.TextProperties,
  [ShapeType.ProgressBar]: EditorPanel.ProgressBarProperties,
  [ShapeType.Waveform]: EditorPanel.WaveformProperties,
  [ShapeType.Rectangle]: EditorPanel.RectangleProperties,
};

export const SHAPE_TOOL_PANEL: Partial<{ [key in ShapeType]: EditorPanel }> = {
  [ShapeType.Image]: EditorPanel.Image,
  [ShapeType.Text]: EditorPanel.Text,
  [ShapeType.ProgressBar]: EditorPanel.Elements,
  [ShapeType.Waveform]: EditorPanel.Elements,
  [ShapeType.Rectangle]: EditorPanel.Elements,
};

export enum DefaultFonts {
  Headline = 'Archivo Black',
  Regular = 'Helvetica',
  Handwritten = 'Bad Script',
}

export const ALL_FONTS = [
  'Abril Fatface',
  'Alfa Slab One',
  'Anton',
  'Archivo Black',
  'Arial Black',
  'Arimo',
  'Bad Script',
  'Bangers',
  'Cinzel',
  'Courier',
  'Georgia',
  'Helvetica',
  'Iceberg',
  'Kumar One Outline',
  'Lobster',
  'Open Sans',
  'Oleo Script',
  'Oswald',
  'Pacifico',
  'Permanent Marker',
  'Playfair Display',
  'Rakkas',
  'Roboto',
  'Rubik',
  'Shrikhand',
  'Squada One',
  'Times',
  'Titan One',
  'Work Sans',
  'ZCOOL KuaiLe',
  'Zilla Slab Highlight',
].sort();

export const PROPRIETARY_FONTS = [
  'Courier',
  'Helvetica',
  'Georgia',
  'Arial Black',
  'Times',
];

export const LOADABLE_FONTS = ALL_FONTS.filter(
  (font) => !PROPRIETARY_FONTS.includes(font)
);

export const PRELOAD_FONTS = uniq([
  ...Object.values(DefaultFonts).filter((font) =>
    LOADABLE_FONTS.includes(font)
  ),
  ...LOADABLE_FONTS.slice(0, 8),
]);
