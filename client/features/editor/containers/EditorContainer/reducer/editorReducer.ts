import { Action as UndoableAction } from './undoable';

export type EditorAction = UndoableAction;

const reducer = (state: any, action: EditorAction) => {
  switch (action.type) {
    // case 'undo': {
    //   // const elementBeforeUndo = state.template.present.elements.find(
    //   //   ({ id }) => id === state.selectedId
    //   // );
    //   const elementAfterUndo = last(state.template.past)?.elements.find(
    //     ({ id }) => id === state.selectedId
    //   );
    //   return elementAfterUndo
    //     ? state
    //     : {
    //         ...state,
    //         // activePanel: getShapeToolPanel(elementBeforeUndo),
    //         selectedId: undefined,
    //       };
    // }
    // case 'redo': {
    //   // const elementBeforeRedo = state.template.present.elements.find(
    //   //   ({ id }) => id === state.selectedId
    //   // );
    //   const elementAfterRedo = last(state.template.future)?.elements.find(
    //     ({ id }) => id === state.selectedId
    //   );
    //   return elementAfterRedo
    //     ? state
    //     : {
    //         ...state,
    //         // activePanel: getShapeToolPanel(elementBeforeRedo),
    //         selectedId: undefined,
    //       };
    // }
    default:
      return state;
  }
};

export default reducer;
