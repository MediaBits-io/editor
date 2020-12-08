import Konva from 'konva';
import { readBlobAsDataURL } from '../../../utils/blob';
import { ShapeType } from '../interfaces/Shape';
import { Template } from '../interfaces/StageConfig';

export async function toTemplateJSON(template: Template) {
  const images = new Map<string, string>();

  await Promise.all(
    template.elements.map(async (element) => {
      const props = element.props as Konva.ImageConfig;

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
    if (value instanceof Image) {
      return images.get(value.src) || value.src;
    }
    return value;
  });
}

export default function extractTemplateFonts(template: Template) {
  const fonts = new Set<string>();

  template.elements.forEach((element) => {
    if ('fontFamily' in element.props) {
      fonts.add(element.props.fontFamily);
    }
  });

  return Array.from(fonts);
}
