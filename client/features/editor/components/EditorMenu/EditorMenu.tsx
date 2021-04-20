import React from 'react';
import SideMenu from '../ui/SideMenu';
import TextToolButton from './buttons/TextToolButton';
import ImageToolButton from './buttons/ImageToolButton';
import SettingsToolButton from './buttons/SettingsToolButton';
import ElementsToolButton from './buttons/ElementsToolButton';
import InfoPopup from './InfoPopup';
import Logo from '../../../../components/ui/Logo/Logo';
import { useRecoilValue } from 'recoil';
import { userPlanState } from '../../../../state/atoms/user';
import { Plan } from '../../../../interfaces/plans';
import Tooltip from '../../../../components/ui/Tooltip/Tooltip';
import { HeartIcon } from '@heroicons/react/solid';
import { SparklesIcon } from '@heroicons/react/outline';

function EditorMenu() {
  const userPlan = useRecoilValue(userPlanState);

  const isPro = userPlan.plan === Plan.Professional;
  return (
    <SideMenu>
      <Logo />
      <div className="flex flex-col flex-grow space-y-2 px-2 pt-2 pb-1.5 bg-gray-800">
        <SettingsToolButton />
        <TextToolButton />
        <ImageToolButton />
        <ElementsToolButton />
        <div className="flex flex-grow">
          <div className="mt-auto">
            {isPro && (
              <Tooltip
                placement="right"
                modifiers={[
                  {
                    name: 'offset',
                    options: {
                      offset: [0, 8],
                    },
                  },
                ]}
                className="flex justify-center items-center text-xs font-semibold mb-4 text-yellow-400 hover:text-yellow-500 cursor-default"
                content={
                  <span className="flex items-center space-x-1">
                    <span>You have upgraded, thank you!</span>
                    <HeartIcon className="w-4 h-4 text-red-500" />
                  </span>
                }
              >
                <SparklesIcon className="w-4 h-4 mr-1" /> PRO
              </Tooltip>
            )}
            <InfoPopup />
          </div>
        </div>
      </div>
    </SideMenu>
  );
}

export default EditorMenu;
