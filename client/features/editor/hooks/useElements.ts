import Konva from 'konva';
import { useCallback, useMemo } from 'react';
import UniqueIdContainer from '../../../containers/UniqueIdContainer';
import { EditorContainer } from '../containers/EditorContainer/EditorContainer';
import { ShapeType } from '../interfaces/Shape';

export default function useElements() {
  const { dispatch, state, template } = EditorContainer.useContainer();
  const { getUniqueId } = UniqueIdContainer.useContainer();

  const createElement = useCallback(
    function <Config extends Konva.NodeConfig>(
      type: ShapeType,
      { x, y, ...rest }: Config,
      BoundsShape: typeof Konva.Shape | typeof Konva.Image = Konva.Shape
    ) {
      const bounds = new BoundsShape(rest as any);
      const centeredX =
        template.dimensions.width / 2 - (bounds.scaleX() * bounds.width()) / 2;
      const centeredY =
        template.dimensions.height / 2 -
        (bounds.scaleX() * bounds.height()) / 2;

      dispatch({
        type: 'create_element',
        element: {
          id: getUniqueId(`${type}-element`),
          props: {
            x: x ?? centeredX,
            y: y ?? centeredY,
            ...rest,
          },
          type,
        },
      });
    },
    [dispatch, getUniqueId, template]
  );

  const selectedElement = useMemo(
    () => template.elements.find((element) => element.id === state.selectedId),
    [state.selectedId, template.elements]
  );

  return { selectedElement, createElement };
}
