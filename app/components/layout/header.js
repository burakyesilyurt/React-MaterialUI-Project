import Image from 'next/image';
import { AppBar, Toolbar, Typography, Button, Box, Tabs, Tab } from "@mui/material"
import logo from "@/public/svgs/logo.svg"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
import { UserTable } from "../user-form"
import { MainContext, useContext } from "../../context"


export const Header = () => {
  const { datas, setFilteredData } = useContext(MainContext)
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);


  const handleChange = (event, newValue) => {
    setValue(newValue);
    const filterByRole = (role) => {
      setFilteredData(datas.filter((item) => {
        if (typeof item.role === 'string') {
          return item.role.includes(role)
        }
      }))
    }
    switch (newValue) {
      case 1:
        filterByRole("Contributor")
        break;
      case 2:
        filterByRole("Author")
        break;
      case 3:
        filterByRole("Administrator")
        break;
      case 4:
        filterByRole("Subscriber")
        break;
      default:
        filterByRole("")
    }
  };

  const handleClickOpen = () => {
    setOpen(true)
  }



  return (
    <>
      <AppBar position="static" color="transparent" sx={{ boxShadow: "none" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Button variant='text' startIcon={<Image src={logo} alt='logo' />} sx={{ color: "#3A3C40", fontWeight: 600 }}>Users</Button>

          <Box sx={{ bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered
              TabIndicatorProps={{
                sx
                  : { borderBottom: `2px solid #2940D3` }
              }}
            >
              <Tab label="All Users" />
              <Tab label="Contributor" />
              <Tab label="Author" />
              <Tab label="Adminstrator" />
              <Tab label="Subscriber" />
            </Tabs>
          </Box>
          <Box>
            <Button variant='contained' onClick={handleClickOpen} startIcon={<AddCircleIcon />} sx={{ backgroundColor: "#2940D3", fontWeight: 600 }}>Add New User</Button>
          </Box>
        </Toolbar>
      </AppBar >
      <Box sx={{
        borderBottom: "2px solid #BABFC5", position: 'relative', top
          : -8, zIndex: -1
      }}>
      </Box>
      <UserTable open={open} setOpen={setOpen} />
    </>
  )
}