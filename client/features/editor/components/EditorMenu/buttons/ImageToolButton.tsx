import React from 'react';
import SideMenuButton from '../../ui/SideMenuButton';
import { PhotographOutline } from 'heroicons-react';
import { EditorPanel } from '../../../interfaces/Editor';
import { useEditorMenuButton } from '../useEditorMenuButton';
import { useSetRecoilState } from 'recoil';
import { activePanelState } from '../../../state/atoms/editor';

function ImageToolButton() {
  const setActivePanel = useSetRecoilState(activePanelState);
  const { selected } = useEditorMenuButton([
    EditorPanel.Image,
    EditorPanel.ImageProperties,
  ]);

  const handleClick = () => {
    setActivePanel(EditorPanel.Image);
  };

  return (
    <SideMenuButton
      onClick={handleClick}
      selected={selected}
      icon={PhotographOutline}
    >
      Image
    </SideMenuButton>
  );
}

export default ImageToolButton;
