import {Hello} from "./hello";

interface X { };

class Dog derives X, Hello {
    bark() {
        console.log("hi!");
    }
};


function main() {
    const dog = new Dog();
    dog.hello();
}

main();