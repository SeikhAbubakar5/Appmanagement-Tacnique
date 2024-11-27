import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../Service/userServices';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';
import { Grid2 } from '@mui/material'; 


const Dashboard = ({ onEditUser }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const getUser = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this user?");
    if (confirmDelete) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
        toast.success('User deleted successfully!', {
          position: 'top-center',
          duration: 3000,
          style: { background: 'red', color: '#fff' },
        });
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user.', {
          position: 'top-center',
          duration: 3000,
          style: { background: '#f44336', color: '#fff' },
        });
      }
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const tableHeaders = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'address', label: 'Address' },
    { id: 'phone', label: 'Phone' },
    { id: 'website', label: 'Website' },
    { id: 'company', label: 'Company' },
    { id: 'actions', label: 'Actions' },
  ];

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell key={header.id} align="center" >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id} align="right">
                <TableCell component="th" scope="row">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{`${user.address.street}, ${user.address.city}`}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.website}</TableCell>
                <TableCell>{user.company.name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    onClick={() => handleDelete(user.id)}
                    sx={{ marginRight: '20px' }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => onEditUser(user)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid2 container justifyContent="center" alignItems="center" marginTop={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
        >
          &lt;
        </Button>
        <Typography variant="body1" marginX={2}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
        >
          &gt;
        </Button>
      </Grid2>
    </Box>
  );
};

export default Dashboard;
