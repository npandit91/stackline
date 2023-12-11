import { Paper } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ParentSize } from "@visx/responsive";
import { useSelector } from "react-redux";
import { selectSalesData } from "../productSlice";
import { SalesData } from "../types";
import { grey } from "@mui/material/colors";
import { formatDate, formatMoney } from "../../utils/formatting";

// // Helper functions for formatting
// const formatDate = (dateString: string) =>
//   new Date(`${dateString}T00:00:00`)
//     .toLocaleDateString("en-US", {
//       year: "2-digit",
//       month: "2-digit",
//       day: "2-digit",
//     })
//     .replace(/\//g, "-");

// const formatMoney = (amount: string) =>
//   new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
//     Number(amount)
//   );

const columns: GridColDef[] = [
  {
    field: "weekEnding",
    headerName: "Week Ending",
    align: "left",
    valueFormatter: (params) => formatDate(params.value),
    width: 15,
  },
  {
    field: "retailSales",
    headerName: "Retail Sales",
    align: "right",
    headerAlign: "right",
    valueFormatter: (params) => formatMoney(params.value),
    width: 15,
  },
  {
    field: "wholesaleSales",
    headerName: "Wholesale Sales",
    align: "right",
    headerAlign: "right",
    valueFormatter: (params) => formatMoney(params.value),
    width: 25,
  },
  {
    field: "unitsSold",
    headerName: "Units Sold",
    align: "right",
    headerAlign: "right",
    width: 25,
  },
  {
    field: "retailerMargin",
    headerName: "Retailer Margin",
    align: "right",
    headerAlign: "right",
    valueFormatter: (params) => formatMoney(params.value),
    width: 20,
  },
];

const getRowId = (row: SalesData) => row.weekEnding;

export default function SalesTable() {
  const rows = (useSelector(selectSalesData) as any[]) || [];
  return (
    <Paper elevation={0} sx={{ borderRadius: 0, mt: 2 }}>
      <ParentSize>
        {({ width: totalWidth }: { width: number }) => {
          const resizableColumns = columns.map((column: GridColDef) => ({
            ...column,
            width: totalWidth * ((column.width || 20) / 100),
            renderHeader: (params: GridColDef) => (
              <div style={{ fontWeight: "bold", color: grey[600] }}>
                {params.field}
              </div>
            ),
            renderCell: (params: GridRenderCellParams) => (
              <div style={{ color: grey[600] }}>{params.formattedValue}</div>
            ),
          }));
          return (
            <DataGrid
              autoHeight={true}
              getRowId={getRowId}
              rows={rows}
              columns={resizableColumns}
              disableRowSelectionOnClick
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 15,
                  },
                },
              }}
              pageSizeOptions={[15]}
            />
          );
        }}
      </ParentSize>
    </Paper>
  );
}
