import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { createNewUser, updateUser } from '../Service/userServices';
import toast from 'react-hot-toast';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
};

const ModalForm = ({ userToEdit, onFormSubmit, openModal, onCloseModal }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    street: '',
    city: '',
    companyName: '',
  });

  useEffect(() => {
    if (userToEdit) {
      setUser({
        name: userToEdit.name || '',
        email: userToEdit.email || '',
        phone: userToEdit.phone || '',
        website: userToEdit.website || '',
        street: userToEdit.address?.street || '',
        city: userToEdit.address?.city || '',
        companyName: userToEdit.company?.name || '',
      });
    } else {
      setUser({
        name: '',
        email: '',
        phone: '',
        website: '',
        street: '',
        city: '',
        companyName: '',
      });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userToSubmit = { ...user };

      if (userToEdit) {
        await updateUser(userToEdit.id, userToSubmit);
        toast.success('User updated successfully!', {
          position: 'top-center',
          duration: 3000,
          style: {
            background: '#4caf50',
            color: '#fff',
          },
        });
      } else {
        await createNewUser(userToSubmit);
        toast.success('User added successfully!', {
          position: 'top-center',
          duration: 3000,
          style: {
            background: '#4caf50',
            color: '#fff',
          },
        });
      }

      onFormSubmit();
      onCloseModal();
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error('An error occurred. Please try again.', {
        position: 'top-center',
        duration: 3000,
        style: {
          background: '#f44336',
          color: '#fff',
        },
      });
    }
  };

  return (
    <Modal
      open={openModal}
      onClose={onCloseModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          {userToEdit ? 'Edit User' : 'Add New User'}
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Full Name"
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Phone"
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            type="text"
            name="website"
            value={user.website}
            onChange={handleChange}
            placeholder="Website"
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            type="text"
            name="street"
            value={user.street}
            onChange={handleChange}
            placeholder="Street"
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            type="text"
            name="city"
            value={user.city}
            onChange={handleChange}
            placeholder="City"
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <input
            type="text"
            name="companyName"
            value={user.companyName}
            onChange={handleChange}
            placeholder="Company"
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <Box display="flex" justifyContent="space-between">
            <Button variant="outlined" color="secondary" onClick={onCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {userToEdit ? 'Update User' : 'Add User'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalForm;
