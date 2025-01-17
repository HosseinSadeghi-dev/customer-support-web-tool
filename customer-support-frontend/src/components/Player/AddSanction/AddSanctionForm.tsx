import React, { useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import api from "../../../services/api";
import { useParams } from "react-router";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { SanctionTypes } from "../../../types/sanction.type";

interface Props {
  onSanctionAdded: () => void;
}

const AddSanctionForm: React.FC<Props> = ({ onSanctionAdded }) => {
  const { playerId } = useParams();
  const [type, setType] = useState<SanctionTypes | null>(null);
  const [expiresAt, setExpiresAt] = useState<Dayjs | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/sanctions", {
        playerId,
        type,
        expiresAt,
      });
      setType(null);
      setExpiresAt(null);
      onSanctionAdded();
    } catch (error) {
      console.error("Error Editing player:", error);
      setSnackbarMessage("Failed to add sanction.");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
      <FormControl>
        <InputLabel id="type-select-label">Sanction Type</InputLabel>
        <Select
          labelId="type-select-label"
          value={type as string}
          onChange={(e) => setType(e.target.value as SanctionTypes)}
          label="Sanction Type"
        >
          {Object.values(SanctionTypes).map((sanctionType) => (
            <MenuItem key={sanctionType} value={sanctionType}>
              {sanctionType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <DateTimePicker
            minDateTime={dayjs()}
            label="Expires At"
            value={expiresAt}
            onChange={(newValue) => setExpiresAt(newValue)}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <Button type="submit" variant="contained" color="primary">
        Add Sanction
      </Button>
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
    </form>
  );
};

export default AddSanctionForm;
