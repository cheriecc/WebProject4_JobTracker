import React from "react";
import { Grid, ThemeProvider } from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

export default () => {
  return <ThemeProvider theme={theme}>
    <Header />
    <Grid container justifyContent="center">
      <Grid item xs={10}>
        <SearchBar />
      </Grid>
    </Grid>
  </ThemeProvider>;
};
