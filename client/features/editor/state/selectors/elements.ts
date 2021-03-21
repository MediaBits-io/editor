import { ShapeConfig } from 'konva/types/Shape';
import { without } from 'ramda';
import { DefaultValue, selector, selectorFamily } from 'recoil';
import { CanvasElement } from '../../interfaces/StageConfig';
import { elementState, elementIdsState } from '../atoms/template';
import { selectedElementIdSelector } from './editor';

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
      const selectedElementId = get(selectedElementIdSelector);
      if (selectedElementId === id) {
        reset(selectedElementIdSelector);
      }
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

// export const elementPropSelector = selectorFamily({
//   key: 'elementPropSelector',
//   get: <T extends ShapeConfig, P extends keyof T>({
//     id,
//     path: propPath,
//   }: {
//     id: string;
//     path: P;
//   }) => ({ get }): T[P] => {
//     const props = get(elementPropsSelector(id))!;
//     return prop<P, T>(propPath, props as T);
//   },
// });
