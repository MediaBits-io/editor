import { useCallback } from 'react';
import { EditorAreaContainer } from '../containers/EditorAreaContainer';
import useEditorDispatcher from '../state/dispatchers/editor';

function useZoomControls() {
  const { getScreenDimensions } = EditorAreaContainer.useContainer();
  const { setFitCanvasToScreen, setFillCanvasToScreen } = useEditorDispatcher();

  const fitToScreen = useCallback(() => {
    setFitCanvasToScreen(getScreenDimensions());
  }, [getScreenDimensions, setFitCanvasToScreen]);

  const fillToScreen = useCallback(() => {
    setFillCanvasToScreen(getScreenDimensions());
  }, [getScreenDimensions, setFillCanvasToScreen]);

  return {
    fitToScreen,
    fillToScreen,
  };
}

export default useZoomControls;
