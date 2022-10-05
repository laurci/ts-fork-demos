import { contextualReturn } from "./contextual-return";
import { typename } from "./typename";

interface User {
    
}

function main(): User {
    const x = contextualReturn!();

    console.log(typename!<typeof x>());


    return {} as any;
}

main();
