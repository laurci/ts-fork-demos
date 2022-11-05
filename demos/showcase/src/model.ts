import {DeriveMacro} from "compiler";

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
    this.transform(({node}) => {
        console.log("transforming", node.name?.escapedText);
    });
}
