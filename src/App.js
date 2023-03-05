import React from "react";
import { Box, ThemeProvider } from "@material-ui/core";
import theme from "./theme/theme";

export default () => {
  return <ThemeProvider theme={theme}></ThemeProvider>;
};
