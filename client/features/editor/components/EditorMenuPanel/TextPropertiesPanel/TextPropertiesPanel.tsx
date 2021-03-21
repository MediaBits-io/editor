import React from 'react';
import { EditorPanel } from '../../../interfaces/Editor';
import SideMenuPanel from '../../ui/SideMenuPanel';
import ShapeActions from '../ShapeActions/ShapeActions';
import FontFamilySetting from './FontFamilySetting/FontFamilySetting';
import FontStyleSetting from './FontStyleSetting';
import TextAlignmentSetting from './TextAlignementSetting';
import TextContentsSetting from './TextContentsSetting';
import TextFillSetting from './TextFillSetting';
import TextSizeSetting from './TextSizeSetting';

interface Props {
  elementId: string;
}

function TextPropertiesPanel({ elementId }: Props) {
  return (
    <SideMenuPanel
      title="Text"
      previous={EditorPanel.Text}
      actions={<ShapeActions elementId={elementId} />}
    >
      <TextContentsSetting elementId={elementId} />
      <TextFillSetting elementId={elementId} />
      <FontFamilySetting elementId={elementId} />
      <div className="flex space-x-2">
        <FontStyleSetting elementId={elementId} />
        <TextSizeSetting elementId={elementId} />
      </div>
      <TextAlignmentSetting elementId={elementId} />
    </SideMenuPanel>
  );
}

export default TextPropertiesPanel;
