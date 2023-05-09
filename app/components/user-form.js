"use client";
import Image from 'next/image';
import { Button, TextField, Dialog, DialogActions, DialogContent, InputLabel, MenuItem, FormControl, Select, Radio, RadioGroup, FormControlLabel, FormLabel } from "@mui/material";
import Image1 from "@/public/img/Image1.png"
import Image2 from "@/public/img/Image2.png"
import Image3 from "@/public/img/Image3.png"
import Image4 from "@/public/img/Image4.png"
import Image5 from "@/public/img/Image5.png"
import Image6 from "@/public/img/Image6.png"
import { useState } from 'react';

export const UserTable = ({ open, setOpen }) => {
  const [role, setRole] = useState("")

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formJson)
    };
    fetch('https://645a6c8b65bd868e931ab62d.mockapi.io/users', requestOptions)
      .then(response => response.json())
      .then(data => handleClose());


  }

  const handleRoleChange = (e) => {
    setRole(e.target.value)
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit} method='post'>
          <DialogContent sx={{ py: "40px" }}>

            <TextField
              autoFocus
              name='fullname'
              margin="dense"
              id="fullname"
              label="Full Name"
              type="text"
              fullWidth
              variant="outlined"
              sx={{ mb: "28px" }}
              InputProps={{ sx: { borderRadius: "8px" } }}
            />
            <TextField
              name='username'
              margin="dense"
              id="username"
              label="Username"
              type="text"
              fullWidth
              variant="outlined"
              sx={{ mb: "28px" }}
              InputProps={{ sx: { borderRadius: "8px" } }}
            />
            <TextField
              margin="dense"
              name="email"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              sx={{ mb: "30px" }}
              InputProps={{ sx: { borderRadius: "8px" } }}
            />
            <FormControl sx={{ mb: "28px" }} fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                name="role"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Age"
                onChange={handleRoleChange}

                style={{ borderRadius: "8px" }}
              >
                <MenuItem sx={{ borderBottom: "2px solid #F5F5F7" }} value={"Contributor"}>Contributor</MenuItem>
                <MenuItem sx={{ borderBottom: "2px solid #F5F5F7" }} value={"Subscriber"}>Subscriber</MenuItem>
                <MenuItem sx={{ borderBottom: "2px solid #F5F5F7" }} value={"Author"}>Author</MenuItem>
                <MenuItem value={"Administrator"}>Administrator</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: "100%" }}>
              <FormLabel sx={{ mb: "5px" }} id="demo-row-radio-buttons-group-label">Select Avatar</FormLabel>
              <RadioGroup
                row
                sx={{ justifyContent: "space-between" }}
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="avatar"
              >

                <FormControlLabel value="1" control={<Radio icon={<Image alt='avatar' sizes='' src={Image1} />} color='default' checkedIcon={<Image alt='avatar' src={Image1} />} sx={{
                  borderRadius: "5px",
                  '&.Mui-checked': {
                    boxShadow: "0 0 5px 8px #3361FF1A"
                  },
                }} />} />
                <FormControlLabel value="2" control={<Radio icon={<Image alt='avatar' src={Image2} />} color='default' checkedIcon={<Image alt='avatar' src={Image2} />} sx={{
                  borderRadius: "5px",
                  '&.Mui-checked': {
                    boxShadow: "0 0 5px 8px #3361FF1A"
                  },
                }} />} />
                <FormControlLabel value="3" control={<Radio icon={<Image alt='avatar' src={Image3} />} color='default' checkedIcon={<Image alt='avatar' src={Image3} />} sx={{
                  borderRadius: "5px",
                  '&.Mui-checked': {
                    boxShadow: "0 0 5px 8px #3361FF1A"
                  },
                }} />} />
                <FormControlLabel value="4" control={<Radio icon={<Image alt='avatar' src={Image4} />} color='default' checkedIcon={<Image alt='avatar' src={Image4} />} sx={{
                  borderRadius: "5px",
                  '&.Mui-checked': {
                    boxShadow: "0 0 5px 8px #3361FF1A"
                  },
                }} />} />
                <FormControlLabel value="5" control={<Radio icon={<Image alt='avatar' src={Image5} />} color='default' checkedIcon={<Image alt='avatar' src={Image5} />} sx={{
                  borderRadius: "5px",
                  '&.Mui-checked': {
                    boxShadow: "0 0 5px 8px #3361FF1A"
                  },
                }} />} />
                <FormControlLabel value="6" control={<Radio icon={<Image alt='avatar' src={Image6} />} color='default' checkedIcon={<Image alt='avatar' src={Image6} />} sx={{
                  borderRadius: "5px",
                  '&.Mui-checked': {
                    boxShadow: "0 0 5px 8px #3361FF1A"
                  },
                }} />} />
              </RadioGroup>
            </FormControl>
          </DialogContent>

          <DialogActions sx={{ justifyContent: "center", mb: "10px" }}>
            <Button type='submit' variant='contained' sx={{ backgroundColor: "#2940D3", fontWeight: 600, py: "12px", px: "24px" }}>Create User</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

