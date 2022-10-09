import {ClassDeclaration, ClassElement, DeriveMacro, findAncestor, isIdentifier, NodeFactory} from "compiler";

export interface Hello {
    hello(): string;
};

function appendElementsToClass(factory: NodeFactory, classDecl: ClassDeclaration, ...els: ClassElement[]) {
    return factory.createClassDeclaration(
        classDecl.modifiers,
        classDecl.name,
        classDecl.typeParameters,
        classDecl.heritageClauses,
        [...classDecl.members, ...els],
    )
}


export macro function hello(this: DeriveMacro<Hello>) {
    this.transform(({ node, factory }) => {
        if(!node.name || !isIdentifier(node.name)) {
            return;
        }

        const helloMethod = factory.createMethodDeclaration(undefined, undefined, "hello", undefined, undefined, [], undefined, factory.createBlock([
            factory.createExpressionStatement(
                factory.createCallExpression(
                    factory.createPropertyAccessExpression(factory.createIdentifier("console"), "log"),
                    undefined,
                    [ factory.createStringLiteral(`Hello from ${node.name.escapedText}`) ]
                )
            )
        ]));

        node.replace(appendElementsToClass(factory, node, helloMethod));
    });
}