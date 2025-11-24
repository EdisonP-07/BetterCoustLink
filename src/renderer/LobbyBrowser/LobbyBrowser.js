"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var withStyles_1 = require("@mui/styles/withStyles");
var makeStyles_1 = require("@mui/styles/makeStyles");
var Table_1 = require("@mui/material/Table");
var TableBody_1 = require("@mui/material/TableBody");
var TableCell_1 = require("@mui/material/TableCell");
var TableContainer_1 = require("@mui/material/TableContainer");
var TableHead_1 = require("@mui/material/TableHead");
var TableRow_1 = require("@mui/material/TableRow");
var Paper_1 = require("@mui/material/Paper");
var Button_1 = require("@mui/material/Button");
var electron_1 = require("electron");
var ipc_messages_1 = require("../../common/ipc-messages");
var socket_io_client_1 = require("socket.io-client");
var i18next_1 = require("i18next");
var material_1 = require("@mui/material");
var languages_1 = require("../language/languages");
var Mods_1 = require("../../common/Mods");
var AmongUsState_1 = require("../../common/AmongUsState");
var SettingsStore_1 = require("../settings/SettingsStore");
var serverUrl = SettingsStore_1["default"].get('serverURL', 'https://bettercrewl.ink/');
var language = SettingsStore_1["default"].get('language', 'en');
i18next_1["default"].changeLanguage(language);
var StyledTableCell = (0, withStyles_1["default"])(function (theme) { return ({
    head: {
        backgroundColor: '#1d1a23',
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}); })(TableCell_1["default"]);
var StyledTableRow = (0, withStyles_1["default"])(function () { return ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#25232a'
        },
        '&:nth-of-type(even)': {
            backgroundColor: '#1d1a23'
        }
    }
}); })(TableRow_1["default"]);
var useStyles = (0, makeStyles_1["default"])({
    table: {
        minWidth: 700
    },
    container: {
        maxHeight: '400px'
    }
});
var servers = {
    // '50.116.1.42': 'North America',
    // '172.105.251.170': 'Europe',
    // '139.162.111.196': 'Asia',
    '192.241.154.115': 'skeld.net',
    '154.16.67.100': 'Modded (North America)',
    '78.47.142.18': 'Modded (Europe)'
};
function sortLobbies(a, b) {
    if (a.gameState === AmongUsState_1.GameState.LOBBY && b.gameState !== AmongUsState_1.GameState.LOBBY) {
        return -1;
    }
    else if (b.gameState === AmongUsState_1.GameState.LOBBY && a.gameState !== AmongUsState_1.GameState.LOBBY) {
        return 1;
    }
    else {
        if (b.current_players === b.max_players && a.current_players !== a.max_players) {
            return -1;
        }
        if (a.current_players < b.current_players) {
            return 1;
        }
        else if (a.current_players > b.current_players) {
            return -1;
        }
        return 0;
    }
}
function getModName(mod) {
    var _a;
    return ((_a = Mods_1.modList.find(function (o) { return o.id === mod; })) === null || _a === void 0 ? void 0 : _a.label) || (mod !== null && mod !== void 0 ? mod : 'None');
}
// @ts-ignore
function lobbyBrowser(_a) {
    var t = _a.t;
    var classes = useStyles();
    var _b = (0, react_1.useState)({}), publiclobbies = _b[0], setPublicLobbies = _b[1];
    var _c = (0, react_1.useState)(), socket = _c[0], setSocket = _c[1];
    var _d = react_1["default"].useState(''), code = _d[0], setCode = _d[1];
    var _e = (0, react_1.useState)({}), forceRender = _e[1];
    var _f = (0, react_1.useState)('NONE'), mod = _f[0], setMod = _f[1];
    (0, react_1.useEffect)(function () {
        electron_1.ipcRenderer.invoke(ipc_messages_1.IpcMessages.REQUEST_MOD).then(function (mod) { return setMod(mod); });
        var s = (0, socket_io_client_1["default"])(serverUrl, {
            transports: ['websocket']
        });
        setSocket(s);
        s.on('update_lobby', function (lobby) {
            setPublicLobbies(function (old) {
                var _a;
                return (__assign(__assign({}, old), (_a = {}, _a[lobby.id] = lobby, _a)));
            });
        });
        s.on('new_lobbies', function (lobbies) {
            setPublicLobbies(function (old) {
                var lobbyMap = __assign({}, old);
                for (var index in lobbies) {
                    lobbyMap[lobbies[index].id] = lobbies[index];
                }
                return lobbyMap;
            });
        });
        s.on('remove_lobby', function (lobbyId) {
            setPublicLobbies(function (old) {
                delete old[lobbyId];
                return __assign({}, old);
            });
        });
        s.on('connect', function () {
            s.emit('lobbybrowser', true);
        });
        electron_1.ipcRenderer.on(ipc_messages_1.IpcHandlerMessages.JOIN_LOBBY_ERROR, function (event, code, server) {
            console.log('ERROR: ', code);
            setCode("".concat(code, "  ").concat(servers[server] ? "on region ".concat(servers[server]) : "\n Custom Server: ".concat(server)));
        });
        var secondPassed = setInterval(function () {
            forceRender({});
        }, 1000);
        return function () {
            socket === null || socket === void 0 ? void 0 : socket.emit('lobbybrowser', false);
            socket === null || socket === void 0 ? void 0 : socket.close();
            clearInterval(secondPassed);
        };
    }, []);
    return (react_1["default"].createElement("div", { style: { height: '100%', width: '100%', paddingTop: '15px' } },
        react_1["default"].createElement("div", { style: { height: '500px', padding: '20px' } },
            react_1["default"].createElement("b", null, t('lobbybrowser.header')),
            react_1["default"].createElement(material_1.Dialog, { open: code !== '', 
                // TransitionComponent={Transition}
                keepMounted: true, "aria-labelledby": "alert-dialog-slide-title", "aria-describedby": "alert-dialog-slide-description" },
                react_1["default"].createElement(material_1.DialogTitle, { id: "alert-dialog-slide-title" }, "Lobby information"),
                react_1["default"].createElement(material_1.DialogContent, null,
                    react_1["default"].createElement(material_1.DialogContentText, { id: "alert-dialog-slide-description" }, code.split('\n').map(function (i, key) {
                        return react_1["default"].createElement("div", { key: key }, i);
                    }))),
                react_1["default"].createElement(material_1.DialogActions, null,
                    react_1["default"].createElement(Button_1["default"], { onClick: function () { return setCode(''); }, color: "primary" }, t('buttons.close')))),
            react_1["default"].createElement(Paper_1["default"], null,
                react_1["default"].createElement(TableContainer_1["default"], { component: Paper_1["default"], className: classes.container },
                    react_1["default"].createElement(Table_1["default"], { className: classes.table, "aria-label": "customized table", stickyHeader: true },
                        react_1["default"].createElement(TableHead_1["default"], null,
                            react_1["default"].createElement(TableRow_1["default"], null,
                                react_1["default"].createElement(StyledTableCell, null, t('lobbybrowser.list.title')),
                                react_1["default"].createElement(StyledTableCell, { align: "left" }, t('lobbybrowser.list.host')),
                                react_1["default"].createElement(StyledTableCell, { align: "left" }, t('lobbybrowser.list.players')),
                                react_1["default"].createElement(StyledTableCell, { align: "left" }, t('lobbybrowser.list.mods')),
                                react_1["default"].createElement(StyledTableCell, { align: "left" }, t('lobbybrowser.list.language')),
                                react_1["default"].createElement(StyledTableCell, { align: "left" }, "Status"),
                                react_1["default"].createElement(StyledTableCell, { align: "left" }))),
                        react_1["default"].createElement(TableBody_1["default"], null, Object.values(publiclobbies)
                            .sort(sortLobbies)
                            .map(function (row) {
                            var _a, _b;
                            return (react_1["default"].createElement(StyledTableRow, { key: row.id },
                                react_1["default"].createElement(StyledTableCell, { component: "th", scope: "row" }, row.title),
                                react_1["default"].createElement(StyledTableCell, { align: "left" }, row.host),
                                react_1["default"].createElement(StyledTableCell, { align: "left" },
                                    row.current_players,
                                    "/",
                                    row.max_players),
                                react_1["default"].createElement(StyledTableCell, { align: "left" }, getModName(row.mods)),
                                react_1["default"].createElement(StyledTableCell, { align: "left" }, (_b = (_a = languages_1["default"][row.language]) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'English'),
                                react_1["default"].createElement(StyledTableCell, { align: "left" },
                                    row.gameState === AmongUsState_1.GameState.LOBBY ? 'Lobby' : 'In game',
                                    ' ',
                                    row.stateTime && new Date(Date.now() - row.stateTime).toISOString().substr(14, 5)),
                                react_1["default"].createElement(StyledTableCell, { align: "right" },
                                    react_1["default"].createElement(material_1.Tooltip, { title: row.gameState !== AmongUsState_1.GameState.LOBBY ? t('lobbybrowser.code_tooltips.in_progress') :
                                            row.max_players === row.current_players ? t('lobbybrowser.code_tooltips.full_lobby') :
                                                row.mods != mod ? "".concat(t('lobbybrowser.code_tooltips.incompatible'), " '").concat(getModName(mod), "' ").concat(t('lobbybrowser.code_tooltips.and'), " '").concat(getModName(row.mods), "'") : "" },
                                        react_1["default"].createElement("span", null,
                                            react_1["default"].createElement(Button_1["default"], { disabled: row.gameState !== AmongUsState_1.GameState.LOBBY ||
                                                    row.max_players === row.current_players ||
                                                    row.mods != mod, variant: "contained", color: "secondary", onClick: function () {
                                                    socket === null || socket === void 0 ? void 0 : socket.emit('join_lobby', row.id, function (state, codeOrError, server, publicLobby) {
                                                        if (state === 0) {
                                                            setCode("".concat(t('lobbybrowser.code'), ": ").concat(codeOrError, " \n Region: ").concat(server));
                                                            // ipcRenderer.send(IpcHandlerMessages.JOIN_LOBBY, codeOrError, server);
                                                        }
                                                        else {
                                                            setCode("Error: ".concat(codeOrError));
                                                        }
                                                    });
                                                } }, "Show code"))))));
                        }))))))));
}
exports["default"] = lobbyBrowser;
