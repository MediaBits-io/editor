import { ShapeType, TextConfig } from './Shape';

export interface Subtitle {
  id: string;
  start: number;
  end: number;
  text: string;
  type: ShapeType.Subtitle;
}

export type SubtitleStyle = Omit<TextConfig, 'text'>;
