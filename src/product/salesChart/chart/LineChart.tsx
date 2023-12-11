import { extent, bisector } from "d3-array";
import { timeParse } from "d3-time-format";
import { AxisBottom } from "@visx/axis";
import { localPoint } from "@visx/event";
import { LinePath } from "@visx/shape";
import { curveCatmullRom } from "@visx/curve";
import { Group } from "@visx/group";
import { scaleLinear, scaleTime } from "@visx/scale";
import { useTooltip } from "@visx/tooltip";
import { getDimensions } from "./utils";
import { grey } from "@mui/material/colors";
import { LineChartProps, ToolTipdata } from "./types";
import { Box } from "@mui/material";
import { SalesData } from "../../types";
import "./style.css";
import useBreakpoints from "../../../hooks/useBreakPoints";
import { MouseEvent, TouchEvent, useCallback } from "react";
import ToolTip from "./Tooltip";
import { formatMoney } from "../../../utils/formatting";

export default function LineChart({
  data,
  height,
  width,
  selected,
}: LineChartProps) {
  const {
    showTooltip,
    hideTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip<ToolTipdata>({
    tooltipOpen: false,
    tooltipLeft: 0,
    tooltipTop: 0,
    tooltipData: {},
  });

  const { boundedWidth, boundedHeight, margin } = getDimensions({
    width,
    height,
  });
  const { top, left } = margin;

  const xAccessor = (d: SalesData) =>
    timeParse("%Y-%m-%d")(d.weekEnding) as Date;

  const yDomain = (extent(data, (d: any) =>
    Math.max(...selected.map(({ key }) => d[key]))
  ) as [number, number]) || [0, 0];

  const xScale = scaleTime<number>({
    domain: extent(data, xAccessor) as [Date, Date],
    range: [0, boundedWidth],
  });

  const yScale = scaleLinear<number>({
    domain: [0, yDomain[1] * 1.5],
    range: [boundedHeight, 0],
  });

  const handleTooltip = useCallback(
    (e: TouchEvent<SVGSVGElement> | MouseEvent<SVGSVGElement>) => {
      const point = localPoint(e);
      if (!point || point.x < margin.left) return hideTooltip();

      const { x } = point;

      const bisectDate = bisector<SalesData, Date>(
        (d) => new Date(d.weekEnding)
      ).left;
      const x0 = xScale.invert(x - margin.left);

      const tooltipDataByLine = selected.map(({ key, value }) => {
        const matchingYEntry = data.at(bisectDate(data, x0));
        return matchingYEntry
          ? {
              value: (matchingYEntry as any)[key],
              date: new Date(matchingYEntry.weekEnding),
              key: value,
              format: value === "Units Sold" ? (val: any) => val : formatMoney,
            }
          : null;
      });

      // Find the tooltip data for the line with the maximum y-value
      const tooltipData = tooltipDataByLine.reduce((maxLine, currentLine) => {
        return !maxLine || (currentLine && currentLine.value > maxLine.value)
          ? currentLine
          : maxLine;
      }, null);

      return tooltipData
        ? showTooltip({
            tooltipLeft: x,
            tooltipTop: yScale(tooltipData.value),
            tooltipData,
          })
        : hideTooltip();
    },
    [xScale, yScale, selected, data, hideTooltip, margin, showTooltip]
  );

  const { isXs } = useBreakpoints();

  return (
    <Box position="relative">
      <svg
        height={height}
        width={width}
        role="figure"
        onTouchStart={handleTooltip}
        onTouchMove={handleTooltip}
        onMouseMove={handleTooltip}
        onMouseLeave={() => hideTooltip()}
      >
        <Group left={left} top={top}>
          {selected.map(({ key, color }, index) => (
            <LinePath
              key={index}
              curve={curveCatmullRom}
              data={data}
              stroke={color}
              strokeWidth={3}
              x={(d) => xScale(xAccessor(d)) ?? 0}
              y={(d) => yScale((d as any)[key]) ?? 0}
            />
          ))}
          <AxisBottom
            numTicks={isXs ? 4 : 12}
            top={boundedHeight}
            scale={xScale}
            tickFormat={(d) =>
              new Intl.DateTimeFormat("en-us", {
                month: "short",
              })
                .format(d as Date)
                .toUpperCase()
            }
            tickLabelProps={(tickValue, index, ticks) => {
              const tickWidth =
                index === ticks.length - 1
                  ? xScale(tickValue) - xScale(ticks[index - 1].value)
                  : xScale(ticks[index + 1].value) - xScale(tickValue);
              const offset = tickWidth / 2;

              return {
                fill: grey[600],
                fontSize: 14,
                fontWeight: "bold",
                textAnchor: "middle",
                dy: "15px",
                dx: `${offset}px`,
              };
            }}
            tickLength={0}
            axisClassName="sales-chart_x-axis"
          />
        </Group>
        {tooltipOpen && (
          <circle
            cx={tooltipLeft}
            cy={tooltipTop + margin.top}
            r={4}
            fill="green"
            fillOpacity={0.8}
            pointerEvents="none"
          />
        )}
      </svg>
      <ToolTip
        isTooltipOpen={tooltipOpen}
        data={tooltipData}
        left={tooltipLeft}
        top={tooltipTop}
      />
    </Box>
  );
}
