import React from "react";
import { Container, styled } from "@mui/material";

const MainContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexFlow: "column",
  rowGap: theme.spacing(1.2),
  margin: theme.spacing(2),
  form: {
    display: "flex",
    flexFlow: "row",
    columnGap: theme.spacing(2)
  }
}));

export default MainContainer;
