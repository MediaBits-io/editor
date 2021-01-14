import Konva from 'konva';
import { useCallback, useMemo } from 'react';
import { uuid } from '../../../utils/uuid';
import { EditorContainer } from '../containers/EditorContainer/EditorContainer';
import { ShapeType } from '../interfaces/Shape';

export default function useElements() {
  const { dispatch, state, template } = EditorContainer.useContainer();

  const createElement = useCallback(
    function <Config extends Konva.NodeConfig>(type: ShapeType, props: Config) {
      const { x, y, scaleX = 1, scaleY = 1 } = props;

      const BoundsShape: typeof Konva.Shape =
        ({
          [ShapeType.Text]: Konva.Text,
          [ShapeType.Rectangle]: Konva.Rect,
          [ShapeType.Image]: Konva.Image,
        } as any)[type] ?? Konva.Shape;

      const bounds = new BoundsShape(props).getClientRect();
      const centeredX =
        template.dimensions.width / 2 - bounds.width / 2 - bounds.x;
      const centeredY =
        template.dimensions.height / 2 - bounds.height / 2 - bounds.y;

      dispatch({
        type: 'create_element',
        element: {
          id: uuid(type),
          props: {
            ...props,
            scaleX,
            scaleY,
            x: x ?? centeredX,
            y: y ?? centeredY,
          },
          type,
        },
      });
    },
    [dispatch, template]
  );

  const selectedElement = useMemo(
    () => template.elements.find((element) => element.id === state.selectedId),
    [state.selectedId, template.elements]
  );

  return { selectedElement, createElement };
}
