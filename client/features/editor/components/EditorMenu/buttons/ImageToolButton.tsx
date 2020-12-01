import React from 'react';
import SideMenuButton from '../../ui/SideMenuButton';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
import { PhotographOutline } from 'heroicons-react';
import { EditorPanel } from '../../../interfaces/Editor';
import { useEditorMenuButton } from '../useEditorMenuButton';

function ImageToolButton() {
  const { dispatch } = EditorContainer.useContainer();
  const { selected } = useEditorMenuButton([
    EditorPanel.Image,
    EditorPanel.ImageProperties,
  ]);

  const handleClick = () => {
    dispatch({ type: 'open_editor_panel', panel: EditorPanel.Image });
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
