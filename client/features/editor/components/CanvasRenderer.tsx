import React, { RefObject, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import {
  ProgressBar,
  ProgressBarConfig,
  Waveform,
  WaveformConfig,
} from 'konva-elements';
import { EditorContainer } from '../containers/EditorContainer/EditorContainer';
import { mul } from '../../../utils/number';
import { ShapeType } from '../interfaces/Shape';
import useZoom from '../hooks/useZoom';
import InteractiveKonvaElement from './InteractiveKonvaElement';
import Konva from 'konva';
import UniqueIdContainer from '../../../containers/UniqueIdContainer';

interface Props {
  editorAreaRef: RefObject<HTMLDivElement>;
  editorMargin: number;
}

// TODO: might need to pass through props for uniqueId too
function CanvasRenderer({ editorMargin, editorAreaRef }: Props) {
  const editorState = EditorContainer.useContainer();
  const { fitToScreen } = useZoom({ editorAreaRef, editorMargin });

  const { state, template, dispatch } = editorState;

  useEffect(() => {
    fitToScreen();
  }, [fitToScreen]);

  const handleBackgroundClick = () => {
    dispatch({ type: 'clear_selection' });
  };

  return (
    <div
      className="flex flex-grow"
      onClick={(e) => {
        if ('tagName' in e.target && (e.target as any).tagName !== 'CANVAS') {
          handleBackgroundClick();
        }
      }}
    >
      <Stage
        className="flex flex-grow"
        style={{ margin: editorMargin }}
        scaleX={state.zoom}
        scaleY={state.zoom}
        width={mul(template.dimensions.width, state.zoom)}
        height={mul(template.dimensions.height, state.zoom)}
      >
        <UniqueIdContainer.Provider>
          <EditorContainer.Provider initialState={{ override: editorState }}>
            <Layer>
              <Rect
                {...template.dimensions}
                {...template.background}
                onClick={handleBackgroundClick}
              />
              {template.elements.map(({ type, id, props }) => (
                <InteractiveKonvaElement
                  key={id}
                  id={id}
                  transformerConfig={
                    type === ShapeType.Text
                      ? {
                          type: 'resize',
                        }
                      : undefined
                  }
                >
                  {(additionalProps) => {
                    switch (type) {
                      case ShapeType.Text:
                        return (
                          <Text
                            {...(props as Konva.TextConfig)}
                            {...additionalProps}
                          />
                        );
                      case ShapeType.Rectangle:
                        return (
                          <Rect
                            {...(props as Konva.RectConfig)}
                            {...additionalProps}
                          />
                        );
                      case ShapeType.Waveform:
                        return (
                          <Waveform
                            {...(props as WaveformConfig)}
                            {...additionalProps}
                          />
                        );
                      case ShapeType.ProgressBar:
                        return (
                          <ProgressBar
                            {...(props as ProgressBarConfig)}
                            {...additionalProps}
                          />
                        );
                      case ShapeType.Image:
                        return (
                          <Image
                            {...(props as Konva.ImageConfig)}
                            {...additionalProps}
                          />
                        );
                    }
                  }}
                </InteractiveKonvaElement>
              ))}
            </Layer>
          </EditorContainer.Provider>
        </UniqueIdContainer.Provider>
      </Stage>
    </div>
  );
}

export default CanvasRenderer;
