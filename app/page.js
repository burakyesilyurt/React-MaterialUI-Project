"use client"
import { Grid, Box } from "@mui/material";
import { Header } from "./components/layout/header"
import { TableLayout } from "./components/table"



export default function Home() {
  return (
    <Grid container direction={"column"}>
      <Grid item>
        <Header />
      </Grid>
      <Grid item container>
        <Grid item xs={12} sm={8} sx={{ ml: "10px", pl: "12px" }}>
          <TableLayout />
        </Grid>

      </Grid>
    </Grid>
  )
}

