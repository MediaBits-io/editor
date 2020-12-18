import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { Plans } from '../interfaces';

interface InitialState {
  plans: Plans;
}

function usePlans(initialState: InitialState) {
  const [plans] = useState(initialState.plans);

  return {
    plans,
  };
}

export const PlansContainer = createContainer(usePlans);
