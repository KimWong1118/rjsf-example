import React, { FC, useEffect, useCallback } from "react";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import { WidgetProps } from "@rjsf/core";
//import mbtestsService from 'api/mbtests';
import ErrorMessage from "uiKit/components/errorMessage";
import useApiService from "uiKit/hooks/useApiService";
import DatasetPreview from "./datasetPreview";

const customFilename = "new.yaml";

const StyledFormControl = styled(FormControl)({
  textAlign: "center"
});

const IncompleteUploader: FC<WidgetProps> = ({
  value,
  onChange,
  formContext: { mbtestId }
}) => {
  const [filename, filedata] = value?.split(/:::/g) ?? [];
  /* const [
        getIncompleteProjects,
        { loading, error },
    ] = useApiService(
        mbtestsService.getIncompleteProjects,
        {
            onCompleted: (text) => {
                onChange(`incomplete_projects:::${text}`);
            },
        },
    ); */

  const handleChange = useCallback(
    (val: string) => {
      onChange(`${customFilename}:::${val}`);
    },
    [onChange]
  );

  /* useEffect(() => {
        getIncompleteProjects(mbtestId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); */

  return (
    <StyledFormControl fullWidth margin="normal">
      {/* {error && <ErrorMessage message={error.toString()} />} */}
      <div>
        <DatasetPreview
          loading={false}
          filename={filename}
          value={filedata}
          onChange={handleChange}
        />
      </div>
    </StyledFormControl>
  );
};

export default IncompleteUploader;
