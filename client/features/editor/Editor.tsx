import React, { useEffect } from 'react';
import MainArea from '../../components/layout/MainArea';
import { loadFonts } from '../../utils/fonts';
import EditorHeader from './components/EditorHeader/EditorHeader';
import EditorMenu from './components/EditorMenu/EditorMenu';
import CanvasRenderer from './components/CanvasRenderer/CanvasRenderer';
import EditorMenuPanel from './components/EditorMenuPanel/EditorMenuPanel';
import HistoryControls from './components/HistoryControls/HistoryControls';
import ZoomControls from './components/ZoomControls/ZoomControls';
import { PRELOAD_FONTS } from './constants';
import { EditorAreaContainer } from './containers/EditorAreaContainer';
import EditorFocusController from './controllers/EditorFocusController';
import HistoryController from './controllers/HistoryController';
import UnsavedChangesController from './controllers/UnsavedChangesController';
import useEditorKeyCommand from './hooks/useEditorKeyCommand';
import useElementsDispatcher from './state/dispatchers/elements';
import useHistoryDispatcher from './state/dispatchers/history';
import ProgressModal from './components/ProgressModal/ProgressModal';
import AudioModal from './components/AudioModal/AudioModal';

function Editor() {
  const { redo, undo } = useHistoryDispatcher();
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
      <HistoryController />
      <ProgressModal />
      <AudioModal />
      <Component {...props} />
    </EditorAreaContainer.Provider>
  );
}

export default decorate(Editor);
