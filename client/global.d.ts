import 'unstated-next';

declare module 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
declare module 'wavesurfer.js/dist/plugin/wavesurfer.regions';
declare module 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
declare module 'audio-buffer-utils';
declare module '@etercast/mp3';
declare module 'react-imask';
declare module 'react-aspect-ratio';
declare module 'tailwindcss/colors';

declare module 'unstated-next' {
  export function createContainer<Value, State = void>(
    useHook: (initialState: State) => Value
  ): Container<Value, State>;
}
