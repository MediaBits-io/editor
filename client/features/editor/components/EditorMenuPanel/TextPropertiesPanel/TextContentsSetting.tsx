import Konva from 'konva';
import React from 'react';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
import SideMenuSetting from '../../ui/SideMenuSetting';

interface Props {
  elementId: string;
  elementProps: Konva.TextConfig;
}

function TextContentsSetting({ elementId, elementProps }: Props) {
  const { dispatch } = EditorContainer.useContainer();

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: 'update_element',
      id: elementId,
      props: {
        text: e.target.value,
      } as Konva.TextConfig,
    });
  };

  return (
    <SideMenuSetting label="Content">
      <textarea
        rows={3}
        className="panel-item focus:outline-none focus:ring-0"
        value={elementProps.text}
        onChange={handleChangeText}
      />
    </SideMenuSetting>
  );
}

export default TextContentsSetting;
