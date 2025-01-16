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

interface GetPlayersRequest {
  search?: string;
  page: number;
  pageSize: number;
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

export const listPlayersHandler = (
  req: Request<{}, {}, {}, GetPlayersRequest>,
  res: Response
) => {
  const players = listPlayers(
    req.query.search,
    req.query.page,
    req.query.pageSize
  );
  res.json(players);
};

export const playerDetailHandler = (req: Request, res: Response) => {
  try {
    const players = getPlayerById(req.params.id);
    res.status(200).json(players);
  } catch (error) {
    console.error("error", error);
  }
};
