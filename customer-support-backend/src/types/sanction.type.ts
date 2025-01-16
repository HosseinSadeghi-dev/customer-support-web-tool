export interface SanctionDTO {
  id: number;
  player_id: number;
  type: string;
  state: SanctionState;
  issuedAt: string;
  expiresAt?: string;
  revokedAt?: string;
}

export enum SanctionState {
  Active = "active",
  Revoked = "revoked",
  Expired = "expired",
}
