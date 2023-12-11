import { AppBar as MuiAppBar, Toolbar, Typography } from "@mui/material";
import logo from "../stackline_logo.svg";

export default function AppBar() {
  return (
    <MuiAppBar position="fixed" sx={{ bgcolor: "#042849" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src={logo} alt="Stackline Logo" style={{ width: "100px" }} />
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}
