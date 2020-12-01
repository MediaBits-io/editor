import React from 'react';
import SideMenuButton from '../../ui/SideMenuButton';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
import { PuzzleOutline } from 'heroicons-react';
import { EditorPanel } from '../../../interfaces/Editor';
import { useEditorMenuButton } from '../useEditorMenuButton';

function ElementsToolButton() {
  const { dispatch } = EditorContainer.useContainer();
  const { selected } = useEditorMenuButton([
    EditorPanel.Elements,
    EditorPanel.ProgressBarProperties,
    EditorPanel.RectangleProperties,
    EditorPanel.WaveformProperties,
  ]);

  const handleClick = () => {
    dispatch({ type: 'open_editor_panel', panel: EditorPanel.Elements });
  };

  return (
    <SideMenuButton
      onClick={handleClick}
      selected={selected}
      icon={PuzzleOutline}
    >
      Elements
    </SideMenuButton>
  );
}

export default ElementsToolButton;
