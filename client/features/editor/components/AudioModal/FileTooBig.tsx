import { EmojiSadIcon } from '@heroicons/react/outline';
import React from 'react';
import ExternalLink from '../../../../components/ui/ExternalLink';
import ModalAction from '../../../../components/ui/Modal/ModalAction';
import ModalContent from '../../../../components/ui/Modal/ModalContent';
import ModalFullActions from '../../../../components/ui/Modal/ModalFullActions';

interface Props {
  onBack: () => void;
  onCancel: () => void;
  onContinue: () => void;
  trimRequired?: boolean;
}

function FileTooBig({ onBack, onCancel, onContinue, trimRequired }: Props) {
  return (
    <>
      <ModalContent>
        <img
          src="/images/firefighter.svg"
          alt="Error"
          className="w-32 mx-auto mb-4"
        />
        <h3 className="flex items-center justify-center text-lg leading-6 font-medium text-gray-900 mb-2">
          The file is too large <EmojiSadIcon className="ml-1" />
        </h3>
        <div>We can't trim files larger than 50MB.</div>
        {!trimRequired && (
          <div className="mb-2">
            You can continue, to use the complete audio file.
          </div>
        )}
        <div>
          {trimRequired ? 'You' : 'Otherwise you'} can trim the audio using
          <ExternalLink
            className="mx-1"
            newTab
            to="https://www.audacityteam.org"
          >
            Audacity
          </ExternalLink>
          for free before uploading.
        </div>
      </ModalContent>
      <ModalFullActions
        dismiss={
          <ModalAction
            type="secondary"
            onClick={trimRequired ? onCancel : onBack}
          >
            {trimRequired ? 'Cancel' : 'Back'}
          </ModalAction>
        }
        submit={
          <ModalAction
            type="accented"
            onClick={trimRequired ? onBack : onContinue}
          >
            {trimRequired ? 'Try again' : 'Continue'}
          </ModalAction>
        }
      />
    </>
  );
}

export default FileTooBig;
