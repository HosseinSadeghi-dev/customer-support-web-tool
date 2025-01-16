import React, { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import AddPlayerForm from "./AddPlayerForm";

interface Props {
  onPlayerAdded: (name: string, tags: string[], id: number) => void;
}

const AddPlayerModal: React.FC<Props> = ({ onPlayerAdded }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const playerAddedHandler = (name: string, tags: string[], id: number) => {
    onPlayerAdded(name, tags, id);
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        style={{ marginBottom: "8px" }}
      >
        Add Player
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <AddPlayerForm onPlayerAdded={playerAddedHandler} />
        </Box>
      </Modal>
    </div>
  );
};

export default AddPlayerModal;
