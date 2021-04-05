import Konva from 'konva';
import { KonvaEventObject } from 'konva/types/Node';
import React, { useCallback, useEffect, useRef } from 'react';
import { KonvaNodeEvents, Transformer } from 'react-konva';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  elementRefState,
  guideLinesState,
  selectedElementIdState,
} from '../state/atoms/editor';
import useElementsDispatcher from '../state/dispatchers/elements';

export const MIN_WIDTH = 5;
export const MIN_HEIGHT = 5;

interface Props {
  id: string;
  children: (props: Konva.ShapeConfig & KonvaNodeEvents) => React.ReactNode;
  transform?: (
    evt: KonvaEventObject<Event>,
    transformer: Konva.Transformer
  ) => Konva.ShapeConfig;
  transformEnd?: (
    evt: KonvaEventObject<Event>,
    transformer: Konva.Transformer
  ) => Konva.ShapeConfig;
  anchors?: string[];
}

const InteractiveKonvaElement = ({
  id,
  anchors,
  children,
  transform,
  transformEnd,
}: Props) => {
  const shapeRef = useRef<Konva.Shape>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const { updateElementProps, selectElement } = useElementsDispatcher();
  const selectedElementId = useRecoilValue(selectedElementIdState);
  const setElementRef = useSetRecoilState(elementRefState(id));

  const isSelected = selectedElementId === id;

  // useEffect(() => {
  //   if (shapeRef.current) {
  //     setElementRef(shapeRef.current);
  //   }
  // }, [setElementRef]);

  useEffect(() => {
    if (isSelected && shapeRef.current && transformerRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      console.log(transformerRef.current.getLayer());
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const handleSelect = () => {
    selectElement(id);
  };

  const handleChange = useCallback(
    (props: Konva.ShapeConfig) => {
      updateElementProps(id, props);
    },
    [id, updateElementProps]
  );

  const handleDragMove = useRecoilCallback(
    ({ set }) => (e: Konva.KonvaEventObject<DragEvent>) => {
      const y = e.target.y();

      if (Math.abs(y) < 10) {
        set(guideLinesState, [
          {
            x: 0,
            y: 0,
            points: [-6000, 0, 6000, 0],
            stroke: 'rgb(0, 161, 255)',
            strokeWidth: 1,
            name: 'guid-line',
            dash: [4, 6],
          },
        ]);
      }
    },
    []
  );

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    handleChange({
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransform = useCallback(
    (evt: KonvaEventObject<Event>) => {
      const node = shapeRef.current;
      if (node && transformerRef.current && transform) {
        node.setAttrs(transform(evt, transformerRef.current));
      }
    },
    [transform]
  );

  const handleTransformEnd = useCallback(
    (evt: KonvaEventObject<Event>) => {
      const node = shapeRef.current;

      if (!node) {
        return;
      }

      if (node && transformerRef.current && transformEnd) {
        node.setAttrs(transformEnd(evt, transformerRef.current));
      }

      handleChange({
        ...node.getAttrs(),
      });
    },
    [handleChange, transformEnd]
  );

  return (
    <>
      {children({
        id,
        onClick: handleSelect,
        onTap: handleSelect,
        ref: shapeRef,
        draggable: true,
        onDragMove: handleDragMove,
        onDragEnd: handleDragEnd,
        onDragStart: handleSelect,
        onTransformEnd: handleTransformEnd,
        onTransform: handleTransform,
      })}

      {isSelected && (
        <Transformer
          ref={transformerRef}
          enabledAnchors={anchors}
          rotationSnaps={[0, 90, 180, 270]}
          keepRatio
          boundBoxFunc={(oldBox, newBox) =>
            newBox.width < MIN_WIDTH || newBox.height < MIN_HEIGHT
              ? oldBox
              : newBox
          }
        />
      )}
    </>
  );
};

export default InteractiveKonvaElement;
