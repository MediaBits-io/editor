import { useRef, useState } from 'react';
import { createContainer } from 'unstated-next';

function useEditorAreaState(initialValue: { margin: number }) {
  const [editorMargin] = useState(initialValue.margin);
  const editorAreaRef = useRef<HTMLDivElement>(null);

  return {
    editorAreaRef,
    editorMargin,
  };
}

export const EditorAreaContainer = createContainer(useEditorAreaState);
