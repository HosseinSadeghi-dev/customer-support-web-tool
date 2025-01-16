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
  try {
    const id = createPlayer(name, tags);
    res.status(201).json({ id });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error });
  }
};

export const listPlayersHandler = (_req: Request, res: Response) => {
  const players = listPlayers();
  res.json(players);
};
