import Konva from 'konva';
import { ShapeConfig } from 'konva/types/Shape';
import { move } from 'ramda';
import { useRecoilCallback } from 'recoil';
import { uuid } from '../../../../utils/uuid';
import { SHAPE_PROPERTIES_PANEL, SHAPE_TOOL_PANEL } from '../../constants';
import { ShapeType } from '../../interfaces/Shape';
import { CanvasElement } from '../../interfaces/StageConfig';
import { activePanelState, selectedElementIdState } from '../atoms/editor';
import { dimensionsState, elementIdsState } from '../atoms/template';
import { selectedElementSelector } from '../selectors/editor';
import {
  elementPropsSelector,
  elementSelector,
  isSelectedElementSelector,
} from '../selectors/elements';

function useElementsDispatcher() {
  const updateElementProps = useRecoilCallback(
    ({ set }) => <T extends ShapeConfig>(
      id: string,
      properties: Partial<T>
    ) => {
      set(elementPropsSelector(id), (props) => ({
        ...props,
        ...properties,
      }));
    }
  );

  const reorderElement = useRecoilCallback(
    ({ snapshot, set }) => (id: string, inc: number) => {
      const elementIds = snapshot.getLoadable(elementIdsState).getValue();
      const index = elementIds.findIndex((elementId) => id === elementId);
      set(elementIdsState, move(index, index + inc, elementIds));
    },
    []
  );

  const selectElement = useRecoilCallback(
    ({ snapshot, set }) => (element: string | CanvasElement) => {
      const selectedElementId = snapshot
        .getLoadable(selectedElementIdState)
        .getValue();
      const canvasElement =
        typeof element === 'string'
          ? snapshot.getLoadable(elementSelector(element)).getValue()
          : element;

      if (!canvasElement || selectedElementId === canvasElement.id) {
        return;
      }

      set(selectedElementIdState, canvasElement.id);
      const elementPanel = SHAPE_PROPERTIES_PANEL[canvasElement.type];
      if (elementPanel) {
        set(activePanelState, elementPanel);
      }
    },
    []
  );

  const clearSelection = useRecoilCallback(
    ({ snapshot, reset, set }) => () => {
      const element = snapshot.getLoadable(selectedElementSelector).getValue();
      if (!element) {
        return;
      }

      const elementPanel = SHAPE_TOOL_PANEL[element.type];
      if (elementPanel) {
        set(activePanelState, elementPanel);
      } else {
        reset(activePanelState);
      }

      reset(selectedElementIdState);
    },
    []
  );

  const deleteElement = useRecoilCallback(
    ({ reset, snapshot }) => (id: string) => {
      if (snapshot.getLoadable(isSelectedElementSelector(id)).getValue()) {
        clearSelection();
      }
      reset(elementSelector(id));
    },
    [clearSelection]
  );

  const deleteSelectedElement = useRecoilCallback(
    ({ snapshot }) => () => {
      const selectedElementId = snapshot
        .getLoadable(selectedElementIdState)
        .getValue();
      if (selectedElementId) {
        deleteElement(selectedElementId);
      }
    },
    [deleteElement]
  );

  const createElement = useRecoilCallback(
    ({ snapshot, set }) => <Config extends Konva.NodeConfig>(
      type: ShapeType,
      props: Config
    ) => {
      const { x, y, scaleX = 1, scaleY = 1 } = props;

      const BoundsShape: typeof Konva.Shape =
        ({
          [ShapeType.Text]: Konva.Text,
          [ShapeType.Rectangle]: Konva.Rect,
          [ShapeType.Image]: Konva.Image,
        } as any)[type] ?? Konva.Shape;

      const dimensions = snapshot.getLoadable(dimensionsState).getValue();
      const bounds = new BoundsShape(props).getClientRect();
      const centeredX = dimensions.width / 2 - bounds.width / 2 - bounds.x;
      const centeredY = dimensions.height / 2 - bounds.height / 2 - bounds.y;
      const element = {
        id: uuid(type),
        props: {
          ...props,
          scaleX,
          scaleY,
          x: x ?? centeredX,
          y: y ?? centeredY,
        },
        type,
      };

      set(elementSelector(element.id), element);
      selectElement(element);
    },
    [selectElement]
  );

  const duplicateElement = useRecoilCallback(
    ({ snapshot }) => (id: string) => {
      const element = snapshot.getLoadable(elementSelector(id)).getValue();
      if (element) {
        createElement(element.type, {
          ...element.props,
          x: undefined,
          y: undefined,
        });
      }
    },
    [createElement]
  );

  return {
    deleteElement,
    createElement,
    duplicateElement,
    updateElementProps,
    deleteSelectedElement,
    reorderElement,
    selectElement,
    clearSelection,
  };
}

export default useElementsDispatcher;
