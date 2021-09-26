declare module 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
declare module 'wavesurfer.js/dist/plugin/wavesurfer.regions';
declare module 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
declare module 'audio-buffer-utils';
declare module '@vincaslt/mp3';
declare module 'react-imask';
declare module 'react-aspect-ratio';

declare module 'unstated-next' {
  import React from 'react';
  export interface ContainerProviderProps<State = void> {
    initialState?: State;
    children: React.ReactNode;
  }
  export interface Container<Value, State = void> {
    Provider: React.ComponentType<ContainerProviderProps<State>>;
    useContainer: () => Value;
  }
  export function createContainer<Value, State = void>(
    useHook: (initialState: State) => Value
  ): Container<Value, State>;
  export function useContainer<Value, State = void>(
    container: Container<Value, State>
  ): Value;
}
