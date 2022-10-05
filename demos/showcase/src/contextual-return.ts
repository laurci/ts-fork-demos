import {FunctionMacro, findAncestor, isFunctionDeclaration} from "compiler";

export macro function contextualReturn(this: FunctionMacro) {
    this.check(({ node, checker, factory }) => {
        const functionDeclaration = findAncestor(node, isFunctionDeclaration);
        if(!functionDeclaration) return;

        const signature = checker.getSignatureFromDeclaration(functionDeclaration);
        if(!signature) return;

        const returnType = checker.getReturnTypeOfSignature(signature);
        if(!returnType) return;

        return factory.createResolvedTypeDefinition(returnType);
    });
}