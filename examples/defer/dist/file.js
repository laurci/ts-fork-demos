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
const text = `
Romania,19000000
Austria, 9000000
Spain,  48000000
`.trim();
function openFileSync(fileName) {
    console.log(`open file ${fileName}`);
    openFileCount++;
    return {
        close() {
            console.log(`closed ${fileName}`);
            openFileCount--;
        },
        read() {
            return text;
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
