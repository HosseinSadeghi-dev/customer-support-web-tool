import React, { useMemo, useState } from "react";
import { Button, Modal, Box, IconButton, Tooltip } from "@mui/material";
import AddPlayerForm from "./AddPlayerForm";
import { Player } from "../../../types/player.type";
import { Add, Edit } from "@mui/icons-material";

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

  const isEditingBtn = useMemo(() => !!player?.id, [player]);

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
      {isEditingBtn ? (
        <>
          <Tooltip title="Edit Player">
            <IconButton
              color="primary"
              onClick={handleOpen}
              aria-label="Edit Player"
            >
              <Edit />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Button
          variant={"contained"}
          onClick={handleOpen}
          size={"medium"}
          startIcon={<Add />}
        >
          {"Add Player"}
        </Button>
      )}

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
