import React from 'react';
import SideMenuButton from '../../ui/SideMenuButton';
import { PuzzleOutline } from 'heroicons-react';
import { EditorPanel } from '../../../interfaces/Editor';
import { useEditorMenuButton } from '../useEditorMenuButton';
import { useSetRecoilState } from 'recoil';
import { activePanelState } from '../../../state/atoms/editor';

function ElementsToolButton() {
  const setActivePanel = useSetRecoilState(activePanelState);
  const { selected } = useEditorMenuButton([
    EditorPanel.Elements,
    EditorPanel.ProgressBarProperties,
    EditorPanel.RectangleProperties,
    EditorPanel.WaveformProperties,
  ]);

  const handleClick = () => {
    setActivePanel(EditorPanel.Elements);
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
