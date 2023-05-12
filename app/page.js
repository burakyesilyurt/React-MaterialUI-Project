"use client"
import { Grid, Box } from "@mui/material";
import { Header } from "./components/layout/header"
import { TableLayout } from "./components/table"
import { MainContext } from "./context"
import { useState } from "react";


export default function Home() {

  const [datas, setDatas] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const data = {
    datas,
    setDatas,
    filteredData,
    setFilteredData
  }
  return (
    <MainContext.Provider value={data}>
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
    </MainContext.Provider>
  )
}

