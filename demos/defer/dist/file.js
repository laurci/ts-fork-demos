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
exports.openFile = exports.openFileSync = void 0;
let openFileCount = 0;
function checkOpenFiles() {
    if (openFileCount > 0) {
        console.log(`FAILED! ${openFileCount} files are still opened!`);
    }
}
process.on("beforeExit", () => {
    checkOpenFiles();
});
const testCsv = `
Romania,19000000
Austria, 9000000
Spain,  48000000
`.trim();
const test2Csv = `
China,1400000000
India,1300000000
USA,   330000000
`.trim();
const files = {
    "test.csv": testCsv,
    "test2.csv": test2Csv,
};
function openFileSync(fileName) {
    console.log(`open file ${fileName}`);
    openFileCount++;
    return {
        close() {
            console.log(`closed ${fileName}`);
            openFileCount--;
        },
        read() {
            return files[fileName];
        },
    };
}
exports.openFileSync = openFileSync;
function openFile(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const file = openFileSync(fileName);
        return {
            close() {
                return __awaiter(this, void 0, void 0, function* () {
                    return file.close();
                });
            },
            read() {
                return __awaiter(this, void 0, void 0, function* () {
                    return file.read();
                });
            },
        };
    });
}
exports.openFile = openFile;
