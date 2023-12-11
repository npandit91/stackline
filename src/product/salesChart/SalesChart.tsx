import { useSelector } from "react-redux";
import { ParentSize } from "@visx/responsive";
import { selectSalesData } from "../productSlice";
import LineChart from "./chart/LineChart";
import { amber, blue, green, pink } from "@mui/material/colors";
import { Fragment, useState } from "react";
import { Paper } from "@mui/material";
import MultipleSelectChip from "../../common/multiSelectChip";
import { MultiSelectChipOption } from "../../common/multiSelectChip/types";

enum SalesKeys {
  "retailSales" = "retailSales",
  "wholesaleSales" = "wholesaleSales",
  "retailerMargin" = "retailerMargin",
  "unitsSold" = "unitsSold",
}

const colors: Record<string, string> = {
  [SalesKeys.retailSales]: blue[900],
  [SalesKeys.wholesaleSales]: amber[900],
  [SalesKeys.retailerMargin]: pink[900],
  [SalesKeys.unitsSold]: green[900],
};

const options: MultiSelectChipOption[] = [
  {
    key: SalesKeys.retailSales,
    value: "Retail Sales",
    color: colors[SalesKeys.retailSales],
  },
  {
    key: SalesKeys.wholesaleSales,
    value: "Wholesale Sales",
    color: colors[SalesKeys.wholesaleSales],
  },
  {
    key: SalesKeys.unitsSold,
    value: "Units Sold",
    color: colors[SalesKeys.unitsSold],
  },
  {
    key: SalesKeys.retailerMargin,
    value: "Retailer Margin",
    color: colors[SalesKeys.retailerMargin],
  },
];

const defaultSelected = [
  {
    key: SalesKeys.retailSales,
    value: "Retail Sales",
    color: colors[SalesKeys.retailSales],
  },
  {
    key: SalesKeys.wholesaleSales,
    value: "Wholesale Sales",
    color: colors[SalesKeys.wholesaleSales],
  },
];

export default function SalesChart() {
  const salesData = useSelector(selectSalesData) || [];
  const [selected, setSelected] = useState(defaultSelected);

  return (
    <Fragment>
      <Paper elevation={0} sx={{ borderRadius: 0, padding: "15px" }}>
        <MultipleSelectChip
          options={options}
          placeholder="Select sales data point"
          selected={selected}
          setSelected={(selected) => setSelected(selected as any)}
        />
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 0, height: "550px" }}>
        <ParentSize>
          {({ width, height }: { width: number; height: number }) => {
            return (
              <Fragment>
                <LineChart
                  width={width}
                  data={salesData}
                  height={height - 20}
                  selected={selected}
                />
              </Fragment>
            );
          }}
        </ParentSize>
      </Paper>
    </Fragment>
  );
}
