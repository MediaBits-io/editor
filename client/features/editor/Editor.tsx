import React, { useCallback, useEffect, useRef } from 'react';
import MainArea from '../../components/layout/MainArea';
import EditorMenu from './components/EditorMenu/EditorMenu';
import { EditorContainer } from './containers/EditorContainer/EditorContainer';
import EditorMenuPanel from './components/EditorMenuPanel/EditorMenuPanel';
import CanvasRenderer from './components/CanvasRenderer';
import EditorHeader from './components/EditorHeader/EditorHeader';
import useEditorKeyCommand from './hooks/useEditorKeyCommand';
import useEditorHistory from './hooks/useEditorHistory';
import useElements from './hooks/useElements';
import ZoomControls from './components/ZoomControls/ZoomControls';
import HistoryControls from './components/HistoryControls/HistoryControls';
import { loadFonts } from '../../utils/fonts';
import { PRELOAD_FONTS } from './constants';

const editorMargin = 8;

function Editor() {
  const { redo, undo } = useEditorHistory();
  const { selectedElement } = useElements();
  const { state, template, dispatch } = EditorContainer.useContainer();
  const editorAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadFonts(PRELOAD_FONTS);
  }, []);

  useEffect(() => {
    if (state.lastSaved === template) {
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
  }, [state.lastSaved, template]);

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
  }, [selectedElement?.id]);

  return (
    <>
      <EditorHeader />
      <div className="flex flex-grow overflow-hidden">
        <EditorMenu />
        <div className="flex flex-col">
          <EditorMenuPanel
            editorAreaRef={editorAreaRef}
            editorMargin={editorMargin}
          />
          <div className="bg-white mb-2 rounded border p-2 flex justify-between">
            <div>
              <ZoomControls
                editorAreaRef={editorAreaRef}
                editorMargin={editorMargin}
              />
            </div>
            <HistoryControls />
          </div>
        </div>
        <MainArea
          onKeyDown={handleKeyDown}
          className="overflow-x-auto focus:outline-none"
          ref={editorAreaRef}
        >
          <CanvasRenderer
            editorAreaRef={editorAreaRef}
            editorMargin={editorMargin}
          />
        </MainArea>
      </div>
    </>
  );
}

function decorate<P>(Component: React.FunctionComponent<P>) {
  return (props: P) => (
    <EditorContainer.Provider>
      <Component {...props} />
    </EditorContainer.Provider>
  );
}

export default decorate(Editor);
