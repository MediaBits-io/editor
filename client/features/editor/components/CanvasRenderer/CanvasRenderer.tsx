import Konva from 'konva';
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Layer, Rect, Stage, Transformer } from 'react-konva';
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilCallback,
  useRecoilValue,
} from 'recoil';
import Loader from '../../../../components/ui/Loader/Loader';
import { mul } from '../../../../utils/number';
import { EDITOR_MARGIN } from '../../constants';
import { EditorAreaContainer } from '../../containers/EditorAreaContainer';
import useZoomControls from '../../hooks/useZoomControls';
import { Dimensions } from '../../interfaces/StageConfig';
import { isLoadingState, zoomState } from '../../state/atoms/editor';
import { backgroundState, dimensionsState } from '../../state/atoms/template';
import useElementsDispatcher from '../../state/dispatchers/elements';
import Elements from './Elements';

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
  const [area, setArea] = useState<{
    containerDimensions: Dimensions;
    screenDimensions: Dimensions;
    stageDimensions: Dimensions;
    offset: { x: number; y: number };
  }>({
    containerDimensions: {
      width: 0,
      height: 0,
    },
    screenDimensions: {
      width: 0,
      height: 0,
    },
    stageDimensions: {
      width: 0,
      height: 0,
    },
    offset: { x: 0, y: 0 },
  });

  const calculateDimensions = useRecoilCallback(({ snapshot }) => () => {}, []);

  useLayoutEffect(() => {
    if (editorAreaRef.current) {
      const observer = new ResizeObserver((entries) => {
        const containerDimensions = entries[0].contentRect;
        const screenDimensions = {
          width: containerDimensions.width - 2 * EDITOR_MARGIN,
          height: containerDimensions.height - 2 * EDITOR_MARGIN,
        };
        const stageDimensions = {
          width: Math.max(containerDimensions.width, dimensions.width * zoom),
          height: Math.max(
            containerDimensions.height,
            dimensions.height * zoom
          ),
        };
        console.log({ containerDimensions, screenDimensions, stageDimensions });
        setScreenDimensions(screenDimensions);
        setArea({
          containerDimensions,
          screenDimensions,
          stageDimensions,
          offset: {
            x: -(
              Math.max(
                0,
                (stageDimensions.width / zoom - dimensions.width) / 2 // TODO: why / zoom?
              ) + EDITOR_MARGIN
            ),
            y: -(
              Math.max(
                0,
                (stageDimensions.height / zoom - dimensions.height) / 2
              ) + EDITOR_MARGIN
            ),
          },
        });
      });

      observer.observe(editorAreaRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [
    dimensions.height,
    dimensions.width,
    editorAreaRef,
    setScreenDimensions,
    zoom,
  ]);

  // useEffect(() => {
  //   if (editorAreaRef.current) {
  //     fitToScreen();
  //   }
  // }, [fitToScreen]);

  // const containerWidth = useMemo(
  //   () => Math.max(screenDimensions.width, dimensions.width * zoom),
  //   [screenDimensions.width, dimensions.width, zoom]
  // );
  // const containerHeight = useMemo(
  //   () => Math.max(screenDimensions.height, dimensions.height * zoom),
  //   [screenDimensions.height, dimensions.height, zoom]
  // );

  // const containerWidth = Math.max(container.width, dimensions.width * zoom);
  // const containerHeight = Math.max(container.height, dimensions.height * zoom);

  console.log(area);

  // 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)

  return (
    <div ref={editorAreaRef} className="overflow-auto h-full w-full">
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
        scaleX={
          zoom * (area.screenDimensions.width / area.containerDimensions.width)
        }
        scaleY={
          zoom *
          (area.screenDimensions.height / area.containerDimensions.height)
        }
        width={area.stageDimensions.width}
        height={area.stageDimensions.height}
        offsetX={area.offset.x}
        offsetY={area.offset.y}
        onClick={(e) => {
          console.log('pos', e.target.getStage()?.getPointerPosition());
        }}
      >
        <RecoilBridge>
          <Layer>
            <Rect
              width={dimensions.width}
              height={dimensions.height}
              shadowColor="#000000"
              shadowOpacity={0.12}
              shadowBlur={5}
              shadowEnabled
              // x={
              //   containerWidth / zoom / 2 - dimensions.width / 2 + EDITOR_MARGIN
              // }
              // y={
              //   containerHeight / zoom / 2 -
              //   dimensions.height / 2 +
              //   EDITOR_MARGIN
              // }
              {...background}
              onClick={clearSelection}
            />
            <Elements />
          </Layer>
          {/* <Layer>
            <GuideLines />
          </Layer> */}
        </RecoilBridge>
      </Stage>
    </div>
  );
}

export default CanvasRenderer;
