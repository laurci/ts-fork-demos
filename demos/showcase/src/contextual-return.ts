import {FunctionMacro, isFunctionDeclaration, FunctionDeclaration, getCurrentProgram} from "compiler";

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

    this.transform(({node, factory}) => {
        const project = getCurrentProgram();
        const files = project.getSourceFiles();

        const fileNames = files.map(x => x.fileName).filter(x => !x.endsWith(".d.ts"));

        node.replace(factory.createArrayLiteralExpression(fileNames.map(x => factory.createStringLiteral(x))));
    });
}