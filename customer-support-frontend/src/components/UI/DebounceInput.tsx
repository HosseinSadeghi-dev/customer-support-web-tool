import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  type: string;
  placeholder: string;
  label: string;
  onTextChange: (text: string) => void;
}

const DebounceInput: React.FC<Props> = ({
  type,
  placeholder,
  label,
  onTextChange,
}) => {
  const [searchInputText, setSearchInputText] = useState<string>("");

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      onTextChange(searchInputText);
    }, 500);
    return () => {
      clearTimeout(delayInputTimeoutId);
    };
  }, [searchInputText, onTextChange]);

  return (
    <TextField
      label={label}
      variant="outlined"
      type={type}
      placeholder={placeholder}
      value={searchInputText}
      onChange={(e) => setSearchInputText(e.target.value)}
    />
  );
};

export default DebounceInput;
