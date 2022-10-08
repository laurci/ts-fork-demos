import {DeriveMacro, isIdentifier} from "compiler";

export interface Hello {
    hello(): string;
};

export macro function hello(this: DeriveMacro<Hello>) {
    this.transform(({ node, factory }) => {
        if(!node.name || !isIdentifier(node.name)) {
            return;
        }

        node.replace(
            factory.createClassDeclaration(node.modifiers, node.name, node.typeParameters, node.heritageClauses, [
                ...node.members,
                factory.createMethodDeclaration(undefined, undefined, "hello", undefined, undefined, [], undefined, factory.createBlock([
                    factory.createExpressionStatement(
                        factory.createCallExpression(
                            factory.createPropertyAccessExpression(factory.createIdentifier("console"), "log"),
                            undefined,
                            [ factory.createStringLiteral(`Hello from ${node.name.escapedText}`) ]
                        )
                    )
                ]))
            ])
        );
    });
}