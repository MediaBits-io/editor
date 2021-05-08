import React from 'react';
import { EditorPanel } from '../../../interfaces/Editor';
import SideMenuPanel from '../../ui/SideMenuPanel';
import ShapeActions from '../ShapeActions/ShapeActions';
import FontFamilySetting from '../TextProperties/FontFamilySetting/FontFamilySetting';
import FontStyleSetting from '../TextProperties/FontStyleSetting';
import TextAlignmentSetting from '../TextProperties/TextAlignementSetting';
import TextContentsSetting from './TextContentsSetting';
import TextFillSetting from '../TextProperties/TextFillSetting';
import TextSizeSetting from '../TextProperties/TextSizeSetting';
import TextStrokeSetting from '../TextProperties/TextStrokeSetting';
import TextShadowSetting from '../TextProperties/TextShadowSetting';
import TextBackgroundSetting from '../TextProperties/TextBackgroundSetting';
import LineHeightSetting from '../TextProperties/LineHeightSetting';

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
      <FontFamilySetting elementId={elementId} />
      <div className="flex space-x-2">
        <FontStyleSetting elementId={elementId} />
        <TextSizeSetting elementId={elementId} />
      </div>
      <div className="flex space-x-2">
        <TextAlignmentSetting elementId={elementId} />
        <LineHeightSetting elementId={elementId} />
      </div>
      <TextFillSetting elementId={elementId} />
      <TextBackgroundSetting elementId={elementId} />
      <TextStrokeSetting elementId={elementId} />
      <TextShadowSetting elementId={elementId} />
    </SideMenuPanel>
  );
}

export default TextPropertiesPanel;
