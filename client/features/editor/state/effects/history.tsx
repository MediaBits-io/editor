import { AtomEffect, RecoilState } from 'recoil';

export const tracked: Array<RecoilState<any>> = [];
export const untracked: Array<RecoilState<any>> = [];

export const untrackedHistoryEffect: AtomEffect<any> = ({ node }) => {
  untracked.push(node);
};

export const historyEffect: AtomEffect<any> = ({ node }) => {
  tracked.push(node);
};

export type HistoryItem = Array<{
  state: RecoilState<any>;
  current: any;
  previous: any;
}>;
