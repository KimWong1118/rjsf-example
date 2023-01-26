import React, { FC } from 'react';
import { FieldProps } from '@rjsf/core';
import TagsWidget from './tagsWidget';

const SelectTags: FC<FieldProps<string>> = ({
    onChange,
    formData,
}) => {
    const data = Array.isArray(formData) ? formData : [];

    return (
        <TagsWidget
            value={data}
            onChange={onChange}
        />
    );
};
export default SelectTags;
