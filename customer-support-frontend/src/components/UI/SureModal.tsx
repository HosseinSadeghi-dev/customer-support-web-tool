import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface SureModalProps {
  isOpen: boolean;
  isSure: () => void;
  onClose: () => void;
}

const SureModal: React.FC<SureModalProps> = ({ isOpen, isSure, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          Are you sure?
        </Typography>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={isSure}>
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SureModal;
