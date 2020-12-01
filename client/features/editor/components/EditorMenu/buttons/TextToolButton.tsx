import React from 'react';
import SideMenuButton from '../../ui/SideMenuButton';
import TextIcon from '../../../../../components/ui/Icons/TextIcon';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
import { EditorPanel } from '../../../interfaces/Editor';
import { useEditorMenuButton } from '../useEditorMenuButton';

function TextToolButton() {
  const { dispatch } = EditorContainer.useContainer();
  const { selected } = useEditorMenuButton([
    EditorPanel.Text,
    EditorPanel.TextProperties,
  ]);

  const handleClick = () => {
    dispatch({ type: 'open_editor_panel', panel: EditorPanel.Text });
  };

  return (
    <SideMenuButton onClick={handleClick} selected={selected} icon={TextIcon}>
      Text
    </SideMenuButton>
  );
}

export default TextToolButton;
