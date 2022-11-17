"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Test {
}
class Sum {
}
class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    print() {
        console.log(`(${this.x}, ${this.y})`);
    }
    plusEquals(other) {
        if (typeof other === "number") {
            this.x += other;
            this.y += other;
        }
        else {
            this.x += other.x;
            this.y += other.y;
        }
    }
    plus(other) {
        return new Vec2(this.x + other.x, this.y + other.y);
    }
    lessThan(other) {
        return this.x < other.x && this.y < other.y;
    }
}
const ENDL = "\n";
class Stdout {
    write(str) {
        process.stdout.write(str);
    }
    shiftLeft(str) {
        this.write(str.toString());
        return this;
    }
}
const cout = new Stdout();
((cout.shiftLeft("hello")).shiftLeft(" world")).shiftLeft(ENDL);
let vec1 = new Vec2(1, 2);
const vec2 = new Vec2(2, 3);
const sum = (vec1.plus(vec2)).plus(new Vec2(1, 1));
vec1.plusEquals(vec2);
vec1.plusEquals(3);
if (vec1.lessThan(vec2)) {
    console.log("vec1 is smaller than vec2");
}
sum.print();
function t() {
    return __awaiter(this, void 0, void 0, function* () {
        const test = new Test();
        const x = test.test();
    });
}
function main() {
    console.log("Vec2");
    return {};
}
main();
console.log("Loading source file /home/sessions/tsf/demos/demos/showcase/src/index.ts");
