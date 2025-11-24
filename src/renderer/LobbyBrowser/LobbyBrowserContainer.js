"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var styles_1 = require("@mui/material/styles");
var makeStyles_1 = require("@mui/styles/makeStyles");
var RefreshSharp_1 = require("@mui/icons-material/RefreshSharp");
var Close_1 = require("@mui/icons-material/Close");
var Minimize_1 = require("@mui/icons-material/Minimize");
var IconButton_1 = require("@mui/material/IconButton");
require("../css/index.css");
require("source-code-pro/source-code-pro.css");
require("typeface-varela/index.css");
require("../language/i18n");
var theme_1 = require("../theme");
var LobbyBrowser_1 = require("./LobbyBrowser");
var react_i18next_1 = require("react-i18next");
var electron_1 = require("electron");
var useStyles = (0, makeStyles_1["default"])(function () { return ({
    root: {
        position: 'absolute',
        width: '100vw',
        height: theme_1["default"].spacing(3),
        backgroundColor: '#1d1a23',
        top: 0,
        WebkitAppRegion: 'drag'
    },
    title: {
        width: '100%',
        textAlign: 'center',
        display: 'block',
        height: theme_1["default"].spacing(3),
        lineHeight: theme_1["default"].spacing(3),
        color: theme_1["default"].palette.primary.main
    },
    button: {
        WebkitAppRegion: 'no-drag',
        marginLeft: 'auto',
        padding: 0,
        position: 'absolute',
        top: 0
    },
    minimalizeIcon: {
        '& svg': {
            paddingBottom: '7px',
            marginTop: '-8px'
        }
    }
}); });
var TitleBar = function () {
    var classes = useStyles();
    return (react_1["default"].createElement("div", { className: classes.root },
        react_1["default"].createElement("span", { className: classes.title, style: { marginLeft: 10 } }, "LobbyBrowser"),
        react_1["default"].createElement(IconButton_1["default"], { className: classes.button, size: "small", onClick: function () { return electron_1.ipcRenderer.send('reload', true); } },
            react_1["default"].createElement(RefreshSharp_1["default"], { htmlColor: "#777" })),
        react_1["default"].createElement(IconButton_1["default"], { className: [classes.button, classes.minimalizeIcon].join(' '), style: { right: 20 }, size: "small", onClick: function () { return electron_1.ipcRenderer.send('minimize', true); } },
            react_1["default"].createElement(Minimize_1["default"], { htmlColor: "#777", y: "100" })),
        react_1["default"].createElement(IconButton_1["default"], { className: classes.button, style: { right: 0 }, size: "small", onClick: function () {
                window.close();
            } },
            react_1["default"].createElement(Close_1["default"], { htmlColor: "#777" }))));
};
// @ts-ignore
function App(_a) {
    var t = _a.t;
    return (react_1["default"].createElement(styles_1.StyledEngineProvider, { injectFirst: true },
        react_1["default"].createElement(styles_1.ThemeProvider, { theme: theme_1["default"] },
            react_1["default"].createElement(TitleBar, null),
            react_1["default"].createElement(LobbyBrowser_1["default"], { t: t }))));
}
exports["default"] = App;
// @ts-ignore
var App2 = (0, react_i18next_1.withNamespaces)()(App);
// @ts-ignore
react_dom_1["default"].render(react_1["default"].createElement(App2, null), document.getElementById('app'));
