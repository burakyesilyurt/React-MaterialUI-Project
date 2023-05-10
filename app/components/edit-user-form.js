"use client";
import Image from 'next/image';
import { Button, TextField, Dialog, DialogActions, DialogContent, InputLabel, MenuItem, FormControl, Select, Radio, RadioGroup, FormControlLabel, FormLabel } from "@mui/material";
import { MainContext, useContext } from "../context"
import { useState } from 'react';

export const EditUserTable = ({ openEdit, setOpenEdit, userData }) => {
  const { datas, setDatas } = useContext(MainContext)
  const [role, setRole] = useState("")

  const handleClose = (data, formJson) => {
    setOpenEdit(false)
    //setDatas(() => [...datas, data])
    handleEditData(userData.id, formJson)
  }

  const handleEditData = (id, formJson) => {
    const newDatas = datas.map((user) => {
      if (user.id === id) {
        return { ...user, ...formJson };
      }
      return user;
    });
    setDatas(newDatas);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());


    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formJson)
    };
    fetch(`https://645a6c8b65bd868e931ab62d.mockapi.io/users/${userData.id}`, requestOptions)
      .then(response => response.json())
      .then(data => handleClose(data, formJson));

  }

  const handleRoleChange = (e) => {
    setRole(e.target.value)
  }

  return (
    <>
      <Dialog open={openEdit} onClose={handleClose}>
        <form onSubmit={handleSubmit} method='post'>
          <DialogContent sx={{ py: "40px" }}>

            <TextField
              InputLabelProps={{ required: false }}
              required
              autoFocus
              defaultValue={userData.fullname}
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
              InputLabelProps={{ required: false }}
              required
              defaultValue={userData.username}
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
              InputLabelProps={{ required: false }}
              required
              defaultValue={userData.email}
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
            <FormControl required sx={{ mb: "28px" }} fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                defaultValue={userData.role}
                name="role"
                labelId="demo-simple-select-label"
                id="demo-simple-select"

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
            <FormControl required sx={{ width: "100%" }}>
              <FormLabel sx={{ mb: "5px" }} id="demo-row-radio-buttons-group-label">Select Avatar</FormLabel>
              <RadioGroup
                row
                sx={{ justifyContent: "space-between" }}
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="avatar"
              >

                <FormControlLabel value="1" control={<Radio required icon={<Image alt='avatar' width={"40"} height={"40"} src={"/img/Image1.png"} />} color='default' checkedIcon={<Image alt='avatar' width={"40"} height={"40"} src={"/img/Image1.png"} />} sx={{
                  borderRadius: "5px",
                  '&.Mui-checked': {
                    boxShadow: "0 0 5px 8px #3361FF1A"
                  },
                }} />} />
                <FormControlLabel value="2" control={<Radio required icon={<Image alt='avatar' width={"40"} height={"40"} src={"/img/Image2.png"} />} color='default' checkedIcon={<Image alt='avatar' width={"40"} height={"40"} src={"/img/Image2.png"} />} sx={{
                  borderRadius: "5px",
                  '&.Mui-checked': {
                    boxShadow: "0 0 5px 8px #3361FF1A"
                  },
                }} />} />
                <FormControlLabel value="3" control={<Radio required icon={<Image alt='avatar' width={"40"} height={"40"} src={"/img/Image3.png"} />} color='default' checkedIcon={<Image alt='avatar' width={"40"} height={"40"} src={"/img/Image3.png"} />} sx={{
                  borderRadius: "5px",
                  '&.Mui-checked': {
                    boxShadow: "0 0 5px 8px #3361FF1A"
                  },
                }} />} />
                <FormControlLabel value="4" control={<Radio required icon={<Image alt='avatar' width={"40"} height={"40"} src={"/img/Image4.png"} />} color='default' checkedIcon={<Image alt='avatar' width={"40"} height={"40"} src={"/img/Image4.png"} />} sx={{
                  borderRadius: "5px",
                  '&.Mui-checked': {
                    boxShadow: "0 0 5px 8px #3361FF1A"
                  },
                }} />} />
                <FormControlLabel value="5" control={<Radio required icon={<Image alt='avatar' width={"40"} height={"40"} src={"/img/Image5.png"} />} color='default' checkedIcon={<Image alt='avatar' width={"40"} height={"40"} src={"/img/Image5.png"} />} sx={{
                  borderRadius: "5px",
                  '&.Mui-checked': {
                    boxShadow: "0 0 5px 8px #3361FF1A"
                  },
                }} />} />
                <FormControlLabel value="6" control={<Radio required icon={<Image alt='avatar' width={"40"} height={"40"} src={"/img/Image6.png"} />} color='default' checkedIcon={<Image alt='avatar' width={"40"} height={"40"} src={"/img/Image6.png"} />} sx={{
                  borderRadius: "5px",
                  '&.Mui-checked': {
                    boxShadow: "0 0 5px 8px #3361FF1A"
                  },
                }} />} />
              </RadioGroup>
            </FormControl>
          </DialogContent>

          <DialogActions sx={{ justifyContent: "center", mb: "10px" }}>
            <Button type='submit' variant='contained' sx={{ backgroundColor: "#2940D3", fontWeight: 600, py: "12px", px: "24px" }}>Update User</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

