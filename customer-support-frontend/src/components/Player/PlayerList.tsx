import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import api from "../../services/api";
import { Box, Chip, Stack } from "@mui/material";
import AddPlayerModal from "../AddPlayer/AddPlayerModal";

interface Player {
  id: number;
  name: string;
  tags: string[];
}

const TagChip: React.FC<{ tagName: string }> = ({ tagName }) => {
  return <Chip label={tagName} variant="outlined" />;
};

const PlayerList: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await api.get("/players");
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <AddPlayerModal onPlayerAdded={newPlayer} />
      </Stack>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <DataGrid
          rowHeight={100}
          rows={players}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.id}
          hideFooter={true}
          isRowSelectable={() => false}
        />
      </div>
    </>
  );
};

export default PlayerList;
