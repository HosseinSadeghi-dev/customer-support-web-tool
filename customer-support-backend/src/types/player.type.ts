export interface PlayerDTO {
  id: number;
  name: string;
  isVip?: boolean;
  email?: string;
  discord_username?: string;
  created_at: string;
}

export type PlayersListResponse = PlayerDTO & { tags: string | string[] };
