import React, { useState } from 'react';
import Button from '../../../../components/ui/Button';
import {
  HeartIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from '@heroicons/react/solid';
import Tooltip from '../../../../components/ui/Tooltip/Tooltip';
import { Transition } from '@headlessui/react';
import ExternalLink from '../../../../components/ui/ExternalLink';
import GithubIcon from '../../../../components/ui/Icons/GithubIcon';
import { openNewsletterWindow } from '../../../../utils/newsletter';

function InfoPopup() {
  const [isInfoVisible, setInfoVisible] = useState(false);

  return (
    <div className="flex flex-grow">
      <div className="mt-auto">
        <Tooltip content="About" placement="top">
          <Button
            round
            type="dark"
            icon={QuestionMarkCircleIcon}
            onClick={() => setInfoVisible(true)}
          />
        </Tooltip>

        <Transition
          show={isInfoVisible}
          className="z-10 absolute bottom-0 left-0 p-2 w-full origin-bottom-left"
          enter="transition ease-out duration-150"
          enterFrom="transform opacity-50 scale-90"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-90"
        >
          <div className="relative rounded-lg shadow border bg-gray-800 max-w-md w-full p-4">
            <Button
              type="custom"
              icon={XIcon}
              className="text-gray-300 p-0.5 hover:text-white focus:text-white focus:outline-none absolute top-0.5 right-0.5 transition duration-150"
              onClick={() => setInfoVisible(false)}
            />

            <h2 className="text-base font-semibold tracking-wide text-white mb-2">
              About Mediabits.io
            </h2>

            <p className="text-sm text-gray-400 mb-3">
              Mediabits.io is an editor to create small videos for your podcast
              or other audio content, that you can then share on social media.
            </p>

            <ol className="text-sm text-gray-200 list-decimal list-inside mb-3">
              <li>Load a template or create it from scratch</li>
              <li>Import an audio clip</li>
              <li>Generate and download the video</li>
            </ol>

            <div className="flex items-end">
              <div className="flex flex-col text-sm text-gray-400">
                <p className="flex items-center">
                  Made with <HeartIcon className="h-4 w-4 text-red-500 mx-1" />{' '}
                  by
                  <ExternalLink
                    type="light"
                    newTab
                    to="https://vincas.dev"
                    className="ml-1"
                  >
                    Vincas Stonys
                  </ExternalLink>
                </p>
                <p>
                  Questions?
                  <ExternalLink
                    newTab
                    type="light"
                    to="mailto:support@mediabits.io"
                    className="ml-1"
                  >
                    support@mediabits.io
                  </ExternalLink>
                </p>
                <Button
                  type="link-light"
                  className="justify-start"
                  onClick={openNewsletterWindow}
                >
                  Subscribe to our newsletter
                </Button>
              </div>

              <ExternalLink
                newTab
                type="custom"
                to="https://github.com/MediaBits-io/editor"
                className="ml-auto text-gray-300 hover:text-white focus:text-white focus:outline-none transition duration-150"
              >
                <GithubIcon className="w-8 h-8" />
              </ExternalLink>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}

export default InfoPopup;
