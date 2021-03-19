import { useCallback } from 'react';
import { EDITOR_MARGIN } from '../constants';
import { EditorAreaContainer } from '../containers/EditorAreaContainer';
import { EditorContainer } from '../containers/EditorContainer/EditorContainer';

function useZoom() {
  const { editorAreaRef } = EditorAreaContainer.useContainer();
  const { dispatch } = EditorContainer.useContainer();

  const getScreenDimensions = useCallback(() => {
    if (!editorAreaRef.current) {
      throw new Error('Editor area is not initialized');
    }

    const {
      height: clientHeight,
      width: clientWidth,
    } = editorAreaRef.current.getBoundingClientRect();

    return {
      height: clientHeight - EDITOR_MARGIN * 2,
      width: clientWidth - EDITOR_MARGIN * 2,
    };
  }, [editorAreaRef]);

  const fitToScreen = useCallback(
    (dimensions?: { width: number; height: number }) => {
      dispatch({
        type: 'fit_to_screen',
        screenDimensions: getScreenDimensions(),
        canvasDimensions: dimensions,
      });
    },
    [dispatch, getScreenDimensions]
  );

  const fillScreen = useCallback(
    (dimensions?: { width: number; height: number }) => {
      dispatch({
        type: 'fill_screen',
        screenDimensions: getScreenDimensions(),
        canvasDimensions: dimensions,
      });
    },
    [dispatch, getScreenDimensions]
  );

  const setScale = useCallback(
    (scale: number) => {
      dispatch({
        type: 'zoom',
        zoom: scale,
      });
    },
    [dispatch]
  );

  return {
    setScale,
    fitToScreen,
    fillScreen,
    getScreenDimensions,
  };
}

export default useZoom;
