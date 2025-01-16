import { Request, Response } from "express";
import {
  createPlayer,
  getPlayerById,
  listPlayers,
} from "../models/player.model";

interface CreatePlayerRequestBody {
  name: string;
  tags: string[];
}

export const createPlayerHandler = (
  req: Request<{}, {}, CreatePlayerRequestBody>,
  res: Response
) => {
  const { name, tags } = req.body;
  const id = createPlayer(name, tags);
  res.status(201).json({ id });
};

export const listPlayersHandler = (_req: Request, res: Response) => {
  const players = listPlayers();
  res.json(players);
};
