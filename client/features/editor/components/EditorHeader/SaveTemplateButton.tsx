import { SaveAsOutline } from 'heroicons-react';
import React from 'react';
import useDropdown from '../../../../components/ui/Dropdown/useDropdown';
import Flyout from '../../../../components/ui/Flyout';
import ClearButton from '../ui/ClearButton';

function SaveTemplateButton() {
  const {
    isOpen,
    close,
    open,
    setTargetElement,
    targetElement,
  } = useDropdown();

  return (
    <>
      <ClearButton
        onClick={open}
        ref={setTargetElement}
        icon={SaveAsOutline}
        className="px-2.5"
      >
        Save template
      </ClearButton>
      <Flyout
        placement="bottom-end"
        targetElement={targetElement}
        isOpen={isOpen}
        close={close}
      >
        Save
      </Flyout>
    </>
  );
}

export default SaveTemplateButton;
