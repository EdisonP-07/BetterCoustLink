"use strict";
exports.__esModule = true;
// @ts-nocheck
var i18next_1 = require("i18next");
var react_i18next_1 = require("react-i18next");
var languages_1 = require("./languages");
i18next_1["default"]
    // .use(Backend)
    .use(react_i18next_1.reactI18nextModule) // pas
    .init({
    resources: languages_1["default"],
    defaultLocale: 'en',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
        escapeValue: false
    }
});
exports["default"] = i18next_1["default"];
