import {FunctionMacro} from "compiler";

export macro function bla(this: FunctionMacro) {
    this.transform(({node}) => {
        node.remove();
    });
}