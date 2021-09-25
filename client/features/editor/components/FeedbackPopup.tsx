import { ChatAltIcon, XIcon } from '@heroicons/react/solid';
import Script from 'next/script';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Button from '../../../components/ui/Button';
import { appReadyState } from '../../../state/atoms/app';
import { feedbackPopupState } from '../state/atoms/ui';

function FeedbackPopup() {
  const appReady = useRecoilValue(appReadyState);
  const [{ discarded }, setFeedbackPopup] = useRecoilState(feedbackPopupState);

  if (!appReady || discarded) {
    return null;
  }

  return (
    <div className="z-10 rounded-full p-1 overflow-hidden absolute bottom-2 right-2 shadow-lg bg-gray-900 text-gray-100">
      <Button
        round
        type="dark"
        data-tf-popup="ewNXOXwT"
        data-tf-size="70"
        className="text-xs !py-1"
      >
        <ChatAltIcon className="h-4 w-4 mr-1" /> Give Feedback
      </Button>
      <Button
        round
        type="dark"
        className="!p-1"
        onClick={() => setFeedbackPopup({ discarded: true })}
      >
        <XIcon className="w-4 h-4" />
      </Button>
      <Script src="//embed.typeform.com/next/embed.js" />
    </div>
  );
}

export default FeedbackPopup;
