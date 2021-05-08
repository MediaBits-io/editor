import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import Button from '../../../../../components/ui/Button';
import BoldTextIcon from '../../../../../components/ui/Icons/BoldTextIcon';
import ItalicTextIcon from '../../../../../components/ui/Icons/ItalicTextIcon';
import UnderlineTextIcon from '../../../../../components/ui/Icons/UnderlineTextIcon';
import classNames from '../../../../../utils/classNames';
import { TextConfig } from '../../../interfaces/Shape';
import useElementsDispatcher from '../../../state/dispatchers/elements';
import { elementPropsSelector } from '../../../state/selectors/elements';
import SideMenuSetting from '../../ui/SideMenuSetting';

interface Props {
  elementId: string;
}

function FontStyleSetting({ elementId }: Props) {
  const { updateElementProps } = useElementsDispatcher();
  const elementProps = useRecoilValue(
    elementPropsSelector<TextConfig>(elementId)
  );

  const styles = useMemo(() => elementProps.fontStyle?.split(' '), [
    elementProps.fontStyle,
  ]);
  const isBold = useMemo(() => styles?.includes('bold'), [styles]);
  const isItalic = useMemo(() => styles?.includes('italic'), [styles]);
  const isUnderline = elementProps?.textDecoration === 'underline';

  const onToggleBold = () => {
    updateElementProps<TextConfig>(elementId, {
      fontStyle: isBold
        ? styles?.filter((style) => style !== 'bold').join(' ')
        : classNames(...(styles ?? []), 'bold'),
    });
  };

  const onToggleItalic = () => {
    updateElementProps<TextConfig>(elementId, {
      fontStyle: isItalic
        ? styles?.filter((style) => style !== 'italic').join(' ')
        : classNames(...(styles ?? []), 'italic'),
    });
  };

  const onToggleUnderline = () => {
    updateElementProps<TextConfig>(elementId, {
      textDecoration: isUnderline ? undefined : 'underline',
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
