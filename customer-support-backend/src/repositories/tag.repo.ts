export interface TagDTO {
  id: number;
  name: string;
}

export const createTagsTable = `
  CREATE TABLE IF NOT EXISTS Tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  );
`;
