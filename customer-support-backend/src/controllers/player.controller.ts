import { Request, Response } from "express";
import {
  createPlayer,
  editPlayer,
  getPlayerById,
  listPlayers,
} from "../models/player.model";

interface CreatePlayerRequestBody {
  name: string;
  tags: string[];
  isVip?: boolean;
  email?: string;
  discordUsername?: string;
}

interface EditPlayerRequestBody extends CreatePlayerRequestBody {
  id: number;
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
  const { name, tags, isVip, email, discordUsername } = req.body;
  try {
    const id = createPlayer(name, tags, isVip, email, discordUsername);
    res.status(201).json({ id });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error });
  }
};

export const editPlayerHandler = (
  req: Request<{}, {}, EditPlayerRequestBody>,
  res: Response
) => {
  const { id, name, tags, isVip, email, discordUsername } = req.body;
  try {
    editPlayer(id, name, tags, isVip, email, discordUsername);
    res.status(201).json({});
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
  const players = getPlayerById(req.params.id);
  res.status(200).json(players);
};
