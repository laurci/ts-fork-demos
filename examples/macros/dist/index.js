"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./globals");
function main() {
    const a = 5, b = 17;
    console.log("a =", a, "|", "b =", b, "|", "a + b =", a + b);
    void 0;
    const x = __csv_create([
        {
            Country: "Romania",
            Population: 100,
            Surface: 99
        }
    ]);
    console.log("x =", x);
}
main();
