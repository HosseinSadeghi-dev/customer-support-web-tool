import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import api from "../../../services/api";
import TagsInput from "../../Tag/TagInput";
import { Player } from "../../../types/player.type";

interface Props {
  onPlayerAdded: (player: Partial<Player>) => void;
  onPlayerEdited: (player: Partial<Player>) => void;
  player?: Partial<Player>;
}

const AddPlayerForm: React.FC<Props> = ({
  onPlayerAdded,
  onPlayerEdited,
  player,
}) => {
  const [name, setName] = useState<string>("");
  const [discordUsername, setDiscordUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [isVip, setIsVip] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (player?.id) {
      handleEditPlayer();
    } else {
      handleCreatePlayer();
    }
  };

  const handleCreatePlayer = async () => {
    try {
      const playerPayload: Partial<Player> = {
        name,
        ...(discordUsername ? { discordUsername } : {}),
        ...(email ? { email } : {}),
        tags,
        isVip,
      };
      const res = await api.post("/players", playerPayload);
      onPlayerAdded({
        ...playerPayload,
        id: res.data.id,
      });
      resetForm();
    } catch (error) {
      console.error("Error adding player:", error);
      setSnackbarMessage("Failed to add player.");
      setSnackbarOpen(true);
    }
  };

  const handleEditPlayer = async () => {
    try {
      const playerPayload: Partial<Player> = {
        id: player?.id,
        name,
        discordUsername,
        email,
        tags,
        isVip,
      };
      await api.put("/players", playerPayload);
      onPlayerEdited({
        ...playerPayload,
      });
      resetForm();
    } catch (error) {
      console.error("Error Editing player:", error);
      setSnackbarMessage("Failed to edit player.");
      setSnackbarOpen(true);
    }
  };

  const resetForm = () => {
    setDiscordUsername("");
    setEmail("");
    setName("");
    setTags([]);
    setIsVip(false);
  };

  useEffect(() => {
    if (player?.id) {
      setName(player.name ?? "");
      setDiscordUsername(player.discordUsername ?? "");
      setEmail(player.email ?? "");
      setTags(player.tags ?? []);
      setIsVip(Boolean(player.isVip));
    }
  }, [player]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "stretch",
          gap: "1rem",
        }}
      >
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <TextField
          label="Discord Username"
          value={discordUsername}
          onChange={(e) => setDiscordUsername(e.target.value)}
        />
        <TagsInput onTagsChange={setTags} prevSelectedTags={tags} />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={isVip}
                onChange={(_, checked) => setIsVip(checked)}
              />
            }
            label="VIP"
          />
        </FormGroup>
        <Button type="submit" variant="contained" color="primary">
          {player?.id ? "Edit Player" : "Add Player"}
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddPlayerForm;
