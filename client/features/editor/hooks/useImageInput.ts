import { useRef } from 'react';
import { useRecoilCallback } from 'recoil';
import { dimensionsState } from '../state/atoms/template';
import { ImageConfig } from '../interfaces/Shape';

function useImageInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const changeImage = useRecoilCallback(
    ({ snapshot }) => async (
      file: File,
      scaleTo?: {
        width: number;
        height: number;
      }
    ) => {
      const dimensions = await snapshot.getPromise(dimensionsState);
      return new Promise<Partial<ImageConfig>>((resolve) => {
        const image = new Image();

        image.src = URL.createObjectURL(file);

        const onLoad = () => {
          const { width, height } = image;

          const scale = Math.min(
            1,
            dimensions.width / width,
            dimensions.height / height,
            scaleTo
              ? Math.max(scaleTo.width / width, scaleTo.height / height)
              : 1
          );

          resolve({ image, scaleX: scale, scaleY: scale });

          image.removeEventListener('load', onLoad);
        };

        image.addEventListener('load', onLoad);
      });
    },
    []
  );

  return {
    inputRef,
    changeImage,
  };
}

export default useImageInput;
