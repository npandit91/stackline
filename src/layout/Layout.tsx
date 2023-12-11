import { Fragment, ReactNode } from "react";
import AppBar from "../nav/AppBar";
import { Toolbar } from "@mui/material";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <AppBar />
      <Fragment>
        <Toolbar />
        {children}
      </Fragment>
    </Fragment>
  );
}
