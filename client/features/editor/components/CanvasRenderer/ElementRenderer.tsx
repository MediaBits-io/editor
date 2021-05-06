import Konva from 'konva';
import { ProgressBar, Waveform } from 'konva-elements';
import React from 'react';
import { Rect } from 'react-konva';
import { useRecoilValue } from 'recoil';
import { ImageConfig, ShapeType } from '../../interfaces/Shape';
import {
  audioProgressState,
  waveformFramesState,
} from '../../state/atoms/audio';
import { elementSelector } from '../../state/selectors/elements';
import { OUTPUT_FPS } from '../AudioControls/waveform/samples';
import GenericRenderer from './GenericRenderer';
import ImageRenderer from './ImageRenderer';
import TextRenderer from './TextRenderer';

interface Props {
  id: string;
}

function ElementRenderer({ id }: Props) {
  const element = useRecoilValue(elementSelector(id));
  const waveformFrames = useRecoilValue(waveformFramesState);
  const audioProgress = useRecoilValue(audioProgressState);
  if (!element) {
    return null;
  }

  const { props, type } = element;

  switch (type) {
    case ShapeType.Text:
      return (
        <TextRenderer id={id} key={id} props={props as Konva.TextConfig} />
      );
    case ShapeType.Rectangle:
      return (
        <GenericRenderer id={id} key={id} props={props} component={Rect} />
      );
    case ShapeType.Waveform:
      console.log(
        audioProgress,
        Math.floor(audioProgress / (1000 / OUTPUT_FPS))
      );
      return (
        <GenericRenderer
          id={id}
          key={id}
          props={{
            ...props,
            frame: Math.floor(audioProgress / (1000 / OUTPUT_FPS)),
            frames: waveformFrames,
          }}
          component={Waveform}
        />
      );
    case ShapeType.ProgressBar:
      return (
        <GenericRenderer
          id={id}
          key={id}
          props={props}
          component={ProgressBar}
        />
      );
    case ShapeType.Image:
      return <ImageRenderer key={id} id={id} props={props as ImageConfig} />;
    default:
      throw new Error(`Unsupported element ${type}`);
  }
}

export default ElementRenderer;
