"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Dog {
    bark() {
        console.log("hi!");
    }
    hello() { console.log("Hello from Dog"); }
}
;
function main() {
    const dog = new Dog();
    dog.hello();
}
main();
