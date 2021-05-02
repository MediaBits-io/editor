import Konva from 'konva';
import { Filter } from 'konva/types/Node';
import { uniq } from 'ramda';
import { EditorPanel } from './interfaces/Editor';
import { ShapeType } from './interfaces/Shape';

export const TARGET_FPS = 60;

export const CANVAS_STROKE = 1;
export const EDITOR_MARGIN = 8 + CANVAS_STROKE;

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
  [ShapeType.Subtitle]: EditorPanel.Subtitles,
};

export const SHAPE_TOOL_PANEL: Partial<{ [key in ShapeType]: EditorPanel }> = {
  [ShapeType.Image]: EditorPanel.Image,
  [ShapeType.Text]: EditorPanel.Text,
  [ShapeType.ProgressBar]: EditorPanel.Elements,
  [ShapeType.Waveform]: EditorPanel.Elements,
  [ShapeType.Rectangle]: EditorPanel.Elements,
  [ShapeType.Subtitle]: EditorPanel.Subtitles,
};

export enum DefaultFonts {
  Headline = 'Archivo Black',
  Regular = 'Arial',
  Handwritten = 'Bad Script',
}

export const ALL_FONTS = [
  'Abril Fatface',
  'Alfa Slab One',
  'Anton',
  'Archivo Black',
  'Arial',
  'Arial Black',
  'Arimo',
  'Bad Script',
  'Bangers',
  'Cinzel',
  'Courier',
  'Georgia',
  'Iceberg',
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
  'Arial',
  'Arial Black',
  'Georgia',
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
