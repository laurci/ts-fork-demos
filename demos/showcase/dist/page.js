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
function data() {
    return __awaiter(this, void 0, void 0, function* () {
        {
            console.time("something stuff");
            console.log("this is emitted only if 'something' cfg is set");
            console.timeEnd("something stuff");
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
    const pageData = ["/home/sessions/tsf/demos/demos/showcase/src/cfg.ts", "/home/sessions/tsf/demos/demos/showcase/src/contextual-return.ts", "/home/sessions/tsf/demos/demos/showcase/src/typename.ts", "/home/sessions/tsf/demos/demos/showcase/src/model.ts", "/home/sessions/tsf/demos/demos/showcase/src/script.ts", "/home/sessions/tsf/demos/demos/showcase/src/index.ts", "/home/sessions/tsf/demos/demos/showcase/src/page.tsx", "/home/sessions/tsf/demos/node_modules/@laurci/injector/lib/utils.ts", "/home/sessions/tsf/demos/node_modules/@laurci/injector/lib/index.ts", "/home/sessions/tsf/demos/demos/showcase/src/utils.ts"];
}
exports.default = Page;
