import { SHAPE_PROPERTIES_PANEL, SHAPE_TOOL_PANEL } from '../../../constants';
import { EditorPanel } from '../../../interfaces/Editor';
import { CanvasElement } from '../../../interfaces/StageConfig';
import { EditorState } from '../interfaces';

export type EditorAction =
  | { type: 'create_element'; element: CanvasElement }
  | { type: 'select_element'; id: string }
  | { type: 'clear_selection' }
  | { type: 'open_editor_panel'; panel: EditorPanel }
  | { type: 'delete_element'; id: string };

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
    default:
      return state;
  }
};

export default reducer;
