import { Grid } from "@mui/material";
import ProductInfo from "./productInfo";
import SalesTable from "./salesTable";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProductDetails } from "./productSlice";
import { AppDispatch } from "../types/App";
import SalesChart from "./salesChart/SalesChart";
import useBreakpoints from "../hooks/useBreakPoints";

export default function ProductDetails() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDetails("B007TIE0GQ"));
  }, [dispatch]);

  const { isSm } = useBreakpoints();

  return (
    <Grid container padding={2} spacing={2} sx={{ height: "inherit" }}>
      <Grid
        item
        lg={2}
        md={4}
        xs={12}
        sx={{ height: "inherit", display: isSm ? "none" : "flex" }}
      />
      <Grid
        item
        lg={2}
        md={4}
        xs={12}
        sx={{
          height: isSm ? "auto" : "inherit",
          position: isSm ? "relative" : "fixed",
        }}
      >
        <ProductInfo />
      </Grid>
      <Grid item lg={10} md={8} xs={12}>
        <SalesChart />
        <SalesTable />
      </Grid>
    </Grid>
  );
}
