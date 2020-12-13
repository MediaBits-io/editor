import React, { RefObject, useCallback, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import {
  ProgressBar,
  ProgressBarConfig,
  Waveform,
  WaveformConfig,
} from 'konva-elements';
import { EditorContainer } from '../containers/EditorContainer/EditorContainer';
import { mul, roundDecimal } from '../../../utils/number';
import { ShapeType } from '../interfaces/Shape';
import useZoom from '../hooks/useZoom';
import InteractiveKonvaElement, { MIN_WIDTH } from './InteractiveKonvaElement';
import Konva from 'konva';
import UniqueIdContainer from '../../../containers/UniqueIdContainer';
import Loader from '../../../components/ui/Loader/Loader';

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

  const transformTextFn = useCallback((node: Konva.Node): Konva.TextConfig => {
    const textNode = node as Konva.Text;
    const fontSize = textNode.fontSize();
    const scaleY = textNode.scaleY();
    const scaleX = textNode.scaleX();
    return {
      width: Math.max(textNode.width() * scaleX, MIN_WIDTH),
      fontSize:
        roundDecimal(scaleY, 5) !== 1
          ? Math.floor(fontSize * scaleY)
          : fontSize,
      scaleX: 1,
      scaleY: 1,
    };
  }, []);

  return (
    <div
      className="relative flex flex-grow"
      onClick={(e) => {
        if ('tagName' in e.target && (e.target as any).tagName !== 'CANVAS') {
          handleBackgroundClick();
        }
      }}
    >
      {state.loading && (
        <>
          <div
            className="z-10 absolute inset-0 m-auto rounded-lg bg-gray-900 opacity-75"
            style={{
              width: mul(template.dimensions.width, state.zoom),
              height: mul(template.dimensions.height, state.zoom),
            }}
          ></div>
          <Loader className="z-10 absolute inset-0 m-auto h-10 text-white" />
        </>
      )}

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
                  anchors={
                    type === ShapeType.Text
                      ? [
                          'middle-left',
                          'middle-right',
                          'top-left',
                          'top-right',
                          'bottom-left',
                          'bottom-right',
                        ]
                      : undefined
                  }
                  transformerFn={
                    type === ShapeType.Text ? transformTextFn : undefined
                  }
                >
                  {({ ref, ...additionalProps }) => {
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
                        // TODO: set cache on mount, not on ref
                        return (
                          <Image
                            {...(props as Konva.ImageConfig)}
                            {...additionalProps}
                            ref={(el) => {
                              el?.cache();
                              ref.current = el;
                            }}
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
