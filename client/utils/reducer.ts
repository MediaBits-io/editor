export default function mergeReducers<S, A extends { type: string }>(
  ...reducers: ((state: S, action: any) => S)[]
) {
  return (state: S, action: A): S =>
    reducers.reduce(
      (mergedState, reducer) => reducer(mergedState, action),
      state
    );
}
