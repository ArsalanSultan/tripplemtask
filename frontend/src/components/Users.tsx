import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import axios from 'axios';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'plan', headerName: 'Plan', width: 150 },
];

const Users = () => {
  const [rows, setRows] = useState<GridRowsProp>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/getallusers');
        console.log(response,'response')
        const users = response.data?.users.map((user: any, index: number) => ({
          id: index + 1,
          name: user.name,
          email: user.email,
          plan: user.plan,
        }));
        setRows(users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} />
    </div>
  );
};

export default Users;
