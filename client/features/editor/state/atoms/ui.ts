import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { AudioState } from '../../interfaces/Audio';

const { persistAtom } = recoilPersist({ key: 'mediabits_editor_ui' });

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

export const infoPopupState = atom<{ visible: boolean }>({
  key: 'infoPopupState',
  default: { visible: process.browser },
  effects_UNSTABLE: [persistAtom],
});

export const feedbackPopupState = atom<{
  discarded: boolean;
}>({
  key: 'feedbackPopupState',
  default: { discarded: false },
  effects_UNSTABLE: [persistAtom],
});
