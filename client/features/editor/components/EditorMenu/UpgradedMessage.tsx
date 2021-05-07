import { SparklesIcon } from '@heroicons/react/outline';
import { HeartIcon } from '@heroicons/react/solid';
import React from 'react';
import { useRecoilValue } from 'recoil';
import Tooltip from '../../../../components/ui/Tooltip/Tooltip';
import { Plan } from '../../../../interfaces/plans';
import { userPlanState } from '../../../../state/atoms/user';

function UpgradedMessage() {
  const userPlan = useRecoilValue(userPlanState);

  const isPro = userPlan.plan === Plan.Professional;

  return isPro ? (
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
  ) : null;
}

export default UpgradedMessage;
