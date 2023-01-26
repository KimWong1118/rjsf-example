import React, { FC, useState, MouseEvent } from 'react';
import { styled } from '@mui/material/styles';
import {
    MenuItem,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { WidgetProps } from '@rjsf/core';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

type Props = {
    options: Record<string, any>;
} & WidgetProps;

const StyledChipList = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
});

const StyledChip = styled(Chip)({
    margin: 2,
});

export const CustomSelectChip: FC<Props> = ({
    options: { enumOptions = [] },
    label: widgetLabel,
    value: widgetValue = [],
    onChange,
}) => {
    const [open, toggleOpen] = useState<boolean>(false);
    const [newPermission, setPermission] = useState<string>('');

    const handleClose = () => {
        setPermission('');
        toggleOpen(false);
    };

    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        toggleOpen(true);
    };

    const handleSubmit = () => {
        const newValue = [...widgetValue || []];
        const index = newValue.indexOf(newPermission);

        if (index === -1 && newPermission !== '') {
            newValue.push(newPermission);
            onChange(newValue);
        }
        handleClose();
    };

    const handleDelete = (_: MouseEvent, removeItem: string) => {
        const newValue = [...widgetValue || []];
        const index = newValue.indexOf(removeItem);
        if (index > -1) {
            newValue.splice(index, 1);
            onChange(newValue);
        }
    };

    const cloneValue = [...widgetValue];

    enumOptions.map(({ label }: {label: string}) => {
        if (cloneValue.indexOf(label) > -1) {
            cloneValue.splice(cloneValue.indexOf(label), 1);
        }
        return {
            label,
            value: label,
        };
    });

    const dynamicEnum = cloneValue.map((label: string) => ({
        label,
        value: label,
        isAdditional: true,
    }));
    const newEnumOptions = [...enumOptions, ...dynamicEnum];

    return (
        <>
            <Select
                value={widgetValue}
                multiple
                variant='outlined'
                fullWidth
                label={widgetLabel}
                onChange={(event) => onChange(event.target.value)}
                renderValue={(selected: any) => (
                    <StyledChipList>
                        {selected.map((value: string) => (
                            <StyledChip
                                key={value}
                                color={cloneValue.indexOf(value) > -1 ? 'primary' : 'default'}
                                label={value}
                                onDelete={(e: MouseEvent) => handleDelete(e, value)}
                                deleteIcon={(
                                    <HighlightOffIcon
                                        onMouseDown={(e) => e.stopPropagation()}
                                    />
                                )}
                            />
                        ))}
                        <StyledChip
                            onMouseDown={(e: MouseEvent) => handleClick(e)}
                            color='secondary'
                            icon={<AddCircleOutlineIcon />}
                            clickable
                            label='Add'
                        />
                    </StyledChipList>
                )}
            >
                {newEnumOptions.map(({ value, label }) => (
                    <MenuItem
                        key={value}
                        value={value}
                    >
                        {label}
                    </MenuItem>
                ))}
            </Select>
            <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <form onSubmit={handleSubmit}>
                    <DialogTitle id='form-dialog-title'>Add a new permission</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Do you need a permission that not listed by default? Please, add it!
                        </DialogContentText>
                        <TextField
                            id='newPermissionName'
                            autoFocus
                            variant='outlined'
                            size='small'
                            fullWidth
                            margin='normal'
                            value={newPermission}
                            onChange={(event) => setPermission(event.target.value?.toUpperCase())}
                            label='New permission'
                            type='text'
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color='primary'>
                            Cancel
                        </Button>
                        <Button type='submit' color='primary'>
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};
