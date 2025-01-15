import { RequestHandler } from 'express';
import { addSanction, revokeSanction, listSanctions } from '../models/sanctionModel';

// Handler to add a new sanction
export const addSanctionHandler: RequestHandler = async (req, res, next) => {
  try {
    const { playerId, type, expiresAt } = req.body;

    // Validate required fields
    if (!playerId || !type) {
      res.status(400).json({ error: 'playerId and type are required' });
      return;
    }

    // Add sanction to the database
    const id = addSanction(Number(playerId), type, expiresAt || null);
    res.status(201).json({ id });
  } catch (error) {
    console.error('Error adding sanction:', error);
    next(error); // Pass the error to the centralized error handler
  }
};

// Handler to revoke an existing sanction
export const revokeSanctionHandler: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate the sanction ID
    if (!id) {
      res.status(400).json({ error: 'Sanction ID is required' });
      return;
    }

    // Revoke sanction in the database
    revokeSanction(Number(id));
    res.sendStatus(204); // No Content
  } catch (error) {
    console.error('Error revoking sanction:', error);
    next(error); // Pass the error to the centralized error handler
  }
};

// Handler to list all sanctions for a player
export const listSanctionsHandler: RequestHandler = async (req, res, next) => {
  try {
    const { playerId } = req.params;

    // Validate the player ID
    if (!playerId) {
      res.status(400).json({ error: 'Player ID is required' });
      return;
    }

    // Fetch sanctions for the player
    const sanctions = listSanctions(Number(playerId));
    res.json(sanctions);
  } catch (error) {
    console.error('Error fetching sanctions:', error);
    next(error); // Pass the error to the centralized error handler
  }
};
