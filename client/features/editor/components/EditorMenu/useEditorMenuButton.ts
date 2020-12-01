import { EditorContainer } from '../../containers/EditorContainer/EditorContainer';
import { EditorPanel } from '../../interfaces/Editor';

export const useEditorMenuButton = (activeForPanels: EditorPanel[]) => {
  const { state } = EditorContainer.useContainer();
  return {
    selected: activeForPanels.includes(state.activePanel),
  };
};
