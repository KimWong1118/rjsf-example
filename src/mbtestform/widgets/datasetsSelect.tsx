import React, { FC, useEffect, useMemo } from "react";
import { styled } from "@mui/material/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { WidgetProps } from "@rjsf/core";
import datasetsService from "api/datasets";
import { ExternalLink } from "uiKit/components/links";
//import Autocomplete, { useStringOptons } from "uiKit/components/autocomplete";
//import useApiService from "uiKit/hooks/useApiService";

type Props = WidgetProps & {
  value?: string;
};

const Wrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  width: "50%",
  margin: "auto"
});

const Preview = styled("div")({
  margin: "0 1em"
});

export const DatasetsSelect: FC<Props> = ({
  value,
  label,
  required,
  disabled,
  onChange
}) => {
  /* const [
        getList,
        { loading, data: datasets },
    ] = useApiService(datasetsService.getList); */

  /* useEffect(() => {
        getList();
    }, [getList]); */

  /* const options = useMemo(
        () => (datasets
            ? [...datasets.data].sort((a, b) => {
                // show recommended datasets first
                if (a.group === 'Recommended') {
                    return -1;
                }

                if (b.group === 'Recommended') {
                    return 1;
                }

                return a.group.localeCompare(b.group);
            })
            : []),
        [datasets],
    ); */

  /* const datasetURI = useMemo(
        () => options.find((dataset) => dataset.name === value)?.value,
        [options, value],
    ); */

  /* const autocompleteProps = useStringOptons({
        options,
        valueKey: 'name',
        labelKey: 'name',
        groupByKey: 'group',
    }); */

  return (
    <Wrapper>
      Autocomplete
      {/* <Autocomplete
        fullWidth
        size="small"
        loading={false}
        label={label}
        value={value}
        onChange={(_, v) => onChange(v)}
        required={required}
        disabled={disabled}
        //{...autocompleteProps}
      /> */}
      {/* {datasetURI && (
                <Preview>
                    <ExternalLink
                        href={`https://github.com/datarobot/mbtest-datasets/blob/master/mbtest_datasets/${datasetURI}`}
                    >
                        <OpenInNewIcon fontSize='small' />
                    </ExternalLink>
                </Preview>
            )} */}
    </Wrapper>
  );
};

export default DatasetsSelect;
