import WebFont, { Config } from 'webfontloader';

export async function loadFonts(families: string[], config?: Config) {
  await new Promise<void>((resolve) =>
    WebFont.load({
      google: {
        families,
      },
      active: resolve,
      ...config,
    })
  );
}
