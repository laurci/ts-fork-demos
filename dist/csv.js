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
exports.readCsv = void 0;
const file_1 = require("./file");
function readCsv(p) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = [];
        const file = (0, file_1.openFile)(p);
        const content = yield file.read();
        const lines = content.split("\n");
        for (let line of lines) {
            const [country, populationString] = line.split(",");
            const population = parseInt(populationString);
            const item = {
                country,
                population
            };
            if (item.population < 10000000) {
                yield __defer();
                return data;
            }
            data.push(item);
        }
        yield __defer();
        return data;
        function __defer() {
            return __awaiter(this, void 0, void 0, function* () { console.log("processed", data.length, "entries"); yield file.close(); });
        }
    });
}
exports.readCsv = readCsv;
