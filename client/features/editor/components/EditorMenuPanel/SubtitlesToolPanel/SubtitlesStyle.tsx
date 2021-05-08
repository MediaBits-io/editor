import React from 'react';
import { useRecoilValue } from 'recoil';
import { subtitleIdsState } from '../../../state/atoms/template';
import FontFamilySetting from '../TextProperties/FontFamilySetting/FontFamilySetting';
import FontStyleSetting from '../TextProperties/FontStyleSetting';
import LineHeightSetting from '../TextProperties/LineHeightSetting';
import TextAlignmentSetting from '../TextProperties/TextAlignementSetting';
import TextBackgroundSetting from '../TextProperties/TextBackgroundSetting';
import TextFillSetting from '../TextProperties/TextFillSetting';
import TextShadowSetting from '../TextProperties/TextShadowSetting';
import TextSizeSetting from '../TextProperties/TextSizeSetting';
import TextStrokeSetting from '../TextProperties/TextStrokeSetting';

function SubtitlesStyle() {
  const subtitleIds = useRecoilValue(subtitleIdsState);
  const elementId = subtitleIds[0];

  return (
    <>
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
    </>
  );
}

export default SubtitlesStyle;
