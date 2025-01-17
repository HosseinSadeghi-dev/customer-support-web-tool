import { Request, RequestHandler } from "express";
import {
  addSanction,
  revokeSanction,
  listSanctions,
} from "../models/sanction.model";
import { logger } from "../config/logger";

interface GetPlayerSanctionsRequest {
  page: number;
  pageSize: number;
}

export const addSanctionHandler: RequestHandler = async (req, res, next) => {
  try {
    const { playerId, type, expiresAt } = req.body;

    if (!playerId || !type) {
      res.status(400).json({ error: "playerId and type are required" });
      return;
    }

    const id = addSanction(playerId, type, expiresAt || null);
    res.status(201).json({ id });
  } catch (error) {
    logger.error("Error adding sanction:", error);
    next(error);
  }
};

export const revokeSanctionHandler = async (
  req: Request<{ id: string }>,
  res,
  next
) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Sanction ID is required" });
      return;
    }

    revokeSanction(id);
    res.sendStatus(204);
  } catch (error) {
    logger.error("Error revoking sanction:", error);
    next(error);
  }
};

export const listSanctionsHandler = async (
  req: Request<{ playerId: string }, {}, {}, GetPlayerSanctionsRequest>,
  res,
  next
) => {
  try {
    const { playerId } = req.params;

    if (!playerId) {
      res.status(400).json({ error: "Player ID is required" });
      return;
    }

    const sanctions = listSanctions(
      playerId,
      req.query.page,
      req.query.pageSize
    );
    res.json(sanctions);
  } catch (error) {
    logger.error("Error fetching sanctions:", error);
    next(error);
  }
};
