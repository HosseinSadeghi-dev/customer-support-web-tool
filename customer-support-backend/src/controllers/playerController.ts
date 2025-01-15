import { Request, Response } from 'express';
import { createPlayer, getPlayerById, listPlayers } from '../models/playerModel';

export const createPlayerHandler = (req: Request, res: Response) => {
  const { name, tag } = req.body;
  const id = createPlayer(name, tag);
  res.status(201).json({ id });
};

export const listPlayersHandler = (_req: Request, res: Response) => {
  const players = listPlayers();
  res.json(players);
};
