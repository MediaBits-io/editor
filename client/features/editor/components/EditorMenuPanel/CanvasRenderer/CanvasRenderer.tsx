import React, { useEffect } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { ProgressBar, Waveform } from 'konva-elements';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
import { mul } from '../../../../../utils/number';
import { ShapeType } from '../../../interfaces/Shape';
import useZoom from '../../../hooks/useZoom';
import Loader from '../../../../../components/ui/Loader/Loader';
import { EditorAreaContainer } from '../../../containers/EditorAreaContainer';
import GenericRenderer from './GenericRenderer';
import TextRenderer from './TextRenderer';
import ImageRenderer from './ImageRenderer';

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
            {template.elements.map(({ type, id, props }) => {
              switch (type) {
                case ShapeType.Text:
                  return <TextRenderer id={id} key={id} props={props} />;
                case ShapeType.Rectangle:
                  return (
                    <GenericRenderer
                      id={id}
                      key={id}
                      props={props}
                      component={Rect}
                    />
                  );
                case ShapeType.Waveform:
                  return (
                    <GenericRenderer
                      id={id}
                      key={id}
                      props={props}
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
                  return <ImageRenderer key={id} id={id} props={props} />;
                default:
                  throw new Error(`Unsupported element ${type}`);
              }
            })}
          </Layer>
        </EditorContainer.Provider>
      </Stage>
    </div>
  );
}

export default CanvasRenderer;
