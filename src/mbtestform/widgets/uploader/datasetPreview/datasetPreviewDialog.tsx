import React, { FC, ComponentProps, useState, useCallback } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextEditor from "../../../../uiKit/components/loadableTextEditor";

type Props = {
  open: boolean;
  filename?: string;
  onClose: () => void;
} & ComponentProps<typeof TextEditor>;

const DatasetPreviewDialog: FC<Props> = ({
  open,
  value,
  onChange,
  onClose,
  filename
}) => {
  // show preview in readonly mode initially if value is not empty
  const [readOnly, setReadOnly] = useState(Boolean(value));

  const handleEdit = useCallback(() => {
    setReadOnly(false);
  }, []);

  return (
    <Dialog open={open} fullWidth maxWidth="md" onClose={onClose}>
      <DialogTitle>
        Preview <i>{filename}</i>
      </DialogTitle>
      <DialogContent>
        <DialogContentText component="div">
          <pre>{value}</pre>
          {/* <TextEditor
            mode="yaml"
            readOnly={readOnly}
            value={value}
            onChange={onChange}
          /> */}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {readOnly && (
          <Button color="secondary" variant="contained" onClick={handleEdit}>
            Edit
          </Button>
        )}
        <Button color="primary" variant="contained" autoFocus onClick={onClose}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DatasetPreviewDialog;
