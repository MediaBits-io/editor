import { equals } from 'ramda';
import { selector } from 'recoil';
import { lastSavedTemplateState } from '../atoms/editor';
import { templateSelector } from './template';

export const hasUnsavedChangesSelector = selector({
  key: 'hasUnsavedChangesSelector',
  get: ({ get }) => !equals(get(lastSavedTemplateState), get(templateSelector)),
});
