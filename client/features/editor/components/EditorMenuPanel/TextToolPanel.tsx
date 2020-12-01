import Konva from 'konva';
import React from 'react';
import Button from '../../../../components/ui/Button';
import useElements from '../../hooks/useElements';
import { ShapeType } from '../../interfaces/Shape';
import SideMenuPanel from '../ui/SideMenuPanel';

function TextToolPanel() {
  const { createElement } = useElements();

  const handleClickAddHeadlineText = () => {
    createElement<Konva.TextConfig>(
      ShapeType.Text,
      {
        text: 'Your text here',
        fontSize: 48,
        fontStyle: 'bold',
        fill: 'rgba(0, 0, 0, 1)',
      },
      Konva.Text
    );
  };

  return (
    <SideMenuPanel title="Text">
      <Button type="gray" onClick={handleClickAddHeadlineText}>
        Add headline text
      </Button>
    </SideMenuPanel>
  );
}

export default TextToolPanel;
