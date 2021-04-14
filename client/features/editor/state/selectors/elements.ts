import { ShapeConfig } from 'konva/types/Shape';
import { without } from 'ramda';
import { DefaultValue, selector, selectorFamily } from 'recoil';
import { CanvasElement } from '../../interfaces/StageConfig';
import { selectedElementIdState } from '../atoms/editor';
import { elementIdsState, elementState } from '../atoms/template';

export const elementsSelector = selector<CanvasElement[]>({
  key: 'elementsSelector',
  get: ({ get }) => get(elementIdsState).map((id) => get(elementState(id))!),
  set: ({ reset, get, set }, elements) => {
    if (elements instanceof DefaultValue) {
      get(elementIdsState).map((id) => reset(elementState(id)));
      reset(elementIdsState);
    } else {
      set(
        elementIdsState,
        elements.map((element) => {
          set(elementState(element.id), element);
          return element.id;
        })
      );
    }
  },
});

export const elementSelector = selectorFamily<
  CanvasElement | undefined,
  string
>({
  key: 'elementSelector',
  get: (id) => ({ get }) => get(elementState(id)),
  set: (id) => ({ set, get, reset }, element) => {
    if (element instanceof DefaultValue) {
      reset(elementState(id));
      set(elementIdsState, (elementIds) => without([id], elementIds));
    } else {
      set(elementState(id), element);
      const elementIds = get(elementIdsState);
      if (!elementIds.includes(id)) {
        set(elementIdsState, [...elementIds, id]);
      }
    }
  },
});

export const elementPropsSelector = selectorFamily({
  key: 'elementPropsSelector',
  get: <P extends ShapeConfig>(id: string) => ({ get }) =>
    get(elementSelector(id))?.props as P,
  set: <P extends ShapeConfig>(id: string) => ({ get, set }, props: P) => {
    if (!props || props instanceof DefaultValue) {
      console.warn(
        `Element must have props, ignoring ${JSON.stringify(props)}`
      );
      return;
    }

    const element = get(elementSelector(id));
    if (element) {
      set(elementSelector(id), { ...element, props });
    }
  },
});

export const isSelectedElementSelector = selectorFamily({
  key: 'isSelectedElementSelector',
  get: (id: string) => ({ get }) => get(selectedElementIdState) === id,
});
