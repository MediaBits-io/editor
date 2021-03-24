import { useCallback, useRef } from 'react';
import { createContainer } from 'unstated-next';
import { EDITOR_MARGIN } from '../constants';

function useEditorAreaState() {
  const editorAreaRef = useRef<HTMLDivElement>(null);

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

  return {
    editorAreaRef,
    getScreenDimensions,
  };
}

export const EditorAreaContainer = createContainer(useEditorAreaState);
