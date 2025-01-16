export interface Sanction {
  id: number;
  playerId: number;
  type: SanctionTypes;
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

export enum SanctionTypes {
  FullBan = "Full Ban",
  HalfBan = "Half Ban",
  ChatMute = "Chat Mute",
}
