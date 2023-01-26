import React, { FC } from 'react';
import TextField from '@mui/material/TextField';
import { WidgetProps } from '@rjsf/core';

export const CustomInput: FC<WidgetProps> = ({
    id,
    value,
    label,
    required,
    disabled,
    autofocus,
    options: { rows = 1 },
    onChange,
    placeholder,
}) => (
    <TextField
        id={id}
        label={label}
        value={value || ''}
        rows={(typeof rows === 'number' ? rows : 1)}
        multiline={(typeof rows === 'number' ? rows > 1 : false)}
        placeholder={placeholder}
        variant='outlined'
        size='small'
        fullWidth
        onChange={(event) => onChange(event.target.value)}
        required={required}
        disabled={disabled}
        autoFocus={autofocus}
        margin='normal'
    />
);
