import type { Config } from 'webfontloader';

export async function loadFonts(families: string[], config?: Config) {
  await new Promise<void>(async (resolve) => {
    if (!process.browser) {
      resolve();
    }

    const WebFont = await import('webfontloader');

    WebFont.load({
      google: {
        families,
      },
      active: resolve,
      ...config,
    });
  });
}
