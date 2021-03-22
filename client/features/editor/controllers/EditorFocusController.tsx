import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { EditorAreaContainer } from '../containers/EditorAreaContainer';
import { selectedElementIdState } from '../state/atoms/editor';

function EditorFocusController() {
  const { editorAreaRef } = EditorAreaContainer.useContainer();
  const selectedElementId = useRecoilValue(selectedElementIdState);

  useEffect(() => {
    editorAreaRef.current?.focus();
  }, [editorAreaRef, selectedElementId]);

  return null;
}

export default EditorFocusController;
