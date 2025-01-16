export interface PlayerDTO {
  id: number;
  name: string;
  created_at: string;
}

export type PlayersListResponse = PlayerDTO & { tags: string | string[] };
