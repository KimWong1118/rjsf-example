import React, { FunctionComponent, ReactNode } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { WidgetProps } from '@rjsf/core';

type TOptions = {
    options: Record<string, any>;
}

export const CustomSelect: FunctionComponent<WidgetProps & TOptions> = ({
    id,
    value,
    label,
    required,
    disabled,
    autofocus,
    options: { enumOptions },
    onChange,
}) => (
    <TextField
        id={id}
        label={label}
        value={value}
        rows={2}
        variant='outlined'
        size='small'
        fullWidth
        onChange={(event) => onChange(event.target.value)}
        required={required}
        disabled={disabled}
        autoFocus={autofocus}
        margin='normal'
        select
    >
        {enumOptions.map((name: { value: string; label: ReactNode }) => (
            <MenuItem key={name.value} value={name.value}>
                {name.label}
            </MenuItem>
        ))}
    </TextField>
);
