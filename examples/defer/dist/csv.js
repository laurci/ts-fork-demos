"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCsv = void 0;
const file_1 = require("./file");
function process(entries) {
    return entries.filter(x => x.population > 10000000);
}
/**
 * Input data format: /[A-Z][a-z]( )*+,( )*[0-9]+/
 * Romania ,  19000000
 */
function readCsv(p) {
    let data = [];
    const file = (0, file_1.openFileSync)(p);
    const content = file.read();
    const lines = content.split("\n");
    for (let line of lines) {
        const [country, populationStr] = line.split(",").map(x => x.trim());
        const population = parseInt(populationStr);
        const item = {
            country,
            population
        };
        if (Math.random() > 0.5) {
            __defer();
            return data;
        }
        data.push(item);
    }
    __defer();
    return data;
    function __defer() {
        data = process(data);
        file.close();
    }
}
exports.readCsv = readCsv;
