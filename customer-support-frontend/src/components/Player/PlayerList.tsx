import React, { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import api from "../../services/api";
import { Box, Chip, Stack } from "@mui/material";
import DebounceInput from "../UI/DebounceInput";
import { Player } from "../../types/player.type";
import { PaginationResponse } from "../../types/pagination.type";
import AddPlayerModal from "./AddPlayer/AddPlayerModal";

const TagChip: React.FC<{ tagName: string }> = ({ tagName }) => {
  return <Chip label={tagName} variant="outlined" />;
};

const PlayerList: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playersCount, setPlayersCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "tags",
      headerName: "Tags",
      width: 200,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
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
  ];

  const newPlayer = (name: string, tags: string[], id: number): void => {
    setPlayers((prev) => {
      return [
        ...prev,
        {
          id,
          name,
          tags,
        },
      ];
    });
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
      <Stack direction="row" spacing={1} sx={{ mb: 1 }} alignItems={"center"}>
        <AddPlayerModal onPlayerAdded={newPlayer} />
        <DebounceInput
          label="Search"
          placeholder="Player Tag"
          type="text"
          onTextChange={setSearchTerm}
        />
      </Stack>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <DataGrid
          paginationMode="server"
          rowCount={playersCount}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          rowHeight={100}
          rows={players}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.id}
          isRowSelectable={() => false}
        />
      </div>
    </>
  );
};

export default PlayerList;
