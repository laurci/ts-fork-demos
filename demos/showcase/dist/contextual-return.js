"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contextualReturn = void 0;
const compiler_1 = require("compiler");
 function contextualReturn() {
    this.check(({ node, checker, factory }) => {
        const functionDeclaration = (0, compiler_1.findAncestor)(node, compiler_1.isFunctionDeclaration);
        if (!functionDeclaration)
            return;
        const signature = checker.getSignatureFromDeclaration(functionDeclaration);
        if (!signature)
            return;
        const returnType = checker.getReturnTypeOfSignature(signature);
        if (!returnType)
            return;
        return factory.createResolvedTypeDefinition(returnType);
    });
}
exports.contextualReturn = contextualReturn;
