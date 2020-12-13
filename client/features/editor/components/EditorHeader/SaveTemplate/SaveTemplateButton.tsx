import React from 'react';
import useDropdown from '../../../../../components/ui/Dropdown/useDropdown';
import SaveIcon from '../../../../../components/ui/Icons/SaveIcon';
import ClearButton from '../../ui/ClearButton';
import SaveTemplateFlyout from './SaveTemplateFlyout';

function SaveTemplateButton() {
  const {
    isOpen,
    close,
    toggle,
    setTargetElement,
    targetElement,
  } = useDropdown();

  return (
    <>
      <ClearButton
        onClick={toggle}
        ref={setTargetElement}
        icon={SaveIcon}
        className="px-2.5"
      >
        Save template
      </ClearButton>
      <SaveTemplateFlyout
        close={close}
        isOpen={isOpen}
        targetElement={targetElement}
      />
    </>
  );
}

export default SaveTemplateButton;
