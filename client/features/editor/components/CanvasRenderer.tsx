import React, { useCallback, useEffect } from 'react';
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
import InteractiveKonvaElement, { MIN_WIDTH } from './InteractiveKonvaElement';
import Konva from 'konva';
import Loader from '../../../components/ui/Loader/Loader';
import { EditorAreaContainer } from '../containers/EditorAreaContainer';

const MIN_FONT_SIZE = 8;

function CanvasRenderer() {
  const editorState = EditorContainer.useContainer();
  const { editorMargin } = EditorAreaContainer.useContainer();
  const { fitToScreen } = useZoom();

  const { state, template, dispatch } = editorState;

  useEffect(() => {
    fitToScreen();
  }, [fitToScreen]);

  const handleBackgroundClick = () => {
    dispatch({ type: 'clear_selection' });
  };

  const transformText = useCallback((node: Konva.Node): Konva.TextConfig => {
    const textNode = node as Konva.Text;
    return {
      width: Math.max(
        textNode.width() * textNode.scaleX(),
        textNode.measureSize(textNode.text()[0]).width,
        MIN_WIDTH
      ),
      fontSize: Math.max(
        textNode.fontSize() * textNode.scaleY(),
        MIN_FONT_SIZE
      ),
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
                  type === ShapeType.Text ? transformText : undefined
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
                      // TODO: set cache on mount, not on ref
                      return (
                        <Image
                          {...(props as Konva.ImageConfig)}
                          {...additionalProps}
                          ref={(el) => {
                            el?.cache();
                            additionalProps.ref.current = el;
                          }}
                        />
                      );
                  }
                }}
              </InteractiveKonvaElement>
            ))}
          </Layer>
        </EditorContainer.Provider>
      </Stage>
    </div>
  );
}

export default CanvasRenderer;
