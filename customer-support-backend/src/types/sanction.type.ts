export interface SanctionDTO {
  id: number;
  player_id: number;
  type: string;
  state: SanctionState;
  issued_at: string;
  expires_at?: string;
  revoked_at?: string;
}

export enum SanctionState {
  Active = "active",
  Revoked = "revoked",
  Expired = "expired",
}
