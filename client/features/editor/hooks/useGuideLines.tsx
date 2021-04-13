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
  edges: LineStops
): GuideLine[] => {
  const resultV: GuideLine[] = [];
  const resultH: GuideLine[] = [];
  const position = node.getPosition();

  stops.horizontal.forEach((stop) => {
    edges.horizontal.forEach((edge) => {
      const diff = Math.abs(stop - edge - position.y);
      if (diff < MAX_OFFSET) {
        resultH.push({
          orientation: 'horizontal',
          edgeOffset: edge,
          stop,
          diff,
        });
      }
    });
  });

  stops.vertical.forEach((stop) => {
    edges.vertical.forEach((edge) => {
      const diff = Math.abs(stop - edge - position.x);
      if (diff < MAX_OFFSET) {
        resultV.push({
          orientation: 'vertical',
          edgeOffset: edge,
          stop,
          diff,
        });
      }
    });
  });

  const guides: GuideLine[] = [];

  // Find closest snap
  const minH = resultH.sort((a, b) => a.diff - b.diff)[0];
  const minV = resultV.sort((a, b) => a.diff - b.diff)[0];
  if (minH) {
    guides.push({ ...minH, orientation: 'horizontal' });
  }
  if (minV) {
    guides.push({ ...minV, orientation: 'vertical' });
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
    ({ snapshot, set }) => (node: Konva.Shape) => {
      const stage = node.getStage();

      if (!stage) {
        return;
      }

      const guideLines = snapshot.getLoadable(guideLinesState).getValue();
      const dimensions = snapshot.getLoadable(dimensionsState).getValue();

      const stops = getStops(dimensions);
      const edges = getSnappingEdges(stage, node);
      const lines = getLines(node, stops, edges);
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
