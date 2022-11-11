import {FunctionMacro, isFunctionDeclaration, FunctionDeclaration} from "compiler";

export macro function contextualReturn(this: FunctionMacro) {
    this.check(({ sourceFile, checker, factory }) => {
        const functionDeclaration = sourceFile.statements.find(x => isFunctionDeclaration(x) && x.name?.escapedText == "data") as FunctionDeclaration | undefined;
        if(!functionDeclaration) return;

        const signature = checker.getSignatureFromDeclaration(functionDeclaration);
        if(!signature) return;

        const returnType = checker.getReturnTypeOfSignature(signature);
        if(!returnType) return;

        return factory.createResolvedTypeDefinition(returnType);
    });
}