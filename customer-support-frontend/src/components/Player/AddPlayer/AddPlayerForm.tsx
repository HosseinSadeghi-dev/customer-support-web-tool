import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import api from "../../../services/api";
import TagsInput from "../../Tag/TagInput";

interface Props {
  onPlayerAdded: (name: string, tags: string[], id: number) => void;
}

const AddPlayerForm: React.FC<Props> = ({ onPlayerAdded }) => {
  const [name, setName] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/players", { name, tags });
      alert("Player added successfully!");
      onPlayerAdded(name, tags, res.data.id);
      setName("");
      setTags([]);
    } catch (error) {
      console.error("Error adding player:", error);
      alert("Failed to add player.");
    }
  };

  return (
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
      <TagsInput onTagsChange={setTags} />
      <Button type="submit" variant="contained" color="primary">
        Add Player
      </Button>
    </form>
  );
};

export default AddPlayerForm;