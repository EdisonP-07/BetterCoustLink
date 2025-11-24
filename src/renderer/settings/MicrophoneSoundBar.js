"use strict";
exports.__esModule = true;
var LinearProgress_1 = require("@mui/material/LinearProgress");
var Typography_1 = require("@mui/material/Typography");
var react_1 = require("react");
var makeStyles_1 = require("@mui/styles/makeStyles");
var useStyles = (0, makeStyles_1["default"])(function (theme) { return ({
    root: {
        display: 'flex',
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    bar: {
        height: 8,
        margin: '5px auto',
        width: 200
    },
    inner: {
        transition: 'transform .05s linear'
    }
}); });
var TestMicrophoneButton = function (_a) {
    var microphone = _a.microphone;
    var classes = useStyles();
    var _b = (0, react_1.useState)(false), error = _b[0], setError = _b[1];
    var _c = (0, react_1.useState)(0), rms = _c[0], setRms = _c[1];
    (0, react_1.useEffect)(function () {
        setError(false);
        var ctx = new AudioContext();
        var processor = ctx.createScriptProcessor(2048, 1, 1);
        processor.connect(ctx.destination);
        var minUpdateRate = 50;
        var lastRefreshTime = 0;
        var handleProcess = function (event) {
            // limit update frequency
            if (event.timeStamp - lastRefreshTime < minUpdateRate) {
                return;
            }
            // update last refresh time
            lastRefreshTime = event.timeStamp;
            var input = event.inputBuffer.getChannelData(0);
            var total = input.reduce(function (acc, val) { return acc + Math.abs(val); }, 0);
            var rms = Math.min(0.5, Math.sqrt(total / input.length));
            setRms(rms);
        };
        // @ts-ignore-line
        var audio_options = {
            deviceId: microphone !== null && microphone !== void 0 ? microphone : 'default',
            autoGainControl: false,
            echoCancellation: false,
            noiseSuppression: false,
            googEchoCancellation: false,
            googAutoGainControl2: false,
            googNoiseSuppression: false,
            googHighpassFilter: false,
            googTypingNoiseDetection: false
        };
        navigator.mediaDevices
            .getUserMedia({
            audio: audio_options,
            video: false
        })
            .then(function (stream) {
            var src = ctx.createMediaStreamSource(stream);
            src.connect(processor);
            processor.addEventListener('audioprocess', handleProcess);
        })["catch"](function () { return setError(true); });
        return function () {
            processor.removeEventListener('audioprocess', handleProcess);
        };
    }, [microphone]);
    if (error) {
        return react_1["default"].createElement(Typography_1["default"], { color: "error" }, "Could not connect to microphone");
    }
    else {
        return (react_1["default"].createElement("div", { className: classes.root },
            react_1["default"].createElement(LinearProgress_1["default"], { classes: {
                    root: classes.bar,
                    bar: classes.inner
                }, color: "secondary", variant: "determinate", value: rms * 2 * 100 })));
    }
};
exports["default"] = TestMicrophoneButton;
