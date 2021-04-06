import Konva from 'konva';
import { useCallback, useMemo, useRef, useState } from 'react';
import { createContainer } from 'unstated-next';

function useElementRefsState() {
  const transformerRef = useRef<Konva.Transformer | null>(null);
  const [elementRefs, setElementRefs] = useState<
    Record<
      string,
      | {
          ref: Konva.Shape;
          transformerProps?: Partial<Konva.TransformerConfig>;
        }
      | undefined
    >
  >({});

  const setElementRef = useCallback(
    (
      id: string,
      ref?: Konva.Shape,
      transformerProps?: Partial<Konva.TransformerConfig>
    ) => {
      setElementRefs((elementRefs) => ({
        ...elementRefs,
        [id]: ref && { ref, transformerProps },
      }));
    },
    []
  );

  return useMemo(() => ({ transformerRef, elementRefs, setElementRef }), [
    elementRefs,
    setElementRef,
  ]);
}

export const ElementRefsContainer = createContainer(useElementRefsState);
