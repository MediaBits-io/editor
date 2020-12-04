import Konva from 'konva';
import React from 'react';
import Button from '../../../../../components/ui/Button';
import AlignCenterIcon from '../../../../../components/ui/Icons/AlignCenterIcon';
import AlignLeftIcon from '../../../../../components/ui/Icons/AlignLeftIcon';
import AlignRightIcon from '../../../../../components/ui/Icons/AlignRightIcon';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
import SideMenuSetting from '../../ui/SideMenuSetting';

interface Props {
  elementId: string;
  elementProps: Konva.TextConfig;
}

function TextAlignmentSetting({ elementId, elementProps }: Props) {
  const { dispatch } = EditorContainer.useContainer();

  const onChangeAlign = (align: string) => () => {
    dispatch({
      type: 'update_element',
      id: elementId,
      props: {
        align,
      } as Konva.TextConfig,
    });
  };

  return (
    <SideMenuSetting
      label="Text alignment"
      className="w-full flex flex-col"
      noLabel
    >
      <div className="flex flex-grow">
        <Button
          type={elementProps.align === 'left' ? 'accented' : 'secondary'}
          className="rounded-r-none focus:z-10"
          onClick={onChangeAlign('left')}
          title="Align left"
        >
          <AlignLeftIcon className="w-4 h-4 my-0.5" />
        </Button>
        <Button
          type={elementProps.align === 'center' ? 'accented' : 'secondary'}
          className="-ml-px rounded-r-none rounded-l-none focus:z-10"
          onClick={onChangeAlign('center')}
          title="Align center"
        >
          <AlignCenterIcon className="w-4 h-4 my-0.5" />
        </Button>
        <Button
          type={elementProps.align === 'right' ? 'accented' : 'secondary'}
          className="-ml-px rounded-l-none focus:z-10"
          onClick={onChangeAlign('right')}
          title="Align right"
        >
          <AlignRightIcon className="w-4 h-4 my-0.5" />
        </Button>
      </div>
    </SideMenuSetting>
  );
}

export default TextAlignmentSetting;
