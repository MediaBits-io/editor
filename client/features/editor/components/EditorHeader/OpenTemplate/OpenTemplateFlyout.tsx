import { CloudDownload } from 'heroicons-react';
import React, { useRef, useState } from 'react';
import Flyout from '../../../../../components/ui/Flyout';
import UploadToDiskIcon from '../../../../../components/ui/Icons/UploadToDiskIcon';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
import FlyoutMenuButton from '../FlyoutMenuButton';
import { readBlobAsText } from '../../../../../utils/blob';
import DiscardChangesModal from '../../DiscardChangesModal';
import {
  extractTemplateFonts,
  loadTemplateImages,
} from '../../../utils/template';
import { loadFonts } from '../../../../../utils/fonts';
import { LOADABLE_FONTS } from '../../../constants';

interface Props {
  isOpen: boolean;
  close: () => void;
  targetElement: HTMLElement | null;
}

function OpenTemplateFlyout({ isOpen, close, targetElement }: Props) {
  const { dispatch, hasUnsavedChanges } = EditorContainer.useContainer();
  const [isDiscardChangesVisible, setDiscardChangesVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];

    if (inputRef.current) {
      inputRef.current.value = '';
    }

    if (
      file &&
      (file.type === 'application/json' || file.name.endsWith('.json'))
    ) {
      try {
        const loadingTimeout = setTimeout(() => {
          dispatch({ type: 'loading_template' });
        }, 1000);

        const template = JSON.parse(await readBlobAsText(file));
        const fonts = extractTemplateFonts(template);
        await Promise.all([
          loadTemplateImages(template),
          fonts.length
            ? loadFonts(fonts.filter((font) => LOADABLE_FONTS.includes(font)))
            : undefined,
        ]);

        // Do not show loader if all fonts loaded from cache
        clearTimeout(loadingTimeout);

        dispatch({
          type: 'load_template',
          template,
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleClickOpen = () => {
    if (hasUnsavedChanges) {
      setDiscardChangesVisible(true);
    } else {
      inputRef.current?.click();
    }
  };

  const handleDiscardClick = () => {
    inputRef.current?.click();
    setDiscardChangesVisible(false);
  };

  const handleCancelDiscardClick = () => {
    setDiscardChangesVisible(false);
  };

  return (
    <>
      <DiscardChangesModal
        visible={isDiscardChangesVisible}
        ok={handleDiscardClick}
        cancel={handleCancelDiscardClick}
      />
      <input
        ref={inputRef}
        type="file"
        onChange={handleChangeFile}
        className="hidden"
        accept=".json,application/json"
      />
      <Flyout
        wrapperClass="w-72"
        className="p-3 space-y-2"
        targetElement={targetElement}
        isOpen={isOpen}
        close={close}
      >
        <FlyoutMenuButton
          title="Open from disk"
          description="Select the template file from your computer"
          onClick={handleClickOpen}
          icon={UploadToDiskIcon}
        />
        <FlyoutMenuButton
          title="Import from cloud"
          description="Download the template from mediabits.io cloud (PRO)"
          onClick={() => console.info('not implemented yet')}
          icon={CloudDownload}
          onlyPro
        />
      </Flyout>
    </>
  );
}

export default OpenTemplateFlyout;
