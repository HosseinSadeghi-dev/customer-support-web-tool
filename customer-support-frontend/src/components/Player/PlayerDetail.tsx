import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import { Box, Button, CircularProgress, Divider, Stack } from "@mui/material";
import { Player } from "../../types/player.type";
import { useNavigate, useParams } from "react-router";
import TagChip from "../Tag/TagChip";
import PlayerSanctions from "./PlayerSanctions";

const PlayerDetail: React.FC = () => {
  const navigate = useNavigate();
  const { playerId } = useParams();
  const [player, setPlayer] = useState<Player>({} as Player);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPlayer = useCallback(async () => {
    try {
      setLoading(true);
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

  if (loading) {
    return (
      <Stack
        direction="column"
        justifyItems={"center"}
        alignItems={"center"}
        sx={{ mt: 20 }}
      >
        <CircularProgress size="6rem" />
      </Stack>
    );
  }

  return (
    <>
      <Stack
        direction="column"
        spacing={1}
        gap={1.5}
        justifyItems={"flex-start"}
        alignItems={"stretch"}
      >
        <Button
          variant="outlined"
          onClick={() => navigate("/")}
          sx={{ alignSelf: "flex-end" }}
        >
          Go Back To Dashboard
        </Button>

        <p>
          Player ID: <b>{playerId}</b>
        </p>
        <Divider />

        <p>
          Player Name:{" "}
          <b>
            {player.name}
            {player.isVip && <span>⭐</span>}
          </b>
        </p>
        <Divider />

        <p>
          Player Email: <b>{player.email ?? "-"}</b>
        </p>
        <Divider />

        <p>
          Player Discord Username: <b>{player.discordUsername ?? "-"}</b>
        </p>
        <Divider />

        {!!player?.tags?.length && (
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
        <Stack
          direction="column"
          justifyItems={"flex-start"}
          alignItems={"stretch"}
        >
          <p>Player Sanctions:</p>
          <PlayerSanctions playerId={playerId as string} />
        </Stack>
      </Stack>
    </>
  );
};

export default PlayerDetail;
