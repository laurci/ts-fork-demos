"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
(0, lib_1.installGlobal)("__csv_create", (data) => {
    return {
        rows: data
    };
});
