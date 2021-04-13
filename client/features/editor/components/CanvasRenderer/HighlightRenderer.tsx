import React from 'react';
import { Rect } from 'react-konva';
import { useRecoilValue } from 'recoil';
import { ElementRefsContainer } from '../../containers/ElementRefsContainer';
import {
  highlightedElementIdState,
  selectedElementIdState,
} from '../../state/atoms/editor';

function HighlightRenderer() {
  const { elementRefs } = ElementRefsContainer.useContainer();
  const selectedElementId = useRecoilValue(selectedElementIdState);
  const highlightedElementId = useRecoilValue(highlightedElementIdState);

  const element = highlightedElementId
    ? elementRefs[highlightedElementId]
    : undefined;

  if (!element || selectedElementId === highlightedElementId) {
    return null;
  }

  const stage = element.ref.getStage();
  const scaleX = stage?.scaleX() ?? 1;
  const scaleY = stage?.scaleY() ?? 1;
  const bounds = element.ref.getClientRect();

  return (
    <Rect
      {...element.ref.getPosition()}
      width={bounds.width / scaleX}
      height={bounds.height / scaleY}
      strokeWidth={1}
      stroke="rgba(0, 161, 255, 0.4)"
      listening={false}
    />
  );
}

export default HighlightRenderer;
