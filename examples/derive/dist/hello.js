"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = void 0;
const compiler_1 = require("compiler");
;
 function hello() {
    this.transform(({ node, factory }) => {
        if (!node.name || !(0, compiler_1.isIdentifier)(node.name)) {
            return;
        }
        node.replace(factory.createClassDeclaration(node.modifiers, node.name, node.typeParameters, node.heritageClauses, [
            ...node.members,
            factory.createMethodDeclaration(undefined, undefined, "hello", undefined, undefined, [], undefined, factory.createBlock([
                factory.createExpressionStatement(factory.createCallExpression(factory.createPropertyAccessExpression(factory.createIdentifier("console"), "log"), undefined, [factory.createStringLiteral(`Hello from ${node.name.escapedText}`)]))
            ]))
        ]));
    });
}
exports.hello = hello;
