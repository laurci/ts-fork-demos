"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typename = void 0;
const compiler_1 = require("compiler");
 function typename() {
    this.transform(({ node, factory }) => {
        var _a, _b;
        const typeNode = (_a = node.typeArguments) === null || _a === void 0 ? void 0 : _a[0];
        if (!typeNode)
            return node.remove();
        const program = (0, compiler_1.getCurrentProgram)();
        const checker = program.getTypeChecker();
        const typeOfT = checker.getTypeAtLocation(typeNode);
        const symbolOfT = typeOfT === null || typeOfT === void 0 ? void 0 : typeOfT.symbol;
        let name = (_b = symbolOfT === null || symbolOfT === void 0 ? void 0 : symbolOfT.escapedName) !== null && _b !== void 0 ? _b : "unknown";
        return node.replace(factory.createStringLiteral(name));
    });
}
exports.typename = typename;
