import React, { FC, ReactElement, memo } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FormHelperText from '@mui/material/FormHelperText';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import { FieldTemplateProps } from '@rjsf/core';

type Props = {
    rawErrors: string[];
    rawHelp: string;
    rawDescription: string;
    children: ReactElement;
};

const createMarkup = (html: string) => ({ __html: html });

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.grey.A100,
        color: theme.palette.text.primary,
        border: '1px solid #dadde9',
    },
}));

const DescriptionIcon = styled(ContactSupportOutlinedIcon)({
    alignSelf: 'flex-start',
    marginTop: 4,
    fontSize: '0.8rem',
    color: 'rgba(0, 0, 0, 0.23)',
});

const FieldTemplate: FC<Props> = memo(({
    rawErrors,
    children,
    rawHelp,
}) => (
    <FormControl
        fullWidth
        error={!!rawErrors.length}
    >
        {children}
        {rawErrors.length > 0
            && (
                <List dense>
                    {rawErrors.map((error) => (
                        <ListItem key={error}>
                            <FormHelperText>
                                -
                                {error}
                            </FormHelperText>
                        </ListItem>
                    ))}
                </List>
            )}
        {rawHelp && <FormHelperText>{rawHelp}</FormHelperText>}
    </FormControl>
));

export const CustomFieldTemplate: FC<FieldTemplateProps> = ({
    rawErrors = [],
    rawDescription,
    rawHelp,
    children,
    schema,
}) => {
    const { description: tooltip } = schema;

    return (
        (tooltip && schema.type !== 'object')
            ? (
                <Box display='flex' mb='10px'>
                    <FieldTemplate
                        rawErrors={rawErrors}
                        rawDescription={rawDescription}
                        rawHelp={rawHelp}
                    >
                        {children}
                    </FieldTemplate>
                    <HtmlTooltip
                        arrow
                        placement='left'
                        // eslint-disable-next-line react/no-danger
                        title={<div dangerouslySetInnerHTML={createMarkup(tooltip)} />}
                    >
                        <DescriptionIcon fontSize='small' />
                    </HtmlTooltip>
                </Box>
            )
            : (
                <FieldTemplate
                    rawErrors={rawErrors}
                    rawDescription={rawDescription}
                    rawHelp={rawHelp}
                >
                    {children}
                </FieldTemplate>
            )
    );
};
