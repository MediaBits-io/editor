import React from 'react';
import SideMenuButton from '../../ui/SideMenuButton';
import { AdjustmentsOutline } from 'heroicons-react';
import { EditorPanel } from '../../../interfaces/Editor';
import { useEditorMenuButton } from '../useEditorMenuButton';
import { useSetRecoilState } from 'recoil';
import { activePanelState } from '../../../state/atoms/editor';

function SettingsToolButton() {
  const setActivePanel = useSetRecoilState(activePanelState);
  const { selected } = useEditorMenuButton([EditorPanel.Settings]);

  const handleClick = () => {
    setActivePanel(EditorPanel.Settings);
  };

  return (
    <SideMenuButton
      onClick={handleClick}
      selected={selected}
      icon={AdjustmentsOutline}
    >
      Settings
    </SideMenuButton>
  );
}

export default SettingsToolButton;
