import { createMuiTheme } from '@material-ui/core';

const colorsScheme = {
    primary: {
        main: '#2E2E2E',
    },
    secondary: {
        main: '#fff',
        dark: '#fff',
        light: '#fff',
    },
    error: {
        main: '#E63F28',
    },
    success: {
        main: '#379862',
    },
    text: {
        primary: '#000',
        secondary: '#898989',
        disabled: '#eeeeee',
    },
};

const mainTheme = createMuiTheme({
    shape: {
        borderRadius: 12,
    },
    spacing: (factor) => `${0.25 * factor}rem`, // (Bootstrap strategy)
    palette: {
        type: 'light',
        primary: {
            main: colorsScheme.primary.main,
        },
        secondary: {
            main: colorsScheme.secondary.main,
            dark: colorsScheme.secondary.dark,
            light: colorsScheme.secondary.light,
        },
        success: {
            main: '#04BF00',
        },
        error: {
            main: '#FF5555',
        },
        warning: {
            main: '#F2994A',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
        text: {
            primary: colorsScheme.text.primary,
            secondary: colorsScheme.text.secondary,
            disabled: colorsScheme.text.disabled,
        },
        background: {
            default: '#fff',
        },
    },
    typography: {
        fontFamily: ['Raleway', 'TitilliumWeb', 'Montserrat'].join(','),

        h1: {
            fontFamily: 'Raleway',
            fontWeight: 'lighter',
            fontSize: 60,
        },

        h2: {
            fontFamily: 'Raleway',
            fontWeight: 'normal',
            fontSize: 48,
        },

        h3: {
            fontFamily: 'Raleway',
            fontWeight: 'normal',
            fontSize: 34,
        },
        h4: {
            fontFamily: 'Raleway',
            fontWeight: 'normal',
            fontSize: 24,
        },
        h5: {
            fontFamily: 'Raleway',
            fontWeight: 'bold',
            fontSize: 20,
        },

        h6: {
            fontFamily: 'Raleway',
            fontWeight: 'normal',
            fontSize: 12,
        },
        body1: {
            fontSize: 16,
            lineHeight: '120%',
            fontFamily: 'Raleway',
        },
        body2: {
            fontSize: 14,
            lineHeight: '120%',
            fontFamily: 'Raleway',
            color: '#2E2E2E',
        },
        subtitle1: {
            fontSize: 24,
            fontFamily: 'Raleway',
            lineHeight: '120%',
            color: '#898989',
            fontWeight: 'bold',
        },

        subtitle2: {
            fontSize: 16,
            fontWeight: 'bold',
            lineHeight: '120%',
            fontFamily: 'Raleway',
            color: '#898989',
        },

        button: {
            fontFamily: 'Raleway',
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: 18,
            color: '#2E2E2E',
        },
        caption: {
            fontSize: 24,
            lineHeight: '120%',
            fontWeight: 'normal',
            fontFamily: 'Raleway',
        },
        overline: {
            fontSize: 24,
            lineHeight: '120%',
            fontWeight: 'bold',
            fontFamily: 'Raleway',
            textTransform: 'uppercase',
        },
    },
    overrides: {
        MuiButton: {
            contained: {
                backgroundColor: 'white',
            },
            containedSizeLarge: {
                fontSize: 18,
            },
            containedPrimary: {
                backgroundColor: 'black',
            },
        },

        MuiCard: {
            root: {
                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
            },
        },

        MuiPaper: {
            root: {
                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
            },
        },

        MuiDialogActions: {
            root: {
                paddingBottom: '1rem',
                justifyContent: 'center',
            },
        },

        MuiFormHelperText: {
            root: {
                fontSize: '1rem',
            },
        },

        MuiInputLabel: {
            root: {
                fontFamily: 'Titillium Web',
                fontWeight: 'normal',
                lineHeight: '120%',
            },
        },
    },
});

export default mainTheme;
