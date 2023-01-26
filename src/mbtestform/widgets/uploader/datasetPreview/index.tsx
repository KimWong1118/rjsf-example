import React, { FC, ComponentProps } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import useToggle from "../../../../uiKit/hooks/useToggle";
import DatasetPreviewDialog from "./datasetPreviewDialog";

type Props = Omit<
  ComponentProps<typeof DatasetPreviewDialog>,
  "open" | "onClose"
> & {
  filename?: string;
};

const StyledButton = styled(Button)({
  minWidth: "10em"
});

const DatasetPreview: FC<Props> = ({ loading, filename, value, onChange }) => {
  const [open, toggleOpen] = useToggle(false);

  return (
    <div>
      <StyledButton
        color="neutral"
        disabled={loading}
        variant="outlined"
        onClick={toggleOpen}
      >
        {loading ? "Loading" : value ? `Preview ${filename}` : "No file chosen"}
      </StyledButton>
      {/* mount dialog on open to reset initial state */}
      {open && (
        <DatasetPreviewDialog
          open={open}
          filename={filename}
          value={value}
          onChange={onChange}
          onClose={toggleOpen}
        />
      )}
    </div>
  );
};

export default DatasetPreview;
