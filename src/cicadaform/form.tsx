import React, { FC, useState, useCallback, memo } from "react";
import { IChangeEvent, ISubmitEvent, UiSchema } from "@rjsf/core";
import { MuiForm5 as MuiForm } from "@rjsf/material-ui";
//import { CicadaTestIn } from "api/cicadaTests";
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
  test_options: {
    "ui:ObjectFieldTemplate": ObjectFieldTemplateSubSection,
    expanded: true
  },
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

  "ui:order": [
    "description",
    "test_type",
    "test_status",
    "start_time",
    "cicada_sha",
    "test_options",
    "cluster_options",
    "tags",
    "*"
  ]
};

type Props = {
  title?: string;
  initialData?: (() => Partial<CicadaTestIn>) | Partial<CicadaTestIn>;
  schema: Record<string, any>;
  onChange?: (data: CicadaTestIn) => void;
  onSubmit?: (data: CicadaTestIn) => void;
};

export const CicadaTestParamsForm: FC<Props> = memo(
  ({ title, initialData, schema, onChange, onSubmit, children }) => {
    const [data, setFormData] = useState<Partial<CicadaTestIn> | undefined>(
      initialData
    );

    const handleChange = useCallback(
      ({ formData }: IChangeEvent<CicadaTestIn>) => {
        const newFormData = { ...formData };

        setFormData(newFormData);

        if (onChange) {
          onChange(newFormData);
        }
      },
      [onChange]
    );

    const handleSubmit = useCallback(
      ({ formData }: ISubmitEvent<CicadaTestIn>) => {
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

export default CicadaTestParamsForm;
