import Konva from 'konva';
import React from 'react';
import { useRecoilValue } from 'recoil';
import useElementsDispatcher from '../../../state/dispatchers/elements';
import { elementPropsSelector } from '../../../state/selectors/elements';
import SideMenuSetting from '../../ui/SideMenuSetting';

interface Props {
  elementId: string;
}

function TextContentsSetting({ elementId }: Props) {
  const elementProps = useRecoilValue(
    elementPropsSelector<Konva.TextConfig>(elementId)
  );
  const { updateElementProps } = useElementsDispatcher();

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateElementProps<Konva.TextConfig>(elementId, { text: e.target.value });
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
