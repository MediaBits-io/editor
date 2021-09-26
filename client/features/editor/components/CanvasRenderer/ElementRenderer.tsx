import { ProgressBar, Waveform } from '@vincaslt/konva-elements';
import React from 'react';
import { Rect } from 'react-konva';
import { useRecoilValue } from 'recoil';
import { ImageConfig, ShapeType, TextConfig } from '../../interfaces/Shape';
import { elementSelector } from '../../state/selectors/elements';
import GenericRenderer from './GenericRenderer';
import ImageRenderer from './ImageRenderer';
import TextRenderer from './TextRenderer';

interface Props {
  id: string;
}

function ElementRenderer({ id }: Props) {
  const element = useRecoilValue(elementSelector(id));
  if (!element) {
    return null;
  }

  const { props, type } = element;

  switch (type) {
    case ShapeType.Text:
      return <TextRenderer id={id} key={id} props={props as TextConfig} />;
    case ShapeType.Rectangle:
      return (
        <GenericRenderer id={id} key={id} props={props} component={Rect} />
      );
    case ShapeType.Waveform:
      return (
        <GenericRenderer id={id} key={id} props={props} component={Waveform} />
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
