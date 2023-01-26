import React, { FC, useEffect, ChangeEvent } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import classes from "classnames";
import styles from "./styles.module.scss";

type CustomOption = {
  title: string;
  value: string;
};

type Props = {
  value: string[];
  options: (string | CustomOption)[];
  onChange: (value: any) => void;
};

export const TagsWidget: FC<Props> = ({
  value = [],
  onChange,
  options = ["tag"]
}) => {
  const filter = createFilterOptions<string | CustomOption>();
  const handleChange = (
    _: ChangeEvent<{}>,
    params: (string | CustomOption)[]
  ) => {
    const newValue = params.map((tag) =>
      typeof tag === "string" ? tag : tag.value ? tag.value : ""
    );

    onChange(newValue);
  };

  return (
    <Autocomplete
      className={classes(styles.autoSelect, styles.gutterBottom)}
      size="small"
      multiple
      options={options}
      value={value}
      renderOption={(props, option) => (
        <li {...props}>
          {typeof option === "string"
            ? option
            : option.title
            ? option.title
            : option}
        </li>
      )}
      onChange={(event, params) => handleChange(event, params)}
      filterOptions={(opts, params) => {
        const filtered = filter(opts, params);
        if (params.inputValue !== "" && filtered.length === 0) {
          filtered.push({
            value: params.inputValue,
            title: `Add "${params.inputValue}"`
          });
        }
        return filtered;
      }}
      renderTags={(values, getTagProps) =>
        values.map((option, index) => (
          <Chip
            variant="outlined"
            label={option}
            size="small"
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          name="tags"
          variant="outlined"
          size="small"
          label="Tags"
          placeholder="Add tags"
        />
      )}
    />
  );
};

export default TagsWidget;
