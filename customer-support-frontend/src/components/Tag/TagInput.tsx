import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import api from "../../services/api";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props {
  onTagsChange: (tags: string[]) => void;
}

const TagsInput: React.FC<Props> = ({ onTagsChange }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try {
        const response = await api.get("/tags");
        setTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={tags}
      disableCloseOnSelect
      freeSolo
      loading={loading}
      getOptionLabel={(option: string) => option}
      onChange={(_, value) => onTagsChange(value)}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </li>
        );
      }}
      style={{ width: "400px" }}
      renderInput={(params) => (
        <TextField {...params} label="Tags" placeholder="Call Of Duty" />
      )}
    />
  );
};

export default TagsInput;
