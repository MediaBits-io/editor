import { PhotographIcon } from '@heroicons/react/outline';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { EditorPanel } from '../../../interfaces/Editor';
import { activePanelState } from '../../../state/atoms/editor';
import { isEitherPanelActiveSelector } from '../../../state/selectors/editor';
import SideMenuButton from '../../ui/SideMenuButton';

function ImageToolButton() {
  const setActivePanel = useSetRecoilState(activePanelState);
  const selected = useRecoilValue(
    isEitherPanelActiveSelector([
      EditorPanel.Image,
      EditorPanel.ImageProperties,
    ])
  );

  const handleClick = () => {
    setActivePanel(EditorPanel.Image);
  };

  return (
    <SideMenuButton
      onClick={handleClick}
      selected={selected}
      icon={PhotographIcon}
    >
      Image
    </SideMenuButton>
  );
}

export default ImageToolButton;
