import {FunctionMacro, Expression, isStringLiteral, NodeFactory, IntrinsicTypes} from "compiler";
import config from "./config";
import {createLog, nodeText} from "./utils"

function createSeparator(factory: NodeFactory) {
        return factory.createStringLiteral(config.macros?.debug?.separator ?? "");
}

export macro function debug(this: FunctionMacro, ..._args: any[]) {
    this.transform(({node, factory, sourceFile}) => {
        const args = node.arguments;

        if(config.macros?.debug?.disable) {
            return node.remove();
        }

        const log = createLog(factory, "log", args.flatMap((arg, index) => {
            const argInstance: Expression[] = isStringLiteral(arg) ? [arg] : [
                factory.createStringLiteral(`${nodeText(arg, sourceFile)} =`),
                arg
            ];
    
            if(index > 0) {
                return [createSeparator(factory), ...argInstance];
            }
    
            return argInstance;
        }));

        node.replace(log);
    });
} 