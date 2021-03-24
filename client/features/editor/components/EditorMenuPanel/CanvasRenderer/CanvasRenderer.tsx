import React, { useEffect } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilValue,
} from 'recoil';
import Loader from '../../../../../components/ui/Loader/Loader';
import { mul } from '../../../../../utils/number';
import { EDITOR_MARGIN } from '../../../constants';
import useZoomControls from '../../../hooks/useZoomControls';
import { isLoadingState, zoomState } from '../../../state/atoms/editor';
import {
  backgroundState,
  dimensionsState,
} from '../../../state/atoms/template';
import useElementsDispatcher from '../../../state/dispatchers/elements';
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

  useEffect(() => {
    fitToScreen();
  }, [fitToScreen]);

  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ('tagName' in e.target && (e.target as any).tagName !== 'CANVAS') {
      clearSelection();
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
          />
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
            <Rect {...dimensions} {...background} onClick={clearSelection} />
            <Elements />
          </Layer>
        </RecoilBridge>
      </Stage>
    </div>
  );
}

export default CanvasRenderer;
