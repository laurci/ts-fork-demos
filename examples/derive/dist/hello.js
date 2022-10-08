"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = void 0;
const compiler_1 = require("compiler");
;
function appendElementsToClass(factory, classDecl, ...els) {
    return factory.createClassDeclaration(classDecl.modifiers, classDecl.name, classDecl.typeParameters, classDecl.heritageClauses, [...classDecl.members, ...els]);
}
 function hello() {
    this.transform(({ node, factory }) => {
        if (!node.name || !(0, compiler_1.isIdentifier)(node.name)) {
            return;
        }
        const helloMethod = factory.createMethodDeclaration(undefined, undefined, "hello", undefined, undefined, [], undefined, factory.createBlock([
            factory.createExpressionStatement(factory.createCallExpression(factory.createPropertyAccessExpression(factory.createIdentifier("console"), "log"), undefined, [factory.createStringLiteral(`Hello from ${node.name.escapedText}`)]))
        ]));
        node.replace(appendElementsToClass(factory, node, helloMethod));
    });
}
exports.hello = hello;
