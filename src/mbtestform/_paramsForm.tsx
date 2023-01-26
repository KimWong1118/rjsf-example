import React, { FC, useState, useCallback, memo } from "react";
import { IChangeEvent, ISubmitEvent, UiSchema, AjvError } from "@rjsf/core";
import { MuiForm5 as MuiForm } from "@rjsf/material-ui";
import {
  IMBTestSchema,
  IPredefinedDataset,
  IUploadedDataset,
  IIncompleteProjectsDataset
} from "../api/mbtests";
import {
  CustomInput,
  CustomSelect,
  CustomSelectChip,
  CustomUploader,
  IncompleteUploader,
  SelectDatasets,
  CustomToggle,
  ObjectFieldTemplate,
  CustomFieldTemplate,
  ObjectFieldTemplateSubSection,
  ObjectFieldTemplateGroupExpandable,
  SelectTags
} from "./widgets";

const widgets = {
  // Overide widgets
  TextWidget: CustomInput,
  SelectWidget: CustomSelect,

  // Custom widgets
  toggle: CustomToggle,
  uploader: CustomUploader,
  incomplete: IncompleteUploader,
  datasets: SelectDatasets,
  permissions: CustomSelectChip
};

const fields = {
  tags: SelectTags
};

const uiSchema: UiSchema = {
  cluster_options: {
    "ui:widget": "toggle",
    "ui:ObjectFieldTemplate": ObjectFieldTemplateSubSection,
    expanded: true,

    artifact: {
      "ui:widget": "toggle",
      "ui:ObjectFieldTemplate": ObjectFieldTemplateSubSection,
      expanded: true
    },

    options: {
      "ui:widget": "toggle",
      "ui:ObjectFieldTemplate": ObjectFieldTemplateSubSection,
      expanded: true
    }
  },

  tags: {
    "ui:field": SelectTags
  },

  test_options: {
    "ui:widget": "toggle",
    "ui:ObjectFieldTemplate": ObjectFieldTemplateSubSection,
    maxCols: 4,
    expanded: true,
    foo: "2 2",

    datasets: {
      "ui:widget": "toggle",
      "ui:ObjectFieldTemplate": ObjectFieldTemplateSubSection,
      expanded: true
    },

    profit_curve_top_n_models: {
      "ui:widget": "updown"
    },
    feature_impact_top_n_models: {
      "ui:widget": "updown"
    },
    prime_options: {
      "ui:ObjectFieldTemplate": ObjectFieldTemplateGroupExpandable,
      strategy_n: {
        "ui:widget": "updown"
      }
    },
    model_deployment_testing_options: {
      "ui:ObjectFieldTemplate": ObjectFieldTemplateGroupExpandable
    },
    autopilot_run_options: {
      "ui:ObjectFieldTemplate": ObjectFieldTemplateGroupExpandable,
      min_secondary_validation_model_count: {
        "ui:widget": "updown"
      }
    },
    autopilot_rerun_options: {
      "ui:ObjectFieldTemplate": ObjectFieldTemplateGroupExpandable
    },
    time_series_options: {
      "ui:ObjectFieldTemplate": ObjectFieldTemplateGroupExpandable
    },
    shap_options: {
      "ui:ObjectFieldTemplate": ObjectFieldTemplateGroupExpandable
    },
    image_augmentation_options: {
      "ui:ObjectFieldTemplate": ObjectFieldTemplateGroupExpandable
    },
    feature_impact_sample_size: {
      "ui:widget": "updown"
    },
    prediction_consistency_options: {
      "ui:ObjectFieldTemplate": ObjectFieldTemplateGroupExpandable,
      prediction_consistency_drivers: {
        "ui:ObjectFieldTemplate": ObjectFieldTemplateGroupExpandable
      }
    },
    additional_permissions: {
      "ui:ObjectFieldTemplate": ObjectFieldTemplateSubSection,
      "ui:widget": "permissions"
    }
  },

  "ui:order": ["description", "tags", "cluster_options", "test_options", "*"]
};

type FormContext = {
  mbtestId?: string;
};

type Props = {
  title?: string;
  initialData: (() => IMBTestSchema) | IMBTestSchema;
  schema: Record<string, any>;
  formContext?: FormContext;
  onChange?: (data: IMBTestSchema) => void;
  onSubmit?: (data: IMBTestSchema) => void;
};

const isUploadedDataset = (
  test: IPredefinedDataset | IUploadedDataset | IIncompleteProjectsDataset
): test is IUploadedDataset => test.type === "upload";

const isIncompleteProjectsDataset = (
  test: IPredefinedDataset | IUploadedDataset | IIncompleteProjectsDataset
): test is IIncompleteProjectsDataset => test.type === "incomplete";

export const MbtestParamsForm: FC<Props> = memo(
  ({
    title,
    initialData,
    schema,
    formContext,
    onChange,
    onSubmit
    //children
  }) => {
    const [data, setFormData] = useState<IMBTestSchema>(initialData);

    const handleChange = useCallback(
      ({ formData }: IChangeEvent<IMBTestSchema>) => {
        const newFormData = { ...formData };
        const { datarobot_release_version } = data ?? {};
        const { datasetParams } = newFormData;

        /* if (isUploadedDataset(datasetParams)) {
          const [filename, filedata] =
            datasetParams.dataset_list_and_config_name?.split(/:::/g) ?? [];
          datasetParams.original_dataset_list_config_name = filename;
          datasetParams.dataset_list_data = filedata;
        } else if (isIncompleteProjectsDataset(datasetParams)) {
          const [filename, filedata] =
            datasetParams.incomplete_dataset_list_and_config_name?.split(
              /:::/g
            ) ?? [];
          datasetParams.original_dataset_list_config_name = filename;
          datasetParams.dataset_list_data = filedata;
        }

        if (
          newFormData.datarobot_release_version !== datarobot_release_version
        ) {
          newFormData.datarobot_commit = newFormData.datarobot_release_version;
          newFormData.shrink_sha = newFormData.datarobot_release_version;
        } */

        setFormData(newFormData);

        if (onChange) {
          onChange(newFormData);
        }
      },
      [data, onChange]
    );

    const handleSubmit = useCallback(
      ({ formData }: ISubmitEvent<IMBTestSchema>) => {
        if (onSubmit) {
          onSubmit(formData);
        }
      },
      [onSubmit]
    );

    const handleError = useCallback((e: Error) => {
      // @TODO handle form errors
      // eslint-disable-next-line no-console
      console.error(e);
    }, []);

    // Omit some form errors
    const transformErrors = useCallback(
      (errors: AjvError[]) =>
        errors.filter(
          (error) =>
            error.property.indexOf(".permissions.additional_permissions") ===
              -1 &&
            error.property.indexOf(".MBTestParams.concurrent_projects") ===
              -1 &&
            error.property.indexOf(".datarobot_release_version") === -1
        ),
      []
    );

    return (
      <div>
        <div>{title}</div>
        <MuiForm
          formContext={formContext}
          formData={data}
          onChange={handleChange}
          onSubmit={handleSubmit}
          schema={schema}
          uiSchema={uiSchema}
          widgets={widgets}
          fields={fields}
          FieldTemplate={CustomFieldTemplate}
          ObjectFieldTemplate={ObjectFieldTemplate}
          transformErrors={transformErrors}
          onError={handleError}
          showErrorList={false}
        >
          {/* {children} */}
        </MuiForm>
      </div>
    );
  }
);

export default MbtestParamsForm;
