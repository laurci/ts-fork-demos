"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_deepmerge_1 = __importDefault(require("ts-deepmerge"));
const devConfig = {
    macros: {
        debug: {
            separator: "|"
        }
    }
};
const prodOverlay = {
    macros: {
        debug: {
            disable: true
        }
    }
};
exports.default = process.env.TARGET_ENV == "production" ? (0, ts_deepmerge_1.default)(devConfig, prodOverlay) : devConfig;
