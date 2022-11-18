import { typename } from "./typename";
import { Model } from "./model";
import {cfg, timer} from "./cfg";

interface User {
    z: number
}

class Test derives Model<User> {
    public x!: string;
}

class Sum {

}

class Vec2 {
    constructor(
        public x: number,
        public y: number
    ) {}

    print(): void {
        console.log(`(${this.x}, ${this.y})`);
    }

    plusEquals(other: number): void
    plusEquals(other: Vec2): void
    plusEquals(other: number | Vec2): void {
        if (typeof other === "number") {
            this.x += other;
            this.y += other;
        } else {
            this.x += other.x;
            this.y += other.y;
        }
    }

    plus(other: Vec2): Vec2 {
        return new Vec2(
            this.x + other.x,
            this.y + other.y
        );
    }

    lessThan(other: Vec2): boolean {
        return this.x < other.x && this.y < other.y;
    }
}

const ENDL = "\n";

class Stdout {
    private write(str: string) {
        process.stdout.write(str);
    }


    shiftLeft(str: string | number | boolean): Stdout {
        this.write(str.toString());
        return this;
    }
}


const cout = new Stdout();

cout << "hello" << " world" << ENDL;

let vec1 = new Vec2(1, 2);
const vec2 = new Vec2(2, 3);


const sum = vec1 + vec2 + new Vec2(1, 1);

vec1 += vec2;
vec1 += 3;

if(vec1 < vec2) {
    console.log("vec1 is smaller than vec2");
}

sum.print();

async function t() {
    const test = new Test();    
    const x = test.test();
}

function main(): User {
    console.log(typename!<typeof vec2>());

    using cfg!("hello"): {

    }

    return {} as any;
}

main();
