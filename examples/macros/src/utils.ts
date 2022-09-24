import {NodeFactory, createPrinter, EmitHint, Expression, Node, SourceFile} from "compiler";

const printer = createPrinter();

export function nodeText(node: Node, sourceFile: SourceFile) {
    return printer.printNode(EmitHint.Unspecified, node, sourceFile);
}

export type LogMethodName = "log" | "warn" | "error";
export function createLog(factory: NodeFactory, method: LogMethodName,  args: Expression[]) {
    return factory.createCallExpression(
        factory.createPropertyAccessExpression(factory.createIdentifier("console"), method),
        [],
        args
    );
}
