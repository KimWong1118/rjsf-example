import React, { FC, ChangeEvent, useCallback } from "react";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import PublishIcon from "@mui/icons-material/Publish";
import { WidgetProps } from "@rjsf/core";
import DatasetPreview from "./datasetPreview";

const customFilename = "new.yaml";

const StyledFormControl = styled(FormControl)({
  textAlign: "center"
});

const StyledPreview = styled("div")({
  marginTop: "1em"
});

const CustomUploader: FC<WidgetProps> = ({ id, value, onChange }) => {
  const [filename, filedata] = value?.split(/:::/g) ?? [];

  const handleUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const result = e.target?.result;
          const fileSorce =
            file.name && result ? `${file.name}:::${result}` : undefined;
          onChange(fileSorce);
        };
        reader.readAsText(file);
      }
    },
    [onChange]
  );

  const handleChange = useCallback(
    (val: string) => {
      onChange(`${customFilename}:::${val}`);
    },
    [onChange]
  );

  return (
    <StyledFormControl fullWidth margin="normal">
      <div>
        <input
          // assign key to rerender file input when content changed,
          // because file input doesn't react on a second upload of the same file
          key={filename}
          id={id}
          hidden
          accept=".yaml"
          onChange={handleUpload}
          type="file"
        />
        <label htmlFor={id}>
          <Button
            variant="contained"
            color="neutral"
            component="span"
            size="small"
          >
            <PublishIcon />
            Upload
          </Button>
        </label>
      </div>
      <StyledPreview>
        <DatasetPreview
          filename={filename}
          value={filedata}
          onChange={handleChange}
        />
      </StyledPreview>
    </StyledFormControl>
  );
};

export default CustomUploader;
