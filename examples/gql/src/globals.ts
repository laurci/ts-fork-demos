import type {DocumentNode} from "graphql";
function installGlobal(name: string, val: any) {
    (globalThis as any)[name] = val;
}

const gqlDocCache: Record<string, DocumentNode> = {};

installGlobal("__gql_doc", (text: string) => {
    if(!gqlDocCache[text]) {
        gqlDocCache[text] = JSON.parse(text);
    }

    return { __doc: gqlDocCache[text] };
});