import React, { useState } from 'react';
import Button from '../../../../components/ui/Button';
import { Heart, QuestionMarkCircle, X } from 'heroicons-react';
import Popover from '../../../../components/ui/Popover/Popover';
import { Transition } from '@headlessui/react';
import ExternalLink from '../../../../components/ui/ExternalLink';
import GithubIcon from '../../../../components/ui/Icons/GithubIcon';

function InfoPopup() {
  const [isInfoVisible, setInfoVisible] = useState(false);

  return (
    <div className="flex flex-grow">
      <div className="mt-auto">
        <Popover content="Info" placement="top">
          <Button
            round
            type="dark"
            icon={QuestionMarkCircle}
            onClick={() => setInfoVisible(true)}
          />
        </Popover>

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
              icon={X}
              className="text-gray-300 p-0.5 hover:text-white focus:text-white focus:outline-none absolute top-0.5 right-0.5 transition duration-150"
              onClick={() => setInfoVisible(false)}
            />

            <h2 className="text-base font-semibold tracking-wide text-white mb-2">
              About Mediabits.io
            </h2>

            <p className="text-sm text-gray-400 mb-2">
              Mediabits.io is an editor to create small videos for your podcast
              or other audio content, that you can then share on social media.
            </p>

            <ol className="text-sm text-gray-200 list-decimal list-inside mb-2">
              <li>Load a template or create it from scratch</li>
              <li>Import an audio clip</li>
              <li>Generate and download the video</li>
            </ol>

            <div className="flex items-end">
              <p className="flex items-center text-sm text-gray-400">
                Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by
                <ExternalLink
                  custom
                  newTab
                  to="https://vincas.dev"
                  className="ml-1 font-medium text-blue-400 hover:text-blue-500 focus:outline-none hover:underline focus:underline transition duration-150"
                >
                  Vincas Stonys
                </ExternalLink>
              </p>

              <ExternalLink
                custom
                newTab
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
