import Konva from 'konva';
import { ShapeConfig } from 'konva/types/Shape';
import { move } from 'ramda';
import { useRecoilCallback } from 'recoil';
import { uuid } from '../../../../utils/uuid';
import { ShapeType } from '../../interfaces/Shape';
import { dimensionsState, elementIdsState } from '../atoms/template';
import { selectedElementIdSelector } from '../selectors/editor';
import { elementPropsSelector, elementSelector } from '../selectors/elements';

function useElementsDispatcher() {
  const deleteElement = useRecoilCallback(
    ({ reset }) => (id: string) => {
      reset(elementSelector(id));
    },
    []
  );

  const deleteSelectedElement = useRecoilCallback(
    ({ snapshot, reset }) => async () => {
      const selectedElementId = await snapshot.getPromise(
        selectedElementIdSelector
      );
      if (selectedElementId) {
        reset(elementSelector(selectedElementId));
      }
    },
    []
  );

  const createElement = useRecoilCallback(
    ({ snapshot, set }) => async <Config extends Konva.NodeConfig>(
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

      const dimensions = await snapshot.getPromise(dimensionsState);
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
      set(selectedElementIdSelector, element.id);
    },
    []
  );

  const duplicateElement = useRecoilCallback(
    ({ snapshot }) => async (id: string) => {
      const element = await snapshot.getPromise(elementSelector(id));
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
    ({ snapshot, set }) => async (id: string, inc: number) => {
      const elementIds = await snapshot.getPromise(elementIdsState);
      const index = elementIds.findIndex((elementId) => id === elementId);
      set(elementIdsState, move(index, index + inc, elementIds));
    },
    []
  );

  return {
    deleteElement,
    createElement,
    duplicateElement,
    updateElementProps,
    deleteSelectedElement,
    reorderElement,
  };
}

export default useElementsDispatcher;
