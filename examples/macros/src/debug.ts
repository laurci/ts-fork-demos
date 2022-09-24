import {CallExpressionMacroContext, Expression, isStringLiteral, NodeFactory} from "compiler";
import config from "./config";
import {createLog, nodeText} from "./utils"

function createSeparator(factory: NodeFactory) {
        return factory.createStringLiteral(config.macros?.debug?.separator ?? "");
}

export macro function debug(this: CallExpressionMacroContext, ..._args: any[]) {
    const {factory, sourceFile, result} = this;
    const args = this.node.arguments;

    if(config.macros?.debug?.disable) {
        result.remove();
        return;
    }

    result.replace(createLog(factory, "log", args.flatMap((arg, index) => {
        const argInstance: Expression[] = isStringLiteral(arg) ? [arg] : [
            factory.createStringLiteral(`${nodeText(arg, sourceFile)} =`),
            arg
        ];

        if(index > 0) {
            return [createSeparator(factory), ...argInstance];
        }

        return argInstance;
    })));
} 