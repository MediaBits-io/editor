import { useRecoilValue } from 'recoil';
import { EditorPanel } from '../../interfaces/Editor';
import { activePanelState } from '../../state/atoms/editor';

export const useEditorMenuButton = (activeForPanels: EditorPanel[]) => {
  const activePanel = useRecoilValue(activePanelState);
  return {
    selected: activeForPanels.includes(activePanel),
  };
};
