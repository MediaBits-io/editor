import React, { useEffect, useMemo, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilValue,
} from 'recoil';
import Loader from '../../../../components/ui/Loader/Loader';
import { mul } from '../../../../utils/number';
import { EDITOR_MARGIN } from '../../constants';
import { EditorAreaContainer } from '../../containers/EditorAreaContainer';
import { ElementRefsContainer } from '../../containers/ElementRefsContainer';
import useZoomControls from '../../hooks/useZoomControls';
import { Dimensions } from '../../interfaces/StageConfig';
import { isLoadingState, zoomState } from '../../state/atoms/editor';
import { backgroundState, dimensionsState } from '../../state/atoms/template';
import useElementsDispatcher from '../../state/dispatchers/elements';
import Elements from './Elements';
import TransformerRenderer from './TransformerRenderer';

// TODO: move bounds component out of shape and render based on selected state (need refs in state)

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
  const [containerDimensions, setContainerDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

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
    const screenDimensions = {
      width: containerDimensions.width - 2 * EDITOR_MARGIN,
      height: containerDimensions.height - 2 * EDITOR_MARGIN,
    };
    const stageDimensions = {
      width: Math.max(containerDimensions.width, dimensions.width * zoom),
      height: Math.max(containerDimensions.height, dimensions.height * zoom),
    };
    const offsetX =
      Math.max(0, (stageDimensions.width / zoom - dimensions.width) / 2) +
      EDITOR_MARGIN;
    const offsetY =
      Math.max(0, (stageDimensions.height / zoom - dimensions.height) / 2) +
      EDITOR_MARGIN;
    return {
      containerDimensions,
      screenDimensions,
      stageDimensions,
      scale: {
        x: zoom * (screenDimensions.width / containerDimensions.width),
        y: zoom * (screenDimensions.height / containerDimensions.height),
      },
      offset: {
        x: -offsetX,
        y: -offsetY,
      },
    };
  }, [containerDimensions, dimensions.height, dimensions.width, zoom]);

  return (
    <div className="overflow-auto w-full h-full" ref={editorAreaRef}>
      {isLoading && (
        <>
          <div
            className="z-10 absolute inset-0 m-auto rounded-lg bg-gray-900 opacity-75"
            style={{
              width: mul(dimensions.width, zoom),
              height: mul(dimensions.height, zoom),
            }}
          />
          <Loader className="z-10 absolute inset-0 m-auto h-10 text-white" />
        </>
      )}

      <Stage
        scaleX={area.scale.x}
        scaleY={area.scale.y}
        width={area.stageDimensions.width}
        height={area.stageDimensions.height}
        offsetX={area.offset.x}
        offsetY={area.offset.y}
        onClick={clearSelection}
      >
        <RecoilBridge>
          <ElementRefsContainer.Provider>
            <Layer
              clipX={0}
              clipY={0}
              clipWidth={dimensions.width}
              clipHeight={dimensions.width}
            >
              <Rect
                width={dimensions.width}
                height={dimensions.height}
                shadowColor="#000000"
                shadowOpacity={0.12}
                shadowBlur={5}
                shadowEnabled
                {...background}
              />
              <Elements />
            </Layer>
            <Layer>
              <TransformerRenderer />
            </Layer>
          </ElementRefsContainer.Provider>
        </RecoilBridge>
      </Stage>
    </div>
  );
}

export default CanvasRenderer;
