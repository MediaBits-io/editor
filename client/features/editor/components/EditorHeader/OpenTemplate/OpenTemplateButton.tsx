import React from 'react';
import useDropdown from '../../../../../components/ui/Dropdown/useDropdown';
import OpenIcon from '../../../../../components/ui/Icons/OpenIcon';
import ClearButton from '../../ui/ClearButton';
import OpenTemplateFlyout from './OpenTemplateFlyout';

function OpenTemplateButton() {
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
        icon={OpenIcon}
        className="px-2.5"
      >
        Open template
      </ClearButton>
      <OpenTemplateFlyout
        close={close}
        isOpen={isOpen}
        targetElement={targetElement}
      />
    </>
  );
}

export default OpenTemplateButton;
