"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function installGlobal(name, val) {
    globalThis[name] = val;
}
const gqlDocCache = {};
installGlobal("__gql_doc", (text) => {
    if (!gqlDocCache[text]) {
        gqlDocCache[text] = JSON.parse(text);
    }
    return { __doc: gqlDocCache[text] };
});
