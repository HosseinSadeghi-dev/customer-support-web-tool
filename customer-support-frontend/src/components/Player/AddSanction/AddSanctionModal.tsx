import React, { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import AddSanctionForm from "./AddSanctionForm";

interface Props {
  onSanctionAdded: () => void;
}

const AddSanctionModal: React.FC<Props> = ({ onSanctionAdded }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const playerAddedHandler = () => {
    onSanctionAdded();
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        style={{ marginBottom: "8px" }}
      >
        Add Sanction
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
          <AddSanctionForm onSanctionAdded={playerAddedHandler} />
        </Box>
      </Modal>
    </div>
  );
};

export default AddSanctionModal;
