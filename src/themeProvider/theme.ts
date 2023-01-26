import { createTheme, alpha } from '@mui/material/styles';
import {
    common,
    blue,
    green,
    red,
    yellow,
    grey,
} from '@mui/material/colors';

export default createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    palette: {
        primary: {
            main: blue[800],
            light: '#5e92f3',
            dark: '#003c8f',
            contrastText: common.white,
        },
        secondary: {
            main: red[700],
            light: '#ff6659',
            dark: '#9a0007',
            contrastText: common.white,
        },
        success: {
            main: green[500],
        },
        error: {
            main: red[500],
        },
        warning: {
            main: yellow[700],
            light: '#fff263',
            dark: '#c49000',
            contrastText: common.black,
        },
        neutral: {
            main: grey[400],
        },
    },
    typography: {
        fontFamily: 'inherit',
        button: {
            fontFamily: 'inherit',
            textTransform: 'none',
            fontWeight: 'normal',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    margin: 0,
                    backgroundColor: '#fff',
                    color: alpha('#000', 0.87),
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                    fontSize: '0.875rem',
                    lineHeight: 1.43,
                    fontWeight: 400,
                },
                svg: {
                    verticalAlign: 'middle',
                },
                button: {
                    fontFamily: 'inherit',
                },
                input: {
                    fontFamily: 'inherit',
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',

                    '&:hover': {
                        textDecoration: 'underline',
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    lineHeight: '1.1876em',
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    height: 'auto',
                    fontSize: '0.875rem',
                },
                inputSizeSmall: {
                    paddingTop: 8.5,
                    paddingBottom: 8.5,
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem',
                },
                outlined: {
                    '&.MuiInputLabel-sizeSmall': {
                        transform: 'translate(14px, 7px) scale(1)',
                    },
                    '&.MuiInputLabel-shrink': {
                        transform: 'translate(14px, -8px) scale(0.8)',
                    },
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                inputRoot: {
                    '&[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-inputSizeSmall"]': {
                        paddingTop: 4,
                        paddingBottom: 4,
                    },
                },
                option: {
                    fontSize: '0.875rem',
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    minHeight: '1.1876em',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem',
                },
            },
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: 'text', color: 'neutral' },
                    style: ({ theme }) => ({
                        color: theme.palette.text.primary,
                        '&:hover': {
                            backgroundColor: alpha(
                                theme.palette.text.primary,
                                theme.palette.action.hoverOpacity,
                            ),
                        },
                    }),
                },
                {
                    props: { variant: 'contained', color: 'neutral' },
                    style: ({ theme }) => ({
                        color: theme.palette.getContrastText(theme.palette.grey[300]),
                        backgroundColor: theme.palette.grey[300],
                    }),
                },
                {
                    props: { variant: 'outlined', color: 'neutral' },
                    style: ({ theme }) => ({
                        color: theme.palette.text.primary,
                        borderColor: theme.palette.mode === 'light'
                            ? 'rgba(0, 0, 0, 0.23)'
                            : 'rgba(255, 255, 255, 0.23)',
                        '&.Mui-disabled': {
                            border: `1px solid ${theme.palette.action.disabledBackground}`,
                        },
                        '&:hover': {
                            borderColor: theme.palette.mode === 'light'
                                ? 'rgba(0, 0, 0, 0.23)'
                                : 'rgba(255, 255, 255, 0.23)',
                            backgroundColor: alpha(
                                theme.palette.text.primary,
                                theme.palette.action.hoverOpacity,
                            ),
                        },
                    }),
                },
            ],
        },
        MuiIconButton: {
            styleOverrides: {
                sizeSmall: {
                    padding: 3,
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                spacing: {
                    '& > :not(:first-child)': {
                        marginLeft: 8,
                    },
                },
            },
        },
    },
});
