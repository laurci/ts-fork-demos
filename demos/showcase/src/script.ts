import { FunctionMacro } from "compiler";

export macro function helloScript(this: FunctionMacro) {
    this.transform(() => {
        console.log("hello from script");
    });
}