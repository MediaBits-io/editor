import { atom } from 'recoil';
import { AudioState } from '../../interfaces/Audio';

export const audioModalState = atom<{
  visible: boolean;
  initialAudio?: AudioState;
  onContinue?: (clipBuffer: Blob) => void;
  onCancel?: () => void;
}>({
  key: 'audioModalState',
  default: { visible: false },
});

export const progressModalState = atom<{
  visible: boolean;
  taskId?: string;
  error?: boolean;
}>({
  key: 'progressModalState',
  default: { visible: false },
});
