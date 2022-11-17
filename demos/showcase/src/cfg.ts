
import {CallExpression, getBuildConfig, isMacroCallExpressionNode, isStringLiteral, UsingMacro} from "compiler";

export macro function cfg(this: UsingMacro, _name: string) {
    this.transform(({node, factory}) => {
        const expression = node.expressions.find(x => isMacroCallExpressionNode(x) && x.expression.expression.escapedText === "cfg") as CallExpression | undefined;
        if(!expression) return;

        const firstArg = expression.arguments[0];
        if(!firstArg || !isStringLiteral(firstArg)) throw new Error("Expected string literal as first argument to cfg macro");

        const name = firstArg.text;

        console.log("transforming cfg macro");
        if(!getBuildConfig()[name]) {
            node.replace(
                factory.createUseStatement(node.expressions, factory.createBlock([], true))
            );
        }
    });
}

export macro function timer(this: UsingMacro, _name: string) {
    this.transform(({node, factory}) => {
        const expression = node.expressions.find(x => isMacroCallExpressionNode(x) && x.expression.expression.escapedText === "timer") as CallExpression | undefined;
        if(!expression) return;

        const firstArg = expression.arguments[0];
        if(!firstArg || !isStringLiteral(firstArg)) throw new Error("Expected string literal as first argument to timer macro");

        const name = firstArg.text;

        node.replace(
            factory.createUseStatement(node.expressions, factory.createBlock([
                factory.createExpressionStatement(factory.createCallExpression(factory.createIdentifier("console.time"), undefined, [factory.createStringLiteral(name)])),
                ...node.body.statements,
                factory.createExpressionStatement(factory.createCallExpression(factory.createIdentifier("console.timeEnd"), undefined, [factory.createStringLiteral(name)]))
            ]))
        )

        console.log("transforming timer macro", name);
    });
}