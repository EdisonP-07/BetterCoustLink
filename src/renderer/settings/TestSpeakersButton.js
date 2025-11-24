"use strict";
exports.__esModule = true;
var react_1 = require("react");
// @ts-ignore
var chime_mp3_1 = require("../../../static/sounds/chime.mp3");
var Button_1 = require("@mui/material/Button");
var makeStyles_1 = require("@mui/styles/makeStyles");
var useStyles = (0, makeStyles_1["default"])(function () { return ({
    button: {
        width: 'fit-content',
        margin: '5px auto'
    }
}); });
var audio = new Audio();
audio.src = chime_mp3_1["default"];
var TestSpeakersButton = function (_a) {
    var t = _a.t, speaker = _a.speaker;
    var classes = useStyles();
    var _b = (0, react_1.useState)(false), playing = _b[0], setPlaying = _b[1];
    (0, react_1.useEffect)(function () {
        if (speaker.toLowerCase() !== 'default')
            audio.setSinkId(speaker);
        audio.onended = function () {
            setPlaying(false);
        };
    }, [speaker]);
    var testSpeakers = function () {
        if (playing) {
            audio.pause();
            audio.currentTime = 0;
            setPlaying(false);
        }
        else {
            audio.play();
            setPlaying(true);
        }
    };
    return (react_1["default"].createElement(Button_1["default"], { variant: "contained", color: "secondary", size: "small", className: classes.button, onClick: testSpeakers }, playing ? t('settings.audio.test_speaker_stop') : t('settings.audio.test_speaker_start')));
};
exports["default"] = TestSpeakersButton;
