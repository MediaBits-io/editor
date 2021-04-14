import Konva from 'konva';
import { useRecoilCallback } from 'recoil';
import { Dimensions } from '../interfaces/StageConfig';
import { guideLinesState } from '../state/atoms/editor';
import { dimensionsState } from '../state/atoms/template';

const MAX_OFFSET = 5;

type LineStops = {
  horizontal: [number, number, number];
  vertical: [number, number, number];
};

type GuideLine = {
  orientation?: 'horizontal' | 'vertical';
  edgeOffset: number;
  diff: number;
  stop: number;
};

const getStops = (dimensions: Dimensions): LineStops => {
  const horizontal: [number, number, number] = [
    0,
    dimensions.height / 2,
    dimensions.height,
  ];
  const vertical: [number, number, number] = [
    0,
    dimensions.width / 2,
    dimensions.width,
  ];

  // TODO: snap to other shapes

  return { horizontal, vertical };
};

const getSnappingEdges = (stage: Konva.Stage, node: Konva.Shape): LineStops => {
  const rect = node.getClientRect();
  const box = {
    height: rect.height / stage.scaleY(),
    width: rect.width / stage.scaleX(),
    ...node.getPosition(),
  };
  return {
    horizontal: [0, box.height / 2, box.height],
    vertical: [0, box.width / 2, box.width],
  };
};

const getLines = (
  node: Konva.Shape,
  stops: LineStops,
  edges: LineStops,
  snapAnchor?: string // anchor to limit snapping to
): GuideLine[] => {
  const resultV: GuideLine[] = [];
  const resultH: GuideLine[] = [];
  const position = node.getPosition();

  const matchesSnappingAnchor = (
    orientation: 'horizontal' | 'vertical',
    index: number
  ) => {
    if (snapAnchor) {
      switch (orientation) {
        case 'horizontal':
          return (
            (index === 0 && snapAnchor.includes('top')) ||
            (index === 2 && snapAnchor.includes('bottom'))
          );
        case 'vertical':
          return (
            (index === 0 && snapAnchor.includes('left')) ||
            (index === 2 && snapAnchor.includes('right'))
          );
      }
    }
    return true;
  };

  stops.horizontal.forEach((stop) => {
    const orientation = 'horizontal';
    edges.horizontal.forEach((edgeOffset, i) => {
      const diff = Math.abs(stop - edgeOffset - position.y);
      if (diff < MAX_OFFSET && matchesSnappingAnchor(orientation, i)) {
        resultH.push({
          orientation,
          edgeOffset,
          stop,
          diff,
        });
      }
    });
  });

  stops.vertical.forEach((stop) => {
    const orientation = 'vertical';
    edges.vertical.forEach((edgeOffset, i) => {
      const diff = Math.abs(stop - edgeOffset - position.x);
      if (diff < MAX_OFFSET && matchesSnappingAnchor(orientation, i)) {
        resultV.push({
          orientation,
          edgeOffset,
          stop,
          diff,
        });
      }
    });
  });

  // Find closest snap
  const guides: GuideLine[] = [];
  const minH = resultH.sort((a, b) => a.diff - b.diff)[0];
  const minV = resultV.sort((a, b) => a.diff - b.diff)[0];
  if (minH) {
    guides.push(minH);
  }
  if (minV) {
    guides.push(minV);
  }
  return guides;
};

const getLineShapes = (lines: GuideLine[]) => {
  const lineConfig = {
    stroke: 'rgb(0, 161, 255)',
    strokeWidth: 1,
    dash: [4, 6],
  };
  return lines.map((line) =>
    line.orientation === 'horizontal'
      ? {
          ...lineConfig,
          id: `guideline-${line.orientation}-${line.stop}`,
          points: [-6000, 0, 6000, 0],
          x: 0,
          y: line.stop,
        }
      : {
          ...lineConfig,
          id: `guideline-${line.orientation}-${line.stop}`,
          points: [0, -6000, 0, 6000],
          x: line.stop,
          y: 0,
        }
  );
};

function useGuideLines() {
  const updateGuideLines = useRecoilCallback(
    ({ snapshot, set }) => (node: Konva.Shape, snapAnchor?: string) => {
      const stage = node.getStage();

      if (!stage) {
        return [];
      }

      const guideLines = snapshot.getLoadable(guideLinesState).getValue();
      const dimensions = snapshot.getLoadable(dimensionsState).getValue();

      const stops = getStops(dimensions);
      const edges = getSnappingEdges(stage, node);
      const lines = getLines(node, stops, edges, snapAnchor);
      const shapes = getLineShapes(lines);

      if (
        shapes.length !== guideLines.length ||
        !shapes.every((line) =>
          guideLines.find((shape) => shape.id === line.id)
        )
      ) {
        set(guideLinesState, shapes);
      }

      return lines;
    },
    []
  );

  return {
    updateGuideLines,
  };
}

export default useGuideLines;
