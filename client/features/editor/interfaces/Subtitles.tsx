import Konva from 'konva';
import { ShapeType } from './Shape';

export interface Subtitle {
  id: string;
  start: number;
  end: number;
  text: string;
  type: ShapeType.Subtitle;
}

export interface SubtitleStyle extends Omit<Konva.TextConfig, 'text'> {
  effect?: 'none' | 'hard';
  effectColor?: string;
}
