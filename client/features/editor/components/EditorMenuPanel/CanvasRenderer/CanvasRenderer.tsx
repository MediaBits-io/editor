import React, { useEffect } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';
import Loader from '../../../../../components/ui/Loader/Loader';
import { mul } from '../../../../../utils/number';
import { EDITOR_MARGIN } from '../../../constants';
import useZoomControls from '../../../hooks/useZoomControls';
import { isLoadingState, zoomState } from '../../../state/atoms/editor';
import {
  backgroundState,
  dimensionsState,
  elementIdsState,
} from '../../../state/atoms/template';
import { selectedElementIdSelector } from '../../../state/selectors/editor';
import ElementRenderer from './ElementRenderer';

// TODO: move bounds component out of shape and render based on selected state

function CanvasRenderer() {
  const zoom = useRecoilValue(zoomState);
  const dimensions = useRecoilValue(dimensionsState);
  const background = useRecoilValue(backgroundState);
  const isLoading = useRecoilValue(isLoadingState);
  const elementIds = useRecoilValue(elementIdsState);
  const resetSelectedElementId = useResetRecoilState(selectedElementIdSelector);
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  const { fitToScreen } = useZoomControls();

  useEffect(() => {
    fitToScreen();
  }, [fitToScreen]);

  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ('tagName' in e.target && (e.target as any).tagName !== 'CANVAS') {
      resetSelectedElementId();
    }
  };

  return (
    <div className="relative flex flex-grow" onClick={handleBackgroundClick}>
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
        <RecoilBridge>
          <Layer>
            <Rect
              {...dimensions}
              {...background}
              onClick={resetSelectedElementId}
            />
            {elementIds.map((id) => (
              <ElementRenderer key={id} id={id} />
            ))}
          </Layer>
        </RecoilBridge>
      </Stage>
    </div>
  );
}

export default CanvasRenderer;
