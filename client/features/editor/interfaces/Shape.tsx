export enum ShapeType {
  Rectangle = 'rectangle',
  Text = 'text',
  ProgressBar = 'progress-bar',
  Waveform = 'waveform',
  Image = 'image',
}

export interface ShapeTransformerConfig {
  type?: 'scale' | 'resize';
  anchors?: {
    x: boolean;
    y: boolean;
  };
}
