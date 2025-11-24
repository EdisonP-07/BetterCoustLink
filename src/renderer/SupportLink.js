"use strict";
exports.__esModule = true;
var Link_1 = require("@mui/material/Link");
var Typography_1 = require("@mui/material/Typography");
var react_1 = require("react");
var electron_1 = require("electron");
var makeStyles_1 = require("@mui/styles/makeStyles");
var useStyles = (0, makeStyles_1["default"])(function () { return ({
    button: {
        color: 'white',
        background: 'none',
        padding: '2px 10px',
        borderRadius: 10,
        border: '2px solid white',
        fontSize: 19,
        outline: 'none',
        fontWeight: 500,
        fontFamily: '"Varela", sans-serif',
        marginTop: 24,
        '&:hover': {
            borderColor: '#00ff00',
            cursor: 'pointer'
        }
    }
}); });
var onRefreshClick = function () {
    electron_1.ipcRenderer.send('reload');
};
var SupportLink = function () {
    var classes = useStyles();
    return (react_1["default"].createElement(Typography_1["default"], { align: "center" },
        "Need help?\u00A0",
        react_1["default"].createElement(Link_1["default"], { href: "#", color: "secondary", onClick: function () { return electron_1.shell.openExternal('https://discord.gg/4cpvp3KyhF'); } }, "Get support"),
        react_1["default"].createElement("button", { className: classes.button, onClick: onRefreshClick }, "Reload")));
};
exports["default"] = SupportLink;
