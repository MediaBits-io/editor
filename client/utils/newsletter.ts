import { NEWSLETTER_FORM_URL } from '../constants';

export const openNewsletterWindow = () => {
  window.open(
    NEWSLETTER_FORM_URL,
    'Mediabits.io Newsletter',
    'width=600,height=700'
  );
};
