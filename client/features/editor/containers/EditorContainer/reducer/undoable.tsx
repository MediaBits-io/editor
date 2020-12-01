export type Action = { type: 'undo' } | { type: 'redo' };

export interface Undoable<S> {
  past: S[];
  future: S[];
  present: S;
}

export default function undoable<
  S,
  State extends Undoable<S>,
  A extends { type: string }
>(reducer: (state: S, action: A) => S) {
  return (state: State, action: Action | A): State => {
    const { past, present, future } = state;

    switch (action.type) {
      case 'undo':
        if (!past.length) {
          return state;
        }
        return {
          ...state,
          past: past.slice(0, past.length - 1),
          present: past[past.length - 1],
          future: [present, ...future],
        };
      case 'redo':
        if (!future.length) {
          return state;
        }
        return {
          ...state,
          past: [...past, present],
          present: future[0],
          future: future.slice(1),
        };
      default:
        // Delegate handling the action to the passed reducer
        const newPresent = reducer(present, action as A);
        if (present === newPresent) {
          return state;
        }
        return {
          ...state,
          past: [...past, present],
          present: newPresent,
          future: [],
        };
    }
  };
}
