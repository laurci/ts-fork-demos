import {FunctionMacro, getCurrentProgram} from "compiler";

export macro function typename<T>(this: FunctionMacro): string {
    this.transform(({ node, factory }) => {
        const typeNode = node.typeArguments?.[0]
        if(!typeNode) return node.remove();
        
        const program = getCurrentProgram();
        const checker = program.getTypeChecker();

        const typeOfT = checker.getTypeAtLocation(typeNode);
        const symbolOfT = typeOfT?.symbol;

        let name = symbolOfT?.escapedName ?? "unknown";

        return node.replace(factory.createStringLiteral(name));
    });
}