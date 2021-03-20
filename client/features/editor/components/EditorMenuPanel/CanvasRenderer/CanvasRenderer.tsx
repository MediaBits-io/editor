import React, { useEffect } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { ProgressBar, Waveform } from 'konva-elements';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
import { mul } from '../../../../../utils/number';
import { ShapeType } from '../../../interfaces/Shape';
import useZoomControls from '../../../hooks/useZoomControls';
import Loader from '../../../../../components/ui/Loader/Loader';
import GenericRenderer from './GenericRenderer';
import TextRenderer from './TextRenderer';
import ImageRenderer from './ImageRenderer';
import { EDITOR_MARGIN } from '../../../constants';
import { useRecoilValue } from 'recoil';
import { isLoadingState, zoomState } from '../../../state/atoms/editor';
import {
  backgroundState,
  dimensionsState,
} from '../../../state/atoms/template';

function CanvasRenderer() {
  const editorState = EditorContainer.useContainer();
  const zoom = useRecoilValue(zoomState);
  const dimensions = useRecoilValue(dimensionsState);
  const background = useRecoilValue(backgroundState);
  const isLoading = useRecoilValue(isLoadingState);
  const { fitToScreen } = useZoomControls();

  const { template, dispatch } = editorState;

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
      {isLoading && (
        <>
          <div
            className="z-10 absolute inset-0 m-auto rounded-lg bg-gray-900 opacity-75"
            style={{
              width: mul(dimensions.width, zoom),
              height: mul(dimensions.height, zoom),
            }}
          ></div>
          <Loader className="z-10 absolute inset-0 m-auto h-10 text-white" />
        </>
      )}

      <Stage
        className="flex flex-grow"
        style={{ margin: EDITOR_MARGIN }}
        scaleX={zoom}
        scaleY={zoom}
        width={mul(dimensions.width, zoom)}
        height={mul(dimensions.height, zoom)}
      >
        <EditorContainer.Provider initialState={{ override: editorState }}>
          <Layer>
            <Rect
              {...dimensions}
              {...background}
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
