import React, { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import AddPlayerForm from "./AddPlayerForm";
import { Player } from "../../../types/player.type";

interface Props {
  onPlayerAdded: (player: Partial<Player>) => void;
  onPlayerEdited: (player: Partial<Player>) => void;
  player?: Partial<Player>;
}

const AddPlayerModal: React.FC<Props> = ({
  onPlayerAdded,
  onPlayerEdited,
  player,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const playerAddedHandler = (player: Partial<Player>) => {
    onPlayerAdded(player);
    setOpen(false);
  };

  const playerEditedHandler = (player: Partial<Player>) => {
    onPlayerEdited(player);
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        style={{ marginBottom: "8px" }}
      >
        {player?.id ? "Edit Player" : "Add Player"}
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
          <AddPlayerForm
            onPlayerAdded={playerAddedHandler}
            onPlayerEdited={playerEditedHandler}
            player={player}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default AddPlayerModal;
