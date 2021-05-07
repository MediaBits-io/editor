import React from 'react';
import { useRecoilValue } from 'recoil';
import { subtitleIdsState } from '../../../state/atoms/template';
import FontFamilySetting from '../TextProperties/FontFamilySetting/FontFamilySetting';
import FontStyleSetting from '../TextProperties/FontStyleSetting';
import TextAlignmentSetting from '../TextProperties/TextAlignementSetting';
import TextFillSetting from '../TextProperties/TextFillSetting';
import TextSizeSetting from '../TextProperties/TextSizeSetting';

function SubtitlesStyle() {
  const subtitleIds = useRecoilValue(subtitleIdsState);

  const elementId = subtitleIds[0];

  console.log(elementId);

  return (
    <>
      <TextFillSetting elementId={elementId} />
      <FontFamilySetting elementId={elementId} />
      <div className="flex space-x-2">
        <FontStyleSetting elementId={elementId} />
        <TextSizeSetting elementId={elementId} />
      </div>
      <TextAlignmentSetting elementId={elementId} />
    </>
  );
}

export default SubtitlesStyle;
