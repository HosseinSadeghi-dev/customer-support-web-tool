import { RequestHandler } from "express";
import {
  addSanction,
  revokeSanction,
  listSanctions,
} from "../models/sanction.model";

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
    console.error("Error adding sanction:", error);
    next(error);
  }
};

export const revokeSanctionHandler: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Sanction ID is required" });
      return;
    }

    revokeSanction(Number(id));
    res.sendStatus(204);
  } catch (error) {
    console.error("Error revoking sanction:", error);
    next(error);
  }
};

export const listSanctionsHandler: RequestHandler = async (req, res, next) => {
  try {
    const { playerId } = req.params;

    if (!playerId) {
      res.status(400).json({ error: "Player ID is required" });
      return;
    }

    const sanctions = listSanctions(playerId);
    res.json(sanctions);
  } catch (error) {
    console.error("Error fetching sanctions:", error);
    next(error);
  }
};
