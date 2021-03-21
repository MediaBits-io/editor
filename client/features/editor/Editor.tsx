import React, { useEffect } from 'react';
import MainArea from '../../components/layout/MainArea';
import { loadFonts } from '../../utils/fonts';
import EditorHeader from './components/EditorHeader/EditorHeader';
import EditorMenu from './components/EditorMenu/EditorMenu';
import CanvasRenderer from './components/EditorMenuPanel/CanvasRenderer/CanvasRenderer';
import EditorMenuPanel from './components/EditorMenuPanel/EditorMenuPanel';
import HistoryControls from './components/HistoryControls/HistoryControls';
import ZoomControls from './components/ZoomControls/ZoomControls';
import { PRELOAD_FONTS } from './constants';
import { EditorAreaContainer } from './containers/EditorAreaContainer';
import EditorFocusController from './controllers/EditorFocusController';
import UnsavedChangesController from './controllers/UnsavedChangesController';
import useEditorHistory from './hooks/useEditorHistory';
import useEditorKeyCommand from './hooks/useEditorKeyCommand';
import useElementsDispatcher from './state/dispatchers/elements';

function Editor() {
  const { redo, undo } = useEditorHistory();
  const { editorAreaRef } = EditorAreaContainer.useContainer();
  const { deleteSelectedElement } = useElementsDispatcher();

  useEffect(() => {
    loadFonts(PRELOAD_FONTS);
  }, []);

  useEditorKeyCommand('ctrl+z', undo, process.browser ? document : undefined);
  useEditorKeyCommand('ctrl+y', redo, process.browser ? document : undefined);

  const handleKeyDown = useEditorKeyCommand('Delete', deleteSelectedElement);

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
    <EditorAreaContainer.Provider>
      <UnsavedChangesController />
      <EditorFocusController />
      <Component {...props} />
    </EditorAreaContainer.Provider>
  );
}

export default decorate(Editor);
