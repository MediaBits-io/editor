import Konva from 'konva';
import React, { useMemo } from 'react';
import Button from '../../../../../components/ui/Button';
import BoldTextIcon from '../../../../../components/ui/Icons/BoldTextIcon';
import ItalicTextIcon from '../../../../../components/ui/Icons/ItalicTextIcon';
import UnderlineTextIcon from '../../../../../components/ui/Icons/UnderlineTextIcon';
import classNames from '../../../../../utils/classNames';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
import SideMenuSetting from '../../ui/SideMenuSetting';

interface Props {
  elementId: string;
  elementProps: Konva.TextConfig;
}

function FontStyleSetting({ elementId, elementProps }: Props) {
  const { dispatch } = EditorContainer.useContainer();
  const styles = useMemo(() => elementProps.fontStyle?.split(' '), [
    elementProps.fontStyle,
  ]);
  const isBold = useMemo(() => styles?.includes('bold'), [styles]);
  const isItalic = useMemo(() => styles?.includes('italic'), [styles]);
  const isUnderline = elementProps?.textDecoration === 'underline';

  const onToggleBold = () => {
    dispatch({
      type: 'update_element',
      id: elementId,
      props: {
        fontStyle: isBold
          ? styles?.filter((style) => style !== 'bold').join(' ')
          : classNames(...(styles ?? []), 'bold'),
      } as Konva.TextConfig,
    });
  };

  const onToggleItalic = () => {
    dispatch({
      type: 'update_element',
      id: elementId,
      props: {
        fontStyle: isItalic
          ? styles?.filter((style) => style !== 'italic').join(' ')
          : classNames(...(styles ?? []), 'italic'),
      } as Konva.TextConfig,
    });
  };

  const onToggleUnderline = () => {
    dispatch({
      type: 'update_element',
      id: elementId,
      props: {
        textDecoration: isUnderline ? undefined : 'underline',
      } as Konva.TextConfig,
    });
  };

  return (
    <SideMenuSetting label="Style" className="w-full flex flex-col" noLabel>
      <div className="flex flex-grow">
        <Button
          type={isBold ? 'accented' : 'secondary'}
          className="rounded-r-none focus:z-10"
          onClick={onToggleBold}
          title="Bold"
        >
          <BoldTextIcon className="w-4 h-4" />
        </Button>
        <Button
          type={isItalic ? 'accented' : 'secondary'}
          className="-ml-px rounded-r-none rounded-l-none focus:z-10"
          onClick={onToggleItalic}
          title="Italic"
        >
          <ItalicTextIcon className="w-4 h-4" />
        </Button>
        <Button
          type={isUnderline ? 'accented' : 'secondary'}
          className="-ml-px rounded-l-none focus:z-10"
          onClick={onToggleUnderline}
          title="Underline"
        >
          <UnderlineTextIcon className="w-4 h-4" />
        </Button>
      </div>
    </SideMenuSetting>
  );
}

export default FontStyleSetting;
