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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./globals");
const client_1 = __importDefault(require("./client"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield client_1.default.fetch(__gql_doc("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"query\",\"variableDefinitions\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"capsules\",\"loc\":{\"start\":20,\"end\":28}},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\",\"loc\":{\"start\":47,\"end\":49}},\"arguments\":[],\"directives\":[],\"loc\":{\"start\":47,\"end\":49}},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"landings\",\"loc\":{\"start\":67,\"end\":75}},\"arguments\":[],\"directives\":[],\"loc\":{\"start\":67,\"end\":75}}],\"loc\":{\"start\":29,\"end\":89}},\"loc\":{\"start\":20,\"end\":89}}],\"loc\":{\"start\":6,\"end\":99}},\"loc\":{\"start\":0,\"end\":99}}],\"loc\":{\"start\":0,\"end\":99}}"));
    });
}
main();
