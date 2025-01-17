import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  type: string;
  size: "small" | "medium";
  placeholder: string;
  label: string;
  onTextChange: (text: string) => void;
}

const DebounceInput: React.FC<Props> = ({
  type,
  size,
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
      size={size}
      placeholder={placeholder}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        },
      }}
      value={searchInputText}
      onChange={(e) => setSearchInputText(e.target.value)}
    />
  );
};

export default DebounceInput;
