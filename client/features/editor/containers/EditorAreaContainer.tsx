import { useCallback, useRef } from 'react';
import { createContainer } from 'unstated-next';
import { Dimensions } from '../interfaces/StageConfig';

function useEditorAreaState(el: HTMLDivElement | null = null) {
  const editorAreaRef = useRef<HTMLDivElement>(el);
  const editorAreaDimensionsRef = useRef<Dimensions | null>(null);

  const getScreenDimensions = useCallback(() => {
    if (!editorAreaDimensionsRef.current) {
      throw new Error('Editor area dimensions are not initialized');
    }
    return editorAreaDimensionsRef.current;
  }, [editorAreaDimensionsRef]);

  const setScreenDimensions = useCallback((dimensions: Dimensions) => {
    editorAreaDimensionsRef.current = { ...dimensions };
  }, []);

  return {
    editorAreaRef,
    getScreenDimensions,
    setScreenDimensions,
  };
}

export const EditorAreaContainer = createContainer(useEditorAreaState);
