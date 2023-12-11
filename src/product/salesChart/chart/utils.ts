import { ChartDimensions } from "./types";

function getDimensions({
  height,
  width,
}: {
  height: number;
  width: number;
}): ChartDimensions {
  const margin = {
    top: 30,
    right: 30,
    bottom: 40,
    left: 30,
  };
  return {
    margin,
    boundedWidth: width - margin.left - margin.right,
    boundedHeight: height - margin.top - margin.bottom,
  };
}

export { getDimensions };
