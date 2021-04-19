import Konva from 'konva';
import React from 'react';
import Button from '../../../../components/ui/Button';
import { DefaultFonts } from '../../constants';
import { ShapeType } from '../../interfaces/Shape';
import useElementsDispatcher from '../../state/dispatchers/elements';
import SideMenuPanel from '../ui/SideMenuPanel';

const TEXT_PROPERTIES: { [key in DefaultFonts]: Konva.TextConfig } = {
  [DefaultFonts.Headline]: {
    text: 'Headline Text',
    fontSize: 48,
    fontStyle: 'bold',
    fontFamily: DefaultFonts.Headline,
    fill: 'rgba(0, 0, 0, 1)',
    align: 'center',
  },
  [DefaultFonts.Regular]: {
    text: 'Regular text',
    fontSize: 24,
    fontFamily: DefaultFonts.Regular,
    fill: 'rgba(0, 0, 0, 1)',
    align: 'center',
  },
  [DefaultFonts.Handwritten]: {
    text: 'Handwritten text',
    fontSize: 36,
    fontFamily: DefaultFonts.Handwritten,
    fill: 'rgba(0, 0, 0, 1)',
    align: 'center',
  },
};

function TextToolPanel() {
  const { createElement } = useElementsDispatcher();

  const handleClickAddText = (font: DefaultFonts) => () => {
    createElement<Konva.TextConfig>(ShapeType.Text, TEXT_PROPERTIES[font]);
  };

  return (
    <SideMenuPanel title="Text">
      <div className="flex flex-col space-y-2">
        <Button
          type="gray"
          className="font-bold text-base py-1.5"
          style={{ fontFamily: DefaultFonts.Headline }}
          onClick={handleClickAddText(DefaultFonts.Headline)}
        >
          Headline
        </Button>
        <Button
          type="gray"
          className="text-base py-1.5"
          style={{ fontFamily: DefaultFonts.Regular }}
          onClick={handleClickAddText(DefaultFonts.Regular)}
        >
          Regular
        </Button>
        <Button
          type="gray"
          className="text-base py-1.5"
          style={{ fontFamily: DefaultFonts.Handwritten }}
          onClick={handleClickAddText(DefaultFonts.Handwritten)}
        >
          Handwritten
        </Button>
      </div>
    </SideMenuPanel>
  );
}

export default TextToolPanel;
