import { useRecoilCallback } from 'recoil';
import { Dimensions } from '../../interfaces/StageConfig';
import { zoomState } from '../atoms/editor';
import { dimensionsState } from '../atoms/template';

function useEditorDispatcher() {
  const setFitCanvasToScreen = useRecoilCallback(
    ({ set, snapshot }) => async (
      screenDimensions: Dimensions,
      canvasDimensions?: Dimensions
    ) => {
      const { height, width } =
        canvasDimensions ?? (await snapshot.getPromise(dimensionsState));
      const zoom = Math.max(
        0.01,
        Math.min(
          screenDimensions.height / height,
          screenDimensions.width / width
        )
      );
      set(zoomState, zoom);
    },
    []
  );

  const setFillCanvasToScreen = useRecoilCallback(
    ({ set, snapshot }) => async (
      screenDimensions: Dimensions,
      canvasDimensions?: Dimensions
    ) => {
      const { height, width } =
        canvasDimensions ?? (await snapshot.getPromise(dimensionsState));
      const zoom = Math.max(
        0.01,
        screenDimensions.height / height,
        screenDimensions.width / width
      );
      set(zoomState, zoom);
    },
    []
  );

  const setCanvasDimensions = useRecoilCallback(
    ({ set }) => async (
      canvasDimensions: Dimensions,
      screenDimensions: Dimensions
    ) => {
      set(dimensionsState, canvasDimensions);
      await setFitCanvasToScreen(screenDimensions, canvasDimensions);
    },
    [setFitCanvasToScreen]
  );

  return {
    setFitCanvasToScreen,
    setCanvasDimensions,
    setFillCanvasToScreen,
  };
}

export default useEditorDispatcher;
