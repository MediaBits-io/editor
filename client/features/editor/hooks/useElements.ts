import Konva from 'konva';
import { useCallback, useMemo } from 'react';
import { uuid } from '../../../utils/uuid';
import { EditorContainer } from '../containers/EditorContainer/EditorContainer';
import { ShapeType } from '../interfaces/Shape';

export default function useElements() {
  const { dispatch, state, template } = EditorContainer.useContainer();

  const createElement = useCallback(
    function <Config extends Konva.NodeConfig>(
      type: ShapeType,
      props: Config,
      BoundsShape: typeof Konva.Shape | typeof Konva.Image = Konva.Shape
    ) {
      const { x, y, width, height, scaleX = 1, scaleY = 1 } = props;
      const bounds = new BoundsShape(props as any);
      const elWidth = width ? scaleX * width : bounds.scaleX() * bounds.width();
      const elHeight = height
        ? scaleY * height
        : bounds.scaleY() * bounds.height();
      const centeredX = template.dimensions.width / 2 - elWidth / 2;
      const centeredY = template.dimensions.height / 2 - elHeight / 2;

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
            width: width || bounds.width(),
            height: height || bounds.height(),
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
