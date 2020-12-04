import Konva from 'konva';
import React from 'react';
import { EditorPanel } from '../../../interfaces/Editor';
import SideMenuPanel from '../../ui/SideMenuPanel';
import ShapeActions from '../ShapeActions';
import FontFamilySetting from './FontFamilySetting/FontFamilySetting';
import FontStyleSetting from './FontStyleSetting';
import TextAlignmentSetting from './TextAlignementSetting';
import TextContentsSetting from './TextContentsSetting';
import TextFillSetting from './TextFillSetting';
import TextSizeSetting from './TextSizeSetting';

interface Props {
  elementId: string;
  elementProps: Konva.TextConfig;
}

function TextPropertiesPanel({ elementId, elementProps }: Props) {
  return (
    <SideMenuPanel
      title="Text"
      previous={EditorPanel.Text}
      actions={<ShapeActions elementId={elementId} />}
    >
      <TextContentsSetting elementId={elementId} elementProps={elementProps} />
      <TextFillSetting elementId={elementId} elementProps={elementProps} />
      <FontFamilySetting elementId={elementId} elementProps={elementProps} />
      <div className="flex space-x-2">
        <FontStyleSetting elementId={elementId} elementProps={elementProps} />
        <TextSizeSetting elementId={elementId} elementProps={elementProps} />
      </div>
      <TextAlignmentSetting elementId={elementId} elementProps={elementProps} />
    </SideMenuPanel>
  );
}

export default TextPropertiesPanel;
