import Konva from 'konva';
import { move, update } from 'ramda';
import { CanvasElement, Template } from '../../../interfaces/StageConfig';

export type TemplateState = Template;
export type TemplateAction =
  | { type: 'update_stage'; config: Partial<Template> }
  | { type: 'create_element'; element: CanvasElement }
  | { type: 'delete_element'; id: string }
  | { type: 'reorder_element'; id: string; inc: number }
  | { type: 'update_element'; id: string; props: Konva.ShapeConfig };

export default function templateReducer(
  state: TemplateState,
  action: TemplateAction
): TemplateState {
  switch (action.type) {
    case 'update_stage':
      return {
        ...state,
        ...action.config,
      };
    case 'create_element':
      return {
        ...state,
        elements: [...state.elements, action.element],
      };
    case 'delete_element':
      return {
        ...state,
        elements: state.elements.filter(({ id }) => id !== action.id),
      };
    case 'update_element': {
      const index = state.elements.findIndex(({ id }) => id === action.id);
      const element = state.elements[index];

      return {
        ...state,
        elements: element
          ? update(
              index,
              {
                id: action.id,
                props: { ...element.props, ...action.props },
                type: element.type,
              },
              state.elements
            )
          : state.elements,
      };
    }
    case 'reorder_element': {
      const index = state.elements.findIndex(({ id }) => id === action.id);
      return {
        ...state,
        elements: move(index, index + action.inc, state.elements),
      };
    }
    default:
      return state;
  }
}
