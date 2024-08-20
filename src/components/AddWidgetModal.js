// src/components/AddWidgetModal.js
import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const AddWidgetModal = ({ open, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    onAdd({ name, description });
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 400, margin: 'auto', mt: 10, p: 3, bgcolor: 'white', boxShadow: 24 }}>
        <Typography variant="h6">Add New Widget</Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Widget Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Widget Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add Widget
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddWidgetModal;
