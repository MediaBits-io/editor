import Konva from 'konva';

export enum ShapeType {
  Rectangle = 'rectangle',
  Text = 'text',
  ProgressBar = 'progress-bar',
  Waveform = 'waveform',
  Image = 'image',
  Subtitle = 'subtitle',
}

export type ImageFit = 'fill' | 'scale';

export interface ImageConfig extends Konva.ImageConfig {
  imageFit: ImageFit;
}

export type TextConfig = Konva.TextConfig & {
  background?: Konva.RectConfig;
  backgroundEnabled?: boolean;
};
