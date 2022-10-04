import {IntrinsicTypes, isNoSubstitutionTemplateLiteral, MacroTaggedTemplateExpressionNode, TaggedTemplateMacro, TypeDefinition, TypeDefinitionFactory} from "compiler";
import {parse, Kind, OperationDefinitionNode, OperationTypeNode, buildSchema, SelectionSetNode, isObjectType, GraphQLOutputType, isScalarType, isNonNullType, isListType, FragmentDefinitionNode, isOutputType} from "graphql";
import * as path from "path";
import * as fs from "fs";

const configPath = path.join(__dirname, "../../../graphql.config.json");
const config = require(configPath) as { schema: string };
const schemaPath = path.join(path.dirname(configPath), config.schema);
const schema = buildSchema(fs.readFileSync(schemaPath).toString());

function getTypeDefinition(gqlType: GraphQLOutputType, factory: TypeDefinitionFactory, selectionSet?: SelectionSetNode, nullable: boolean = true): TypeDefinition {
    let result: TypeDefinition = factory.createIntrinsicDefinition(IntrinsicTypes.Any);

    if(isScalarType(gqlType)) {
        switch(gqlType.name) {
            case "ID": result = factory.createIntrinsicDefinition(IntrinsicTypes.String); break;
            case "String": result = factory.createIntrinsicDefinition(IntrinsicTypes.String); break;
            case "Int": result = factory.createIntrinsicDefinition(IntrinsicTypes.Number); break;
            default: break;
        }
    }

    if(isObjectType(gqlType)) {
        const objType = factory.createObjectDefinition([]);
        if(selectionSet) {
            const fieldTypes = gqlType.getFields();        

            for(let field of selectionSet.selections) {
                if(field.kind !== Kind.FIELD) {
                    continue;
                }
        
                const fieldType = fieldTypes[field.name.value];
        
                if(field.selectionSet) {
                    objType.members.push(
                        factory.createObjectMemberDefinition(
                            field.name.value,
                            getTypeDefinition(fieldType.type, factory, field.selectionSet)
                        )
                    );
                } else {
                    objType.members.push(
                        factory.createObjectMemberDefinition(
                            field.name.value,
                            getTypeDefinition(fieldType.type, factory, selectionSet)
                        )
                    );
                }
            }
        }
        
        result = objType;
    }

    if(isListType(gqlType)) {
        result = factory.createArrayDefinition(getTypeDefinition(gqlType.ofType, factory, selectionSet));   
    }

    if(isNonNullType(gqlType)) {
        return getTypeDefinition(gqlType.ofType, factory, selectionSet, false);
    }

    if(nullable) {
        return factory.createUnionDefinition([
            result,
            factory.createIntrinsicDefinition(IntrinsicTypes.Null),
            factory.createIntrinsicDefinition(IntrinsicTypes.Undefined)
        ]);
    }

    return result;
}

function getTypeFromNode(node: MacroTaggedTemplateExpressionNode, factory: TypeDefinitionFactory) {
    if(!isNoSubstitutionTemplateLiteral(node.template)) {
        throw "expected template without substitutions";
    }
    
    const text = node.template.text.trim();
    const document = parse(text);

    const operationDefinition = document.definitions.find(x => x.kind == Kind.OPERATION_DEFINITION) as OperationDefinitionNode | undefined;
    const fragmentDefinition = document.definitions.find(x => x.kind == Kind.FRAGMENT_DEFINITION) as FragmentDefinitionNode | undefined;

    if(!operationDefinition && !fragmentDefinition) {
        throw "expected operation or fragment definition";
    }

    if(operationDefinition) {
        const objectType = operationDefinition.operation === OperationTypeNode.QUERY ? schema.getQueryType()! : schema.getMutationType()!;

        return factory.createGenericInstanceDefinition(factory.createGlobalReferenceDefinition(operationDefinition.operation === OperationTypeNode.QUERY ? "GQLQueryDefinition" : "GQLMutationDefinition", 1), [getTypeDefinition(objectType, factory, operationDefinition.selectionSet, false)]);
    }

    if(fragmentDefinition) {
        const typeName = fragmentDefinition.typeCondition.name.value;
        const objectType = schema.getType(typeName);

        if(!objectType) {
            throw `unkown type ${typeName}`;
        }

        if(!isOutputType(objectType)) {
            throw `only output types are supported as fragment type conditions. (${objectType})`;
        }

        return factory.createGenericInstanceDefinition(factory.createGlobalReferenceDefinition("GQLFragmentDefinition", 1), [getTypeDefinition(objectType, factory, fragmentDefinition.selectionSet, false)]);
    }
    
}

export macro function gql(this: TaggedTemplateMacro, ..._template: any[]) {
    this.check(({factory, node, diagnostic}) => {
        try {
            return getTypeFromNode(node, factory);
        } catch(ex) {
            if(typeof ex == "string") {
                diagnostic("error", ex);
            }

            if(ex instanceof Error) {
                diagnostic("error", ex.message);
            }
        }
        return factory.createIntrinsicDefinition(IntrinsicTypes.Never);
    });

    this.transform(({node, factory}) => {
        if(!isNoSubstitutionTemplateLiteral(node.template)) return node.remove();

        const text = node.template.text.trim();
        const document = parse(text);

        node.replace(
            factory.createCallExpression(
                factory.createIdentifier("__gql_doc"),
                [],
                [
                    factory.createStringLiteral(JSON.stringify(document))
                ]
            )
        )
    });
}