import type { Config } from 'webfontloader';
import * as Sentry from '@sentry/react';

export async function loadFonts(families: string[], config?: Config) {
  await new Promise<void>(async (resolve, reject) => {
    if (!process.browser) {
      resolve();
    }

    const WebFont = await import('webfontloader');

    try {
      WebFont.load({
        google: {
          families,
        },
        active: resolve,
        fontinactive: (family) => {
          Sentry.captureMessage(`Failed to load font "${family}"`);
        },
        ...config,
      });
    } catch (e) {
      reject(e);
    }
  });
}
