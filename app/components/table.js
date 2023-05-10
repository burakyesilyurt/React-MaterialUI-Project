"use client"
import { Box, Stack, Button } from "@mui/material";
import { InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridPagination, useGridApiContext, useGridSelector, gridPageCountSelector } from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';
import Avatar from '@mui/material/Avatar';
import { EditUserTable } from "./edit-user-form"
import { MainContext, useContext } from "../context"
import { useEffect, useState } from "react";



export const TableLayout = () => {
  const { datas, setDatas } = useContext(MainContext)
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://645a6c8b65bd868e931ab62d.mockapi.io/users");
      const json = await response.json();
      setDatas(json);
      console.log(json)
    }
    fetchData();
  }, [])

  const filtered = datas.filter((item) => {
    if (typeof item.username === 'string') {
      return item.username.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase())
    }
  });



  return (
    <>
      <Stack sx={{ my: "12px", width: "85vw" }} direction="row" justifyContent="space-between">
        <Box>
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon sx={{ width: "30px", height: "30px" }} />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
        <Box>
          <Button startIcon={<DeleteIcon />} size="large" color="inherit" sx={{ color: "#82868C", fontWeight: 600 }}>
            Delete
          </Button>
        </Box>

      </Stack>
      <DataGridDemo filteredData={filtered} />
    </>
  )
}

const columns = [

  {
    field: 'avatar', headerName: 'Avatar', flex: 0, renderCell: (params) => {
      //console.log(params.formattedValue);
      return (
        <>
          <Avatar variant="square" src={`/img/Image${params.formattedValue}.png`} alt="avatar" />
        </>
      );
    }
  },
  {
    field: 'fullname',
    headerName: 'Name',
    flex: 1,
    editable: true
  },
  {
    field: 'username',
    headerName: 'Username',
    flex: 1,
    editable: true
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    flex: 1,
    editable: true
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 1
  },
  {
    field: 'action',
    headerName: 'Edit',
    width: 180,
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      const { datas, setDatas } = useContext(MainContext);
      const [openEdit, setOpenEdit] = useState(false);
      const [userEditData, setUserEditData] = useState({})
      const onClick = (e) => {
        const currentRow = params.row;
        setOpenEdit(true)
        setUserEditData(currentRow)
      };
      const deleteItem = (e) => {
        const currentRow = params.row;
        const id = currentRow.id;
        fetch(`https://645a6c8b65bd868e931ab62d.mockapi.io/users/${id}`, { method: "DELETE" })
          .then(() => setDatas((items) =>
            items.filter((item) => item.id !== id)
          ));
      };

      return (
        <>
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="edit" onClick={onClick}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={deleteItem}>
              <DeleteIcon />
            </IconButton>
          </Stack>
          <EditUserTable openEdit={openEdit} setOpenEdit={setOpenEdit} userData={userEditData} />
        </>
      );
    },
  }
];

const rows = [
  { id: 0, img: 1, name: 'Snow', username: 'Jon', email: "asdsadsadsad@asdsad.com", role: "admin" },
  { id: 1, img: 2, name: 'Lannister', username: 'Cersei', email: "asdsadsadsad@asdsad.com", role: "admin" },
  { id: 2, img: 3, name: 'Lannister', username: 'Jaime', email: "asdsadsadsad@asdsad.com", role: "admin" },
  { id: 3, img: 4, name: 'Stark', username: 'Arya', email: "asdsadsadsad@asdsad.com", role: "admin" },
  { id: 4, img: 5, name: 'Targaryen', username: 'Daenerys', email: null },
  { id: 5, img: 6, name: 'Melisandre', username: null, email: "asdsadsadsad@asdsad.com", role: "admin" },
  { id: 6, img: 7, name: 'Clifford', username: 'Ferrara', email: "asdsadsadsad@asdsad.com", role: "admin" },
  { id: 7, img: 8, name: 'Frances', username: 'Rossini', email: "asdsadsadsad@asdsad.com", role: "admin" },
  { id: 8, img: 9, name: 'Roxie', username: 'Harvey', email: "asdsadsadsad@asdsad.com", role: "admin" },
  { id: 9, img: 10, name: 'Roxiee', username: 'Harvey', email: "asdsadsadsad@asdsad.com", role: "admin" },
  { id: 10, img: 10, name: 'Roxiee', username: 'Harvey', email: "asdsadsadsad@asdsad.com", role: "admin" },
  { id: 11, img: 10, name: 'Roxiee', username: 'Harvey', email: "asdsadsadsad@asdsad.com", role: "admin" },
  { id: 12, img: 10, name: 'Roxiee', username: 'Harvey', email: "asdsadsadsad@asdsad.com", role: "admin" },
  { id: 13, img: 10, name: 'Roxiee', username: 'Harvey', email: "asdsadsadsad@asdsad.com", role: "admin" },
  { id: 14, img: 10, name: 'Roxiee', username: 'Harvey', email: "asdsadsadsad@asdsad.com", role: "admin" },
  { id: 15, img: 10, name: 'Roxiee', username: 'Harvey', email: "asdsadsadsad@asdsad.com", role: "admin" },
  { id: 16, img: 10, name: 'Roxiee', username: 'Harvey', email: "asdsadsadsad@asdsad.com", role: "admin" },
  { id: 17, img: 10, name: 'Roxiee', username: 'Harvey', email: "asdsadsadsad@asdsad.com", role: "admin" },
  { id: 18, img: 10, name: 'Roxiee', username: 'Harvey', email: "asdsadsadsad@asdsad.com", role: "admin" },
];



function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;

}

const DataGridDemo = ({ filteredData }) => {

  const data = {
    columns: [...columns],
    rows: [...filteredData]
  }

  return (
    <Box sx={{
      width: '90vw'
    }}>
      <DataGrid

        pagination
        slots={{
          pagination: CustomPagination,
        }}
        {...data}
        initialState={{
          ...data.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}




function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      shape="rounded"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
      }}
    />
  );
}
