import { last } from 'ramda';
import { SHAPE_PROPERTIES_PANEL, SHAPE_TOOL_PANEL } from '../../../constants';
import { EditorPanel } from '../../../interfaces/Editor';
import { CanvasElement, Template } from '../../../interfaces/StageConfig';
import { EditorState } from '../../../interfaces';
import { Action as UndoableAction } from './undoable';

export type EditorAction =
  | {
      type: 'add_audio';
      clipBuffer: Blob;
      blobUrl: string;
    }
  | { type: 'remove_audio' }
  | { type: 'create_element'; element: CanvasElement }
  | { type: 'select_element'; id: string }
  | { type: 'clear_selection' }
  | { type: 'open_editor_panel'; panel: EditorPanel }
  | { type: 'delete_element'; id: string }
  | { type: 'save_changes' }
  | { type: 'loading_template' }
  | { type: 'load_template'; template: Template }
  | UndoableAction;

const reducer = (state: EditorState, action: EditorAction): EditorState => {
  const getElement = (selectedElement?: string | CanvasElement) => {
    return typeof selectedElement === 'string'
      ? state.template.present.elements.find(({ id }) => id === selectedElement)
      : selectedElement;
  };

  const getShapePropertiesPanel = (
    selectedElement?: string | CanvasElement
  ) => {
    const element = getElement(selectedElement);
    return (
      (element?.type && SHAPE_PROPERTIES_PANEL[element.type]) ||
      state.activePanel
    );
  };

  const getShapeToolPanel = (selectedElement?: string | CanvasElement) => {
    const element = getElement(selectedElement);
    return (
      (element?.type && SHAPE_TOOL_PANEL[element.type]) || state.activePanel
    );
  };

  switch (action.type) {
    case 'create_element':
      return {
        ...state,
        selectedId: action.element.id,
        activePanel: getShapePropertiesPanel(action.element),
      };
    case 'select_element': {
      return {
        ...state,
        selectedId: action.id,
        activePanel: getShapePropertiesPanel(action.id),
      };
    }
    case 'clear_selection':
      return {
        ...state,
        selectedId: undefined,
        activePanel: getShapeToolPanel(state.selectedId),
      };
    case 'delete_element':
      return action.id === state.selectedId
        ? {
            ...state,
            selectedId: undefined,
            activePanel: getShapeToolPanel(state.selectedId),
          }
        : state;
    case 'open_editor_panel':
      return {
        ...state,
        activePanel: action.panel,
      };
    case 'add_audio':
      if (state.audio && state.audio.url !== action.blobUrl) {
        URL.revokeObjectURL(state.audio.url);
      }

      return {
        ...state,
        audio: {
          data: action.clipBuffer,
          url: action.blobUrl,
        },
      };
    case 'remove_audio':
      return {
        ...state,
        audio: undefined,
      };
    case 'save_changes':
      return {
        ...state,
        lastSaved: state.template.present,
      };
    case 'undo': {
      const elementBeforeUndo = state.template.present.elements.find(
        ({ id }) => id === state.selectedId
      );
      const elementAfterUndo = last(state.template.past)?.elements.find(
        ({ id }) => id === state.selectedId
      );
      return elementAfterUndo
        ? state
        : {
            ...state,
            activePanel: getShapeToolPanel(elementBeforeUndo),
            selectedId: undefined,
          };
    }
    case 'redo': {
      const elementBeforeRedo = state.template.present.elements.find(
        ({ id }) => id === state.selectedId
      );
      const elementAfterRedo = last(state.template.future)?.elements.find(
        ({ id }) => id === state.selectedId
      );
      return elementAfterRedo
        ? state
        : {
            ...state,
            activePanel: getShapeToolPanel(elementBeforeRedo),
            selectedId: undefined,
          };
    }
    case 'loading_template':
      return {
        ...state,
        loading: true,
      };
    case 'load_template':
      return {
        ...state,
        loading: false,
        activePanel: EditorPanel.Settings,
        lastSaved: action.template,
        template: {
          past: [],
          future: [],
          present: action.template,
        },
      };
    default:
      return state;
  }
};

export default reducer;
