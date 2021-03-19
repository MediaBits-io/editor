import { useRef } from 'react';
import { createContainer } from 'unstated-next';

function useEditorAreaState() {
  const editorAreaRef = useRef<HTMLDivElement>(null);

  return {
    editorAreaRef,
  };
}

export const EditorAreaContainer = createContainer(useEditorAreaState);
