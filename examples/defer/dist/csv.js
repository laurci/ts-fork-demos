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
    const __defer = [];
    try {
        let data = [];
        __defer.push(() => { data = process(data); })
        const file = (0, file_1.openFileSync)(p);
        __defer.push(() => { file.close(); })
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
                return data;
            }
            data.push(item);
        }
        return data;
    }
    finally {
        for (let __defer_fun of __defer) {
            __defer_fun();
        }
    }
}
exports.readCsv = readCsv;
