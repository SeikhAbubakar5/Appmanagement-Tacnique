import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Dashboard from './Components/Dashboard/Dashboard';
import ModalForm from './Components/Modals/ModalForm';
import { Box } from '@mui/material';
import  { Toaster } from 'react-hot-toast';

const App = () => {
  const [openModal, setOpenModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  // Function for adding a new user
  const handleAddNewUser = () => {
    setUserToEdit(null); 
    setOpenModal(true);
  };

  // Function  for editing an existing user
  const handleEditUser = (user) => {
    setUserToEdit(user);
    setOpenModal(true);
  };

  // Function to handle form submission 
  const handleFormSubmit = () => {
    
    setOpenModal(false);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box>
      <Navbar onAddNewUser={handleAddNewUser} /> 
      <Dashboard onEditUser={handleEditUser} />
      <ModalForm
        openModal={openModal}
        onCloseModal={handleCloseModal}
        onFormSubmit={handleFormSubmit}
        userToEdit={userToEdit}
      />
      <Toaster/>
    </Box>
  );
};

export default App;
