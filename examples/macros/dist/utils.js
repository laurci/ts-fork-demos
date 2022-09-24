"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLog = exports.nodeText = void 0;
const compiler_1 = require("compiler");
const printer = (0, compiler_1.createPrinter)();
function nodeText(node, sourceFile) {
    return printer.printNode(compiler_1.EmitHint.Unspecified, node, sourceFile);
}
exports.nodeText = nodeText;
function createLog(factory, method, args) {
    return factory.createCallExpression(factory.createPropertyAccessExpression(factory.createIdentifier("console"), method), [], args);
}
exports.createLog = createLog;
