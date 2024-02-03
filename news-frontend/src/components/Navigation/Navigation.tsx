import {AppBar, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const Navigation = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography to="/" component={NavLink} variant="h6" color="white" sx={{mr:'auto', textDecoration:'none'}}>News</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
