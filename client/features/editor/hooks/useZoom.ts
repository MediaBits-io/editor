import { RefObject, useCallback } from 'react';
import { EditorContainer } from '../containers/EditorContainer/EditorContainer';

interface Params {
  editorAreaRef: RefObject<HTMLDivElement>;
  editorMargin: number;
}

function useZoom({ editorMargin, editorAreaRef }: Params) {
  const { dispatch } = EditorContainer.useContainer();

  const fitToScreen = useCallback(
    (dimensions?: { width: number; height: number }) => {
      if (!editorAreaRef.current) {
        return;
      }

      const {
        height: clientHeight,
        width: clientWidth,
      } = editorAreaRef.current.getBoundingClientRect();
      dispatch({
        type: 'fit_to_screen',
        screenDimensions: {
          height: clientHeight - editorMargin * 2,
          width: clientWidth - editorMargin * 2,
        },
        canvasDimensions: dimensions,
      });
    },
    [dispatch, editorAreaRef, editorMargin]
  );

  const fillScreen = useCallback(
    (dimensions?: { width: number; height: number }) => {
      if (!editorAreaRef.current) {
        return;
      }

      const {
        height: clientHeight,
        width: clientWidth,
      } = editorAreaRef.current.getBoundingClientRect();
      dispatch({
        type: 'fill_screen',
        screenDimensions: {
          height: clientHeight - editorMargin * 2,
          width: clientWidth - editorMargin * 2,
        },
        canvasDimensions: dimensions,
      });
    },
    [dispatch, editorAreaRef, editorMargin]
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
  };
}

export default useZoom;
