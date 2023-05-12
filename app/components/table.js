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
  const { datas, setDatas, filteredData, setFilteredData } = useContext(MainContext)
  const [search, setSearch] = useState("");
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://645a6c8b65bd868e931ab62d.mockapi.io/users");
      const json = await response.json();
      const updatedData = json.map(item => {
        if (item.role.startsWith("role")) {
          return { ...item, role: "Subscriber", avatar: "3" };
        }

        return item;
      });
      setDatas(updatedData);
      console.log(json)
    }
    fetchData();
  }, [])


  useEffect(() => {
    setFilteredData(datas.filter((item) => {
      if (typeof item.username === 'string') {
        return item.username.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase())
      }
    }))
  }, [search, datas])


  const deleteSelectedItems = (ids) => {
    if (!ids) return;



    ids.forEach(async (id) => {
      const response = await fetch(`https://645a6c8b65bd868e931ab62d.mockapi.io/users/${id}`, { method: "DELETE" });
      const json = await response.json();
      setDatas((current) =>
        current.filter((data) => data.id !== id)
      );

    })
  }

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
          <Button onClick={() => deleteSelectedItems(rowSelectionModel)} startIcon={<DeleteIcon />} size="large" color="inherit" sx={{ color: "#82868C", fontWeight: 600 }}>
            Delete
          </Button>
        </Box>

      </Stack>
      <DataGridDemo rowSelectionModel={rowSelectionModel} setRowSelectionModel={setRowSelectionModel} />
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




function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;

}

const DataGridDemo = ({ rowSelectionModel, setRowSelectionModel }) => {
  const { filteredData } = useContext(MainContext)

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
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
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
