import React from 'react';
import SideMenuButton from '../../ui/SideMenuButton';
import { AdjustmentsIcon } from '@heroicons/react/outline';
import { EditorPanel } from '../../../interfaces/Editor';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activePanelState } from '../../../state/atoms/editor';
import { isEitherPanelActiveSelector } from '../../../state/selectors/editor';

function SettingsToolButton() {
  const setActivePanel = useSetRecoilState(activePanelState);
  const selected = useRecoilValue(
    isEitherPanelActiveSelector([EditorPanel.Settings])
  );

  const handleClick = () => {
    setActivePanel(EditorPanel.Settings);
  };

  return (
    <SideMenuButton
      onClick={handleClick}
      selected={selected}
      icon={AdjustmentsIcon}
    >
      Settings
    </SideMenuButton>
  );
}

export default SettingsToolButton;
