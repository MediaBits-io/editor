import Konva from 'konva';

export enum ShapeType {
  Rectangle = 'rectangle',
  Text = 'text',
  ProgressBar = 'progress-bar',
  Waveform = 'waveform',
  Image = 'image',
}

export type ImageFit = 'fill' | 'scale';
export interface ImageConfig extends Konva.ImageConfig {
  imageFit: ImageFit;
}
