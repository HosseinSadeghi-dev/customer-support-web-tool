import React, { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import AddPlayerForm from './AddPlayerForm';

const AddPlayerModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add Player
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <AddPlayerForm />
        </Box>
      </Modal>
    </div>
  );
};

export default AddPlayerModal;
