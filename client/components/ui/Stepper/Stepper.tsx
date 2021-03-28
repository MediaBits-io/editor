import React from 'react';
import Step, { StepType } from './Step';

interface Props {
  activeIndex: number;
  error?: boolean;
  steps: {
    title: React.ReactNode;
    info: React.ReactNode;
  }[];
}

function Stepper({ activeIndex, error, steps }: Props) {
  return (
    <div>
      <ol className="overflow-hidden">
        {steps.map(({ info, title }, i) => {
          let type: StepType = 'pending';
          if (i < activeIndex) {
            type = 'done';
          } else if (i === activeIndex) {
            type = error ? 'error' : 'progress';
          }

          return (
            <Step
              key={i}
              last={i === steps.length - 1}
              type={type}
              title={title}
              info={info}
            />
          );
        })}
      </ol>
    </div>
  );
}

export default Stepper;
