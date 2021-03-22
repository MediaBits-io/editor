import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import TextIcon from '../../../../../components/ui/Icons/TextIcon';
import { EditorPanel } from '../../../interfaces/Editor';
import { activePanelState } from '../../../state/atoms/editor';
import { isEitherPanelActiveSelector } from '../../../state/selectors/editor';
import SideMenuButton from '../../ui/SideMenuButton';

function TextToolButton() {
  const setActivePanel = useSetRecoilState(activePanelState);
  const selected = useRecoilValue(
    isEitherPanelActiveSelector([EditorPanel.Text, EditorPanel.TextProperties])
  );

  const handleClick = () => {
    setActivePanel(EditorPanel.Text);
  };

  return (
    <SideMenuButton onClick={handleClick} selected={selected} icon={TextIcon}>
      Text
    </SideMenuButton>
  );
}

export default TextToolButton;
