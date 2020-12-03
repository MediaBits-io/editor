import { EditorPanel } from './interfaces/Editor';
import { ShapeType } from './interfaces/Shape';

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

export const PRELOAD_FONTS = Object.values(DefaultFonts);
