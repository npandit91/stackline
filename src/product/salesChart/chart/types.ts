import { SalesData } from "../../types";

interface ChartDimensions {
  boundedWidth: number;
  boundedHeight: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

type key = { keyValue: string; color: string };

type LineChartProps = {
  data: SalesData[];
  height: number;
  width: number;
  selected: Array<Record<string, string>>;
};

type ToolTipdata = {
  date?: Date;
  value?: number;
  key?: string;
  format?: (val: any) => any;
};

type TooltipProps = {
  left: number;
  top: number;
  data?: ToolTipdata;
  isTooltipOpen: boolean;
};

export { LineChartProps, ChartDimensions, key, ToolTipdata, TooltipProps };
