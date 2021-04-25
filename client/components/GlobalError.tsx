import { EmojiSadIcon } from '@heroicons/react/outline';
import React from 'react';
import MainArea from './layout/MainArea';
import Button from './ui/Button';
import ExternalLink from './ui/ExternalLink';

function GlobalError() {
  const handleClickRefresh = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };
  return (
    <MainArea className="h-screen">
      <div className="m-auto max-w-md text-center">
        <img
          src="/images/firefighter.svg"
          alt="Error"
          className="w-32 mx-auto mb-4"
        />
        <h1 className="flex items-center justify-center text-lg leading-6 font-medium text-gray-900 mb-4">
          Something went extremely wrong <EmojiSadIcon className="ml-1 w-5" />
        </h1>
        <div>
          Contact support via
          <ExternalLink
            className="mx-1"
            newTab
            to="mailto:support@mediabits.io"
          >
            support@mediabits.io
          </ExternalLink>
          for assistance.
        </div>
        <div className="mt-2">
          The error has been recorded. You can refresh the page to clear this
          message.
        </div>
        <Button className="mt-4" onClick={handleClickRefresh}>
          Refresh
        </Button>
      </div>
    </MainArea>
  );
}

export default GlobalError;
