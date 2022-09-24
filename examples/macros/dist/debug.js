"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = void 0;
const compiler_1 = require("compiler");
const config_1 = __importDefault(require("./config"));
function createSeparator(factory) {
    var _a, _b, _c;
    return factory.createStringLiteral((_c = (_b = (_a = config_1.default.macros) === null || _a === void 0 ? void 0 : _a.debug) === null || _b === void 0 ? void 0 : _b.separator) !== null && _c !== void 0 ? _c : "");
}
 function debug(..._args) {
    var _a, _b;
    const { factory, sourceFile, result } = this;
    const args = this.node.arguments;
    if ((_b = (_a = config_1.default.macros) === null || _a === void 0 ? void 0 : _a.debug) === null || _b === void 0 ? void 0 : _b.disable) {
        result.remove();
        return;
    }
    result.replace((0, utils_1.createLog)(factory, "log", args.flatMap((arg, index) => {
        const argInstance = (0, compiler_1.isStringLiteral)(arg) ? [arg] : [
            factory.createStringLiteral(`${(0, utils_1.nodeText)(arg, sourceFile)} =`),
            arg
        ];
        if (index > 0) {
            return [createSeparator(factory), ...argInstance];
        }
        return argInstance;
    })));
}
exports.debug = debug;
