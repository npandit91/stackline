import { TooltipWithBounds, defaultStyles } from "@visx/tooltip";
import { TooltipProps } from "./types";
import { formatDate } from "../../../utils/formatting";
import { grey } from "@mui/material/colors";
import { Typography } from "@mui/material";

export default function ToolTip({
  left,
  top,
  data = {},
  isTooltipOpen,
}: TooltipProps) {
  const { date, key, value, format = (val: any) => val } = data;
  return (
    <TooltipWithBounds
      key={isTooltipOpen ? 1 : 0}
      style={{
        ...defaultStyles,
        display: "flex",
        minWidth: "200px",
        flexDirection: "column",
        backgroundColor: grey[200],
        opacity: isTooltipOpen ? 1 : 0,
        transition: "all 0.1s ease-out",
      }}
      left={left}
      top={top + 20}
    >
      <Typography>Date: {date && formatDate(date)}</Typography>
      <Typography>
        {key}: {format(value)}
      </Typography>
    </TooltipWithBounds>
  );
}
