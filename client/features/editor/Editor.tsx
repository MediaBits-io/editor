import React, { useEffect } from 'react';
import MainArea from '../../components/layout/MainArea';
import Alert from '../../components/ui/Alert';
import ExternalLink from '../../components/ui/ExternalLink';
import { loadFonts } from '../../utils/fonts';
import AudioModal from './components/AudioModal/AudioModal';
import CanvasRenderer from './components/CanvasRenderer/CanvasRenderer';
import EditorControls from './components/EditorControls/EditorControls';
import EditorHeader from './components/EditorHeader/EditorHeader';
import EditorMenu from './components/EditorMenu/EditorMenu';
import EditorMenuPanel from './components/EditorMenuPanel/EditorMenuPanel';
import ProgressModal from './components/ProgressModal/ProgressModal';
import { PRELOAD_FONTS } from './constants';
import { EditorAreaContainer } from './containers/EditorAreaContainer';
import EditorFocusController from './controllers/EditorFocusController';
import HistoryController from './controllers/HistoryController';
import UnsavedChangesController from './controllers/UnsavedChangesController';
import useEditorKeyCommand from './hooks/useEditorKeyCommand';
import useElementsDispatcher from './state/dispatchers/elements';
import useHistoryDispatcher from './state/dispatchers/history';

function Editor() {
  const { redo, undo } = useHistoryDispatcher();
  const { deleteSelectedElement } = useElementsDispatcher();

  useEffect(() => {
    loadFonts(PRELOAD_FONTS);
  }, []);

  useEditorKeyCommand('ctrl+z', undo, process.browser ? document : undefined);
  useEditorKeyCommand('ctrl+y', redo, process.browser ? document : undefined);
  useEditorKeyCommand(
    'ctrl+shift+z',
    redo,
    process.browser ? document : undefined
  );

  const handleKeyDown = useEditorKeyCommand('delete', deleteSelectedElement);

  return (
    <EditorAreaContainer.Provider>
      <UnsavedChangesController />
      <EditorFocusController />
      <HistoryController />
      <ProgressModal />
      <AudioModal />

      <div className="fixed inset-0 bg-white z-10 p-4 overflow-auto sm:hidden">
        <div style={{ minWidth: 320 }}>
          <Alert title="Mediabits.io editor is not available on Mobile">
            Please view it on larger screen.
          </Alert>
          <p className="mt-4 text-sm text-center text-gray-400">
            Contact support through
            <ExternalLink
              className="mx-1"
              newTab
              to="mailto:support@mediabits.io"
            >
              support@mediabits.io
            </ExternalLink>
          </p>
        </div>
      </div>

      <EditorHeader />
      <div className="flex flex-grow overflow-hidden">
        <EditorMenu />
        <div className="flex flex-col">
          <EditorMenuPanel />
        </div>
        <MainArea onKeyDown={handleKeyDown}>
          {/* <div className="pl-2 pt-4 absolute z-10">
              <Tooltip content="Upload audio">
                <button
                  className="bg-white text-gray-700 border shadow-md p-3 rounded-full flex items-center cursor-pointer"
                  onClick={() => console.log('asd')}
                >
                  <MusicNoteIcon className="w-5 h-5" />
                  <div className="bg-gray-400 text-white absolute -right-1.5 p-0.5 flex rounded-full shadow-sm">
                    <ArrowRightIcon className="w-3 h-3" />
                  </div>
                </button>
              </Tooltip>
            </div> */}
          <EditorControls />
          <CanvasRenderer />
        </MainArea>
      </div>
    </EditorAreaContainer.Provider>
  );
}

export default Editor;
