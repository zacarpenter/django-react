import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, IconButton } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Link } from "react-router-dom";

// functional compotent instead of the class component I have been using
export default function Info(props) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} alignContent="center">
        <Typography>What is House Party?</Typography>
      </Grid>
    </Grid>
  );
}
