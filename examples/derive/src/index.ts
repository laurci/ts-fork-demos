import {Hello} from "./hello";

class Dog derives Hello {
    bark() {
        console.log("hi!");
    }
};


function main() {
    const dog = new Dog();
    dog.hello();
}

main();