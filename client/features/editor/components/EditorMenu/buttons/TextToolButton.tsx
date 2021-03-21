import React from 'react';
import SideMenuButton from '../../ui/SideMenuButton';
import TextIcon from '../../../../../components/ui/Icons/TextIcon';
import { EditorPanel } from '../../../interfaces/Editor';
import { useEditorMenuButton } from '../useEditorMenuButton';
import { useSetRecoilState } from 'recoil';
import { activePanelState } from '../../../state/atoms/editor';

function TextToolButton() {
  const setActivePanel = useSetRecoilState(activePanelState);
  const { selected } = useEditorMenuButton([
    EditorPanel.Text,
    EditorPanel.TextProperties,
  ]);

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
