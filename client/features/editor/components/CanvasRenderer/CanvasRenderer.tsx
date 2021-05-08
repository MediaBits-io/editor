import React, { useEffect, useMemo, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilValue,
} from 'recoil';
import Loader from '../../../../components/ui/Loader/Loader';
import classNames from '../../../../utils/classNames';
import { CANVAS_STROKE, EDITOR_MARGIN } from '../../constants';
import { EditorAreaContainer } from '../../containers/EditorAreaContainer';
import { ElementRefsContainer } from '../../containers/ElementRefsContainer';
import useZoomControls from '../../hooks/useZoomControls';
import { Dimensions } from '../../interfaces/StageConfig';
import { isLoadingState, zoomState } from '../../state/atoms/editor';
import { backgroundState, dimensionsState } from '../../state/atoms/template';
import useElementsDispatcher from '../../state/dispatchers/elements';
import Elements from './Elements';
import GuideLines from './GuideLines';
import Subtitles from './Subtitles';
import Transformers from './Transformers';

function CanvasRenderer() {
  const zoom = useRecoilValue(zoomState);
  const dimensions = useRecoilValue(dimensionsState);
  const background = useRecoilValue(backgroundState);
  const isLoading = useRecoilValue(isLoadingState);
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  const { fitToScreen } = useZoomControls();
  const { clearSelection } = useElementsDispatcher();
  const {
    editorAreaRef,
    setScreenDimensions,
  } = EditorAreaContainer.useContainer();

  const [containerDimensions, setContainerDimensions] = useState<
    Dimensions | undefined
  >();

  useEffect(() => {
    if (editorAreaRef.current) {
      const containerDimensions = editorAreaRef.current.getBoundingClientRect();

      setScreenDimensions({
        width: containerDimensions.width - 2 * EDITOR_MARGIN,
        height: containerDimensions.height - 2 * EDITOR_MARGIN,
      });

      fitToScreen();

      const observer = new ResizeObserver((entries) => {
        const containerDimensions = entries[0].target.getBoundingClientRect();

        setContainerDimensions(containerDimensions);
        setScreenDimensions({
          width: containerDimensions.width - 2 * EDITOR_MARGIN,
          height: containerDimensions.height - 2 * EDITOR_MARGIN,
        });
      });

      observer.observe(editorAreaRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [editorAreaRef, fitToScreen, setScreenDimensions]);

  const area = useMemo(() => {
    if (!containerDimensions) {
      return null;
    }

    const canvasArea = {
      width: dimensions.width * zoom + 2 * EDITOR_MARGIN,
      height: dimensions.height * zoom + 2 * EDITOR_MARGIN,
    };

    const stageDimensions = {
      width: Math.max(1, containerDimensions.width, canvasArea.width),
      height: Math.max(1, containerDimensions.height, canvasArea.height),
    };

    // Absolute offset, so divided by zoom, because offset is scaled by default
    const offsetX =
      (Math.max(0, (stageDimensions.width - canvasArea.width) / 2) +
        EDITOR_MARGIN) /
      zoom;
    const offsetY =
      (Math.max(0, (stageDimensions.height - canvasArea.height) / 2) +
        EDITOR_MARGIN) /
      zoom;

    return {
      containerDimensions,
      stageDimensions,
      scale: {
        x: zoom,
        y: zoom,
      },
      offset: {
        x: -offsetX,
        y: -offsetY,
      },
    };
  }, [containerDimensions, dimensions.height, dimensions.width, zoom]);

  return (
    <div
      className={classNames(
        'relative w-full h-full',
        isLoading ? 'overflow-hidden' : 'overflow-auto'
      )}
      ref={editorAreaRef}
    >
      {isLoading && (
        <>
          <div className="z-10 absolute bg-gray-600 opacity-75 w-full h-full" />
          <Loader className="z-10 absolute inset-0 m-auto h-10 text-white" />
        </>
      )}

      {area && (
        <Stage
          scaleX={area.scale.x}
          scaleY={area.scale.y}
          offsetX={area.offset.x}
          offsetY={area.offset.y}
          width={area.stageDimensions.width}
          height={area.stageDimensions.height}
          onClick={clearSelection}
        >
          <RecoilBridge>
            <ElementRefsContainer.Provider>
              <Layer>
                <Rect
                  x={-CANVAS_STROKE / zoom}
                  y={-CANVAS_STROKE / zoom}
                  width={dimensions.width + (2 * CANVAS_STROKE) / zoom}
                  height={dimensions.height + (2 * CANVAS_STROKE) / zoom}
                  shadowColor="black"
                  shadowOpacity={0.1}
                  shadowBlur={4}
                  shadowEnabled
                  fill="rgb(229, 231, 235)"
                />
                <Rect
                  width={dimensions.width}
                  height={dimensions.height}
                  shadowColor="black"
                  shadowOpacity={0.06}
                  shadowBlur={2}
                  shadowEnabled
                  {...background}
                />
              </Layer>
              <Layer
                clipX={0}
                clipY={0}
                clipWidth={dimensions.width}
                clipHeight={dimensions.width}
              >
                <Elements />
              </Layer>
              <Layer>
                <Subtitles />
                <GuideLines />
                <Transformers />
              </Layer>
            </ElementRefsContainer.Provider>
          </RecoilBridge>
        </Stage>
      )}
    </div>
  );
}

export default CanvasRenderer;
