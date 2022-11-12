import {DeriveMacro, getBuildConfig} from "compiler";

function notImplemented() {
    return new Error("Not implemented");
}

export class Repository {
    static find<T>(this: { new(...args: any[]): T }, filter: { a: string }): T[] {
        throw notImplemented();
    }

    static findOne<T>(this: { new(...args: any[]): T }, id: string): T {
        throw notImplemented();
    }
}

export abstract class Model<T = any> {
    abstract test(): this;
    abstract test2(): T;

    public static find<Q>(this: { new(...args: any): Q}): Q[] {
        return [];
    };
}

export macro function deriveModel(this: DeriveMacro<Model>) {
    this.transform(({node, factory, sourceFile}) => {
        const callExpr = factory.createCallExpression(
            factory.createPropertyAccessExpression(
                factory.createIdentifier("console"),
                "log"
            ),
            [],
            [factory.createStringLiteral(`Loading source file ${sourceFile.fileName}`)]
        );
        sourceFile.appendStatement(factory.createExpressionStatement(callExpr));
        
        console.log("transforming", node.name?.escapedText);
        const config = getBuildConfig();
        console.log(config);
    });
    
}
