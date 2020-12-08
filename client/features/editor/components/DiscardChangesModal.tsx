import React from 'react';
import Modal from '../../../components/ui/Modal/Modal';
import ModalAction from '../../../components/ui/Modal/ModalAction';
import ModalContent from '../../../components/ui/Modal/ModalContent';
import ModalFullActions from '../../../components/ui/Modal/ModalFullActions';

interface Props {
  visible: boolean;
  cancel: () => void;
  ok: () => void;
}

function DiscardChangesModal({ visible, cancel, ok }: Props) {
  return (
    <Modal visible={visible}>
      <ModalContent title="Discard changes?">
        Any unsaved changes will be discarded, do you wish to continue?
      </ModalContent>
      <ModalFullActions
        dismiss={
          <ModalAction onClick={cancel} type="secondary">
            Cancel
          </ModalAction>
        }
        submit={
          <ModalAction onClick={ok} type="primary">
            Continue
          </ModalAction>
        }
      />
    </Modal>
  );
}

export default DiscardChangesModal;
