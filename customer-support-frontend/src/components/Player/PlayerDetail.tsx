import React, { useCallback, useEffect, useState } from "react";
import { GridPaginationModel } from "@mui/x-data-grid";
import api from "../../services/api";
import { Box, Divider, Stack } from "@mui/material";
import { Player } from "../../types/player.type";
import { useParams } from "react-router";
import TagChip from "../Tag/TagChip";

const PlayerDetail: React.FC = () => {
  const { playerId } = useParams();
  const [player, setPlayer] = useState<Player>({} as Player);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPlayer = useCallback(async () => {
    try {
      const response = await api.get<Player>(`/players/${playerId}`);
      setPlayer(response.data);
    } catch (error) {
      console.error("Error fetching player:", error);
    } finally {
      setLoading(false);
    }
  }, [playerId]);

  useEffect(() => {
    fetchPlayer();
  }, [fetchPlayer]);

  return (
    <>
      <Stack
        direction="column"
        spacing={1}
        gap={1.5}
        justifyItems={"flex-start"}
        alignItems={"stretch"}
      >
        <p>
          Player ID: <b>{playerId}</b>
        </p>
        <Divider />
        <p>
          Player Name: <b>{player.name}</b>
        </p>
        <Divider />
        {player?.tags?.length && (
          <>
            <p>
              Player Tags:{" "}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  mt: 0.5,
                  gap: 0.5,
                }}
              >
                {player.tags?.map((tag: string) => (
                  <TagChip key={tag} tagName={tag} />
                ))}
              </Box>
            </p>
            <Divider />
          </>
        )}
      </Stack>
    </>
  );
};

export default PlayerDetail;
