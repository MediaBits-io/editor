import { PuzzleIcon } from '@heroicons/react/outline';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { EditorPanel } from '../../../interfaces/Editor';
import { activePanelState } from '../../../state/atoms/editor';
import { isEitherPanelActiveSelector } from '../../../state/selectors/editor';
import SideMenuButton from '../../ui/SideMenuButton';

function ElementsToolButton() {
  const setActivePanel = useSetRecoilState(activePanelState);
  const selected = useRecoilValue(
    isEitherPanelActiveSelector([
      EditorPanel.Elements,
      EditorPanel.ProgressBarProperties,
      EditorPanel.RectangleProperties,
      EditorPanel.WaveformProperties,
    ])
  );

  const handleClick = () => {
    setActivePanel(EditorPanel.Elements);
  };

  return (
    <SideMenuButton onClick={handleClick} selected={selected} icon={PuzzleIcon}>
      Elements
    </SideMenuButton>
  );
}

export default ElementsToolButton;
