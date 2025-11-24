"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var colors_1 = require("@mui/material/colors");
// Create a theme instance.
var theme = (0, material_1.createTheme)({
    palette: {
        primary: {
            main: colors_1.purple[300]
        },
        secondary: colors_1.red,
        background: {
            "default": '#27232a',
            paper: '#272727'
        },
        grey: {
            main: colors_1.grey[300],
            dark: colors_1.grey[400]
        },
        mode: 'dark'
    },
    components: {
        MuiPaper: {
            styleOverrides: { root: { backgroundImage: 'unset' } }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: 15
                }
            }
        }
    }
});
exports["default"] = theme;
