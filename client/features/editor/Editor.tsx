import React, { useCallback, useEffect } from 'react';
import MainArea from '../../components/layout/MainArea';
import EditorMenu from './components/EditorMenu/EditorMenu';
import { EditorContainer } from './containers/EditorContainer/EditorContainer';
import EditorMenuPanel from './components/EditorMenuPanel/EditorMenuPanel';
import CanvasRenderer from './components/EditorMenuPanel/CanvasRenderer/CanvasRenderer';
import EditorHeader from './components/EditorHeader/EditorHeader';
import useEditorKeyCommand from './hooks/useEditorKeyCommand';
import useEditorHistory from './hooks/useEditorHistory';
import useElements from './hooks/useElements';
import ZoomControls from './components/ZoomControls/ZoomControls';
import HistoryControls from './components/HistoryControls/HistoryControls';
import { loadFonts } from '../../utils/fonts';
import { PRELOAD_FONTS } from './constants';
import { EditorAreaContainer } from './containers/EditorAreaContainer';

function Editor() {
  const { redo, undo } = useEditorHistory();
  const { selectedElement } = useElements();
  const { state, dispatch, hasUnsavedChanges } = EditorContainer.useContainer();
  const { editorAreaRef } = EditorAreaContainer.useContainer();

  useEffect(() => {
    loadFonts(PRELOAD_FONTS);
  }, []);

  useEffect(() => {
    if (!hasUnsavedChanges) {
      return;
    }

    const unloadCallback = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', unloadCallback);
    return () => {
      window.removeEventListener('beforeunload', unloadCallback);
    };
  }, [hasUnsavedChanges]);

  useEditorKeyCommand('ctrl+z', undo, process.browser ? document : undefined);
  useEditorKeyCommand('ctrl+y', redo, process.browser ? document : undefined);

  const handleKeyDown = useEditorKeyCommand(
    'Delete',
    useCallback(() => {
      if (state.selectedId) {
        dispatch({ type: 'delete_element', id: state.selectedId });
      }
    }, [dispatch, state.selectedId])
  );

  useEffect(() => {
    editorAreaRef.current?.focus();
  }, [editorAreaRef, selectedElement?.id]);

  return (
    <>
      <EditorHeader />
      <div className="flex flex-grow overflow-hidden">
        <EditorMenu />
        <div className="flex flex-col">
          <EditorMenuPanel />
          <div className="bg-white mb-2 rounded border p-2 flex justify-between">
            <div>
              <ZoomControls />
            </div>
            <HistoryControls />
          </div>
        </div>
        <MainArea onKeyDown={handleKeyDown} ref={editorAreaRef}>
          <CanvasRenderer />
        </MainArea>
      </div>
    </>
  );
}

function decorate<P>(Component: React.FunctionComponent<P>) {
  return (props: P) => (
    <EditorContainer.Provider>
      <EditorAreaContainer.Provider initialState={{ margin: 8 }}>
        <Component {...props} />
      </EditorAreaContainer.Provider>
    </EditorContainer.Provider>
  );
}

export default decorate(Editor);
