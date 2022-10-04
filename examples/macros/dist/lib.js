"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installGlobal = void 0;
function installGlobal(name, val) {
    globalThis[name] = val;
}
exports.installGlobal = installGlobal;
