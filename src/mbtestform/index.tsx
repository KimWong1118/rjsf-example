import React, { FC, useState, useCallback, memo } from "react";
import { IChangeEvent, ISubmitEvent, UiSchema } from "@rjsf/core";
import { MuiForm5 as MuiForm } from "@rjsf/material-ui";
import { MBTestIn } from "api/mbtests";
import {
  CustomInput,
  CustomSelect,
  CustomSelectChip,
  CustomUploader,
  IncompleteUploader,
  SelectDatasets,
  CustomToggle,
  ObjectFieldTemplate,
  ObjectFieldTemplateSubSection,
  ObjectFieldTemplateGroupExpandable,
  CustomFieldTemplate,
  SelectTags
} from "../mbtestform/widgets";

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
    "ui:order": ["datasets", "additional_permissions", "*"],
    grid: [4, ["datasets", "additional_permissions"]],
    maxCols: 4,
    expanded: true,
    //columns: [4, ['datasets', 12], ['additional_permissions', 12]],
    columns: {
      "*": 4,
      datasets: 12,
      additional_permissions: 12
    },

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

type Props = {
  title?: string;
  initialData?: (() => Partial<MBTestIn>) | Partial<MBTestIn>;
  schema: Record<string, any>;
  onChange?: (data: MBTestIn) => void;
  onSubmit?: (data: MBTestIn) => void;
};

export const MbtestParamsFormV2: FC<Props> = memo(
  ({ title, initialData, schema, onChange, onSubmit, children }) => {
    const [data, setFormData] = useState<Partial<MBTestIn> | undefined>(
      initialData
    );

    const handleChange = useCallback(
      ({ formData }: IChangeEvent<MBTestIn>) => {
        const newFormData = { ...formData };

        setFormData(newFormData);

        if (onChange) {
          onChange(newFormData);
        }
      },
      [onChange]
    );

    const handleSubmit = useCallback(
      ({ formData }: ISubmitEvent<MBTestIn>) => {
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

    return (
      <div>
        <div>{title}</div>
        <MuiForm
          noHtml5Validate
          formData={data}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onError={handleError}
          schema={schema}
          uiSchema={uiSchema}
          widgets={widgets}
          FieldTemplate={CustomFieldTemplate}
          ObjectFieldTemplate={ObjectFieldTemplate}
          showErrorList={false}
        >
          {children}
        </MuiForm>
      </div>
    );
  }
);

export default MbtestParamsFormV2;
