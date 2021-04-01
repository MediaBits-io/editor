import Konva from 'konva';
import { readBlobAsDataURL } from '../../../utils/blob';
import { isTruthy } from '../../../utils/boolean';
import { loadFonts } from '../../../utils/fonts';
import { IMAGE_FILTERS, LOADABLE_FONTS } from '../constants';
import { ImageConfig, ShapeType } from '../interfaces/Shape';
import { Template } from '../interfaces/StageConfig';

export async function toTemplateJSON(template: Template) {
  const images = new Map<string, string>();

  await Promise.all(
    template.elements.map(async (element) => {
      const props = element.props as ImageConfig;

      if (
        element.type === ShapeType.Image &&
        props.image instanceof Image &&
        props.image.src.startsWith('blob:')
      ) {
        const response = await fetch(new Request(props.image.src));
        const dataSrc = await readBlobAsDataURL(await response.blob());
        images.set(props.image.src, dataSrc);
      }
    })
  );

  return JSON.stringify(template, (_, value) => {
    if (value === Konva.Filters.Blur) {
      return 'blur';
    }

    if (value instanceof Image) {
      return images.get(value.src) || value.src;
    }
    return value;
  });
}

export function extractTemplateFonts(template: Template) {
  const fonts = new Set<string>();

  template.elements.forEach((element) => {
    if ('fontFamily' in element.props) {
      fonts.add(element.props.fontFamily);
    }
  });

  return Array.from(fonts);
}

export async function loadTemplateImages(template: Template) {
  await Promise.all(
    template.elements.map(async (element) => {
      return new Promise<void>((resolve, reject) => {
        if (element.props.filters) {
          element.props.filters = ((element.props
            .filters as unknown) as string[])
            .map((filter) => IMAGE_FILTERS[filter])
            .filter(isTruthy);
        }

        if ('image' in element.props) {
          const image = new Image();

          image.src = element.props.image;

          const onLoad = () => {
            image.removeEventListener('load', onLoad);
            image.removeEventListener('error', reject);
            element.props.image = image;
            resolve();
          };

          image.addEventListener('load', onLoad);
          image.addEventListener('error', reject);
        } else {
          resolve();
        }
      });
    })
  );
}

export async function loadTemplateFonts(template: Template) {
  const fonts = extractTemplateFonts(template);
  const fontsToLoad = fonts.filter((font) => LOADABLE_FONTS.includes(font));

  if (fontsToLoad.length) {
    await loadFonts(fontsToLoad);
  }
}

export function autoCorrectTemplateIssues(template: Template) {
  template.elements.forEach((element) => {
    if (element.type === ShapeType.Text) {
      element.props.height = undefined;
    }

    if (element.type === ShapeType.Image) {
      element.props.blurRadius =
        element.props.blurRadius && Math.min(element.props.blurRadius, 20);
    }
  });
}
