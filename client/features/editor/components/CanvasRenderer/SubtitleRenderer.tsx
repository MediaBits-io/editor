import React from 'react';
import { useRecoilValue } from 'recoil';
import { subtitlesStyleState } from '../../state/atoms/template';
import { subtitleSelector } from '../../state/selectors/subtitles';
import TextRenderer from './TextRenderer';

interface Props {
  id: string;
}

function SubtitleRenderer({ id }: Props) {
  const subtitle = useRecoilValue(subtitleSelector(id));
  const style = useRecoilValue(subtitlesStyleState);

  if (!subtitle) {
    return null;
  }

  const { text } = subtitle;

  return <TextRenderer id={id} key={id} props={{ ...style, text }} />;
}

export default SubtitleRenderer;
