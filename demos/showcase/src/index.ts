import { contextualReturn } from "./contextual-return";
import { typename } from "./typename";
import { Model, Repository } from "./model";

interface User {
    z: number
}

class Test extends Repository derives Model<User> {
    public x!: string;
}


async function t() {
    const test = new Test();    
    const x = test.test();

    const zz = Test.findOne("123");
    zz.x
}

function main(): User {
    const x = contextualReturn!();

    console.log(typename!<typeof x>());


    return {} as any;
}

main();
