"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gql = void 0;
const compiler_1 = require("compiler");
const graphql_1 = require("graphql");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const configPath = path.join(__dirname, "../../../graphql.config.json");
const config = require(configPath);
const schemaPath = path.join(path.dirname(configPath), config.schema);
const schema = (0, graphql_1.buildSchema)(fs.readFileSync(schemaPath).toString());
function getTypeDefinition(gqlType, factory, selectionSet, nullable = true) {
    let result = factory.createIntrinsicDefinition(compiler_1.IntrinsicTypes.Any);
    if ((0, graphql_1.isScalarType)(gqlType)) {
        switch (gqlType.name) {
            case "ID":
                result = factory.createIntrinsicDefinition(compiler_1.IntrinsicTypes.String);
                break;
            case "String":
                result = factory.createIntrinsicDefinition(compiler_1.IntrinsicTypes.String);
                break;
            case "Int":
                result = factory.createIntrinsicDefinition(compiler_1.IntrinsicTypes.Number);
                break;
            default: break;
        }
    }
    if ((0, graphql_1.isObjectType)(gqlType)) {
        const objType = factory.createObjectDefinition([]);
        if (selectionSet) {
            const fieldTypes = gqlType.getFields();
            for (let field of selectionSet.selections) {
                if (field.kind !== graphql_1.Kind.FIELD) {
                    continue;
                }
                const fieldType = fieldTypes[field.name.value];
                if (field.selectionSet) {
                    objType.members.push(factory.createObjectMemberDefinition(field.name.value, getTypeDefinition(fieldType.type, factory, field.selectionSet)));
                }
                else {
                    objType.members.push(factory.createObjectMemberDefinition(field.name.value, getTypeDefinition(fieldType.type, factory, selectionSet)));
                }
            }
        }
        result = objType;
    }
    if ((0, graphql_1.isListType)(gqlType)) {
        result = factory.createArrayDefinition(getTypeDefinition(gqlType.ofType, factory, selectionSet));
    }
    if ((0, graphql_1.isNonNullType)(gqlType)) {
        return getTypeDefinition(gqlType.ofType, factory, selectionSet, false);
    }
    if (nullable) {
        return factory.createUnionDefinition([
            result,
            factory.createIntrinsicDefinition(compiler_1.IntrinsicTypes.Null),
            factory.createIntrinsicDefinition(compiler_1.IntrinsicTypes.Undefined)
        ]);
    }
    return result;
}
function getTypeFromNode(node, factory) {
    if (!(0, compiler_1.isNoSubstitutionTemplateLiteral)(node.template)) {
        throw "expected template without substitutions";
    }
    const text = node.template.text.trim();
    const document = (0, graphql_1.parse)(text);
    const operationDefinition = document.definitions.find(x => x.kind == graphql_1.Kind.OPERATION_DEFINITION);
    const fragmentDefinition = document.definitions.find(x => x.kind == graphql_1.Kind.FRAGMENT_DEFINITION);
    if (!operationDefinition && !fragmentDefinition) {
        throw "expected operation or fragment definition";
    }
    if (operationDefinition) {
        const objectType = operationDefinition.operation === graphql_1.OperationTypeNode.QUERY ? schema.getQueryType() : schema.getMutationType();
        return factory.createGenericInstanceDefinition(factory.createGlobalReferenceDefinition(operationDefinition.operation === graphql_1.OperationTypeNode.QUERY ? "GQLQueryDefinition" : "GQLMutationDefinition", 1), [getTypeDefinition(objectType, factory, operationDefinition.selectionSet, false)]);
    }
    if (fragmentDefinition) {
        const typeName = fragmentDefinition.typeCondition.name.value;
        const objectType = schema.getType(typeName);
        if (!objectType) {
            throw `unkown type ${typeName}`;
        }
        if (!(0, graphql_1.isOutputType)(objectType)) {
            throw `only output types are supported as fragment type conditions. (${objectType})`;
        }
        return factory.createGenericInstanceDefinition(factory.createGlobalReferenceDefinition("GQLFragmentDefinition", 1), [getTypeDefinition(objectType, factory, fragmentDefinition.selectionSet, false)]);
    }
}
 function gql(..._template) {
    this.check(({ factory, node, diagnostic }) => {
        try {
            return getTypeFromNode(node, factory);
        }
        catch (ex) {
            if (typeof ex == "string") {
                diagnostic("error", ex);
            }
            if (ex instanceof Error) {
                diagnostic("error", ex.message);
            }
        }
        return factory.createIntrinsicDefinition(compiler_1.IntrinsicTypes.Never);
    });
    this.transform(({ node, factory }) => {
        if (!(0, compiler_1.isNoSubstitutionTemplateLiteral)(node.template))
            return node.remove();
        const text = node.template.text.trim();
        const document = (0, graphql_1.parse)(text);
        node.replace(factory.createCallExpression(factory.createIdentifier("__gql_doc"), [], [
            factory.createStringLiteral(JSON.stringify(document))
        ]));
    });
}
exports.gql = gql;
