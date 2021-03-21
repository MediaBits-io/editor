import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { EditorAreaContainer } from '../containers/EditorAreaContainer';
import { selectedElementIdSelector } from '../state/selectors/editor';

function EditorFocusController() {
  const { editorAreaRef } = EditorAreaContainer.useContainer();
  const selectedElementId = useRecoilValue(selectedElementIdSelector);

  useEffect(() => {
    editorAreaRef.current?.focus();
  }, [editorAreaRef, selectedElementId]);

  return null;
}

export default EditorFocusController;
