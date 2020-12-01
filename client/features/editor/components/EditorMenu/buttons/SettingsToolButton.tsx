import React from 'react';
import SideMenuButton from '../../ui/SideMenuButton';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
import { AdjustmentsOutline } from 'heroicons-react';
import { EditorPanel } from '../../../interfaces/Editor';
import { useEditorMenuButton } from '../useEditorMenuButton';

function SettingsToolButton() {
  const { dispatch } = EditorContainer.useContainer();
  const { selected } = useEditorMenuButton([EditorPanel.Settings]);

  const handleClick = () => {
    dispatch({ type: 'open_editor_panel', panel: EditorPanel.Settings });
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
