import React from 'react';
import useDropdown from '../../../../components/ui/Dropdown/useDropdown';
import Flyout from '../../../../components/ui/Flyout';
import OpenIcon from '../../../../components/ui/Icons/OpenIcon';
import ClearButton from '../ui/ClearButton';

function OpenTemplateButton() {
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
        icon={OpenIcon}
        className="px-2.5"
      >
        Open template
      </ClearButton>
      <Flyout
        placement="bottom-end"
        targetElement={targetElement}
        isOpen={isOpen}
        close={close}
      >
        Open
      </Flyout>
    </>
  );
}

export default OpenTemplateButton;
