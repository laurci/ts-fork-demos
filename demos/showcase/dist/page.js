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
exports.data = void 0;
function cfg(str) {
}
function onMount() {
}
function onUnmount() {
}
function onChange() {
}
function timer(name) {
}
function data() {
    return __awaiter(this, void 0, void 0, function* () {
        {
        }
        {
        }
        {
        }
        return {
            a: "abcd",
            c: "adsada",
            e: 123
        };
    });
}
exports.data = data;
function Page() {
    const pageData = ["/home/sessions/tsf/demos/demos/showcase/src/contextual-return.ts", "/home/sessions/tsf/demos/demos/showcase/src/typename.ts", "/home/sessions/tsf/demos/demos/showcase/src/model.ts", "/home/sessions/tsf/demos/demos/showcase/src/index.ts", "/home/sessions/tsf/demos/demos/showcase/src/page.tsx"];
}
exports.default = Page;
