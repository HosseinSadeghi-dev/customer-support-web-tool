import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridPaginationModel,
} from "@mui/x-data-grid";
import api from "../../services/api";
import { Alert, Box, Chip, Snackbar, Stack } from "@mui/material";
import DebounceInput from "../UI/DebounceInput";
import { Player } from "../../types/player.type";
import { PaginationResponse } from "../../types/pagination.type";
import AddPlayerModal from "./AddPlayer/AddPlayerModal";
import TagChip from "../Tag/TagChip";
import { useNavigate } from "react-router";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const PlayerList: React.FC = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [playersCount, setPlayersCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const goToUserDetail = useCallback(
    (playerId: any): void => {
      navigate(`/player/${playerId}`);
    },
    [navigate]
  );

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", width: 90 },
      { field: "name", headerName: "Name", width: 150 },
      { field: "isVip", headerName: "VIP", width: 40, type: "boolean" },
      { field: "email", headerName: "Email", width: 150 },
      { field: "discordUsername", headerName: "Discord Username", width: 150 },
      {
        field: "activeSanction",
        headerName: "Active Sanction",
        width: 150,
        renderCell: (param) => {
          return param.value ? (
            <Chip label={param.value} color="error" />
          ) : null;
        },
      },
      {
        field: "tags",
        headerName: "Tags",
        width: 200,
        renderCell: (params) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              mt: 0.5,
              gap: 0.5,
            }}
          >
            {params.value?.map((tag: string) => (
              <TagChip key={tag} tagName={tag} />
            ))}
          </Box>
        ),
      },
      {
        field: "actions",
        type: "actions",
        width: 190,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<ManageAccountsIcon />}
            label="Detail"
            onClick={() => goToUserDetail(params.id)}
            showInMenu
          />,
          <AddPlayerModal
            onPlayerAdded={newPlayer}
            onPlayerEdited={playerEdited}
            player={params.row}
          />,
        ],
      },
    ],
    [goToUserDetail]
  );

  const newPlayer = (player: Partial<Player>): void => {
    setPlayers((prev) => {
      return [player as Player, ...prev];
    });
    setSnackbarMessage("Player added successfully!");
    setSnackbarOpen(true);
  };

  const playerEdited = (player: Partial<Player>): void => {
    setPlayers((prev) => {
      return prev.map((p) => (p.id === player.id ? { ...p, ...player } : p));
    });
    setSnackbarMessage("Player edited successfully!");
    setSnackbarOpen(true);
  };

  const fetchPlayers = useCallback(async () => {
    try {
      const response = await api.get<PaginationResponse<Player>>("/players", {
        params: {
          search: searchTerm ?? undefined,
          ...paginationModel,
        },
      });
      setPlayers(response.data.data);
      setPlayersCount(response.data.pagination.totalItems);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, paginationModel]);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers, searchTerm, paginationModel]);

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        sx={{ mb: 1 }}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <DebounceInput
          label="Search"
          placeholder="Player Tag"
          type="text"
          size="small"
          onTextChange={setSearchTerm}
        />
        <AddPlayerModal
          onPlayerAdded={newPlayer}
          onPlayerEdited={playerEdited}
        />
      </Stack>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <DataGrid
          paginationMode="server"
          rowCount={playersCount}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowHeight={70}
          rows={players}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.id}
          isRowSelectable={() => false}
        />
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PlayerList;
