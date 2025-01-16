import { Chip } from "@mui/material";

interface Props {
  tagName: string;
}

const TagChip: React.FC<Props> = ({ tagName }) => {
  return <Chip label={tagName} variant="outlined" />;
};

export default TagChip;
