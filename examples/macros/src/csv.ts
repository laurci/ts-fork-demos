import {Expression, IntrinsicTypes, isNoSubstitutionTemplateLiteral, TaggedTemplateMacro} from "compiler";

function parseCsv(str: string) {
    const lines = str.split("\n").map(x => x.trim()).filter(x => x.length > 0);
    return lines.map(line => {
        return line.split(",").map(x => x.trim()).map(x => {
            if(isNaN(Number(x))) {
                return x;
            }

            return Number(x);
        });
    });
}

export macro function csv(this: TaggedTemplateMacro, ..._args: any[]) {
    this.transform(({ node, factory }) => {        
        if(!isNoSubstitutionTemplateLiteral(node.template)) {
            return node.remove();
        }

        const text = node.template.text.trim();
        const rows = parseCsv(text);

        const header = rows[0] as string[];


        const elements: Expression[] = [];

        for(let idx = 1; idx < rows.length; idx++) {
            const contents: {name: string, data: string | number}[] = [];
            for(let head of header) {
                contents.push({ name: head, data: rows[idx][header.indexOf(head)] });
            }
            elements.push(factory.createObjectLiteralExpression(contents.map(x => {
                return factory.createPropertyAssignment(x.name, typeof x.data == "string" ? factory.createStringLiteral(x.data.toString()) : factory.createNumericLiteral(x.data));
            }), /* multiline */ true));
        }

        node.replace(factory.createCallExpression(factory.createIdentifier("__csv_create"), [], [
            factory.createArrayLiteralExpression(elements, /* multiline */ true)
        ]));
    });

    this.check(({ factory, node, diagnostic }) => {
        const template = node.template;
        if(!isNoSubstitutionTemplateLiteral(template)) {
            diagnostic("error", "expected template without substitutions");
            return factory.createIntrinsicDefinition(IntrinsicTypes.Never);
        }

        const text = template.text.trim();
        const csv = parseCsv(text);

        const headerParts = csv[0] as string[];
        const firstLineParts = csv[1];

        if(!headerParts || !firstLineParts) {
            diagnostic("error", "expected at least 2 lines");
            return factory.createIntrinsicDefinition(IntrinsicTypes.Never);
        }

        const objectType = factory.createObjectDefinition([]);

        if(headerParts.length < 1 || firstLineParts.length < 1) {
            return objectType;
        }
        

        for(let idx = 0; idx < headerParts.length; idx++) {
            const headerPart = headerParts[idx];
            const firstLinePart = firstLineParts[idx];

            objectType.members.push(factory.createObjectMemberDefinition(headerPart, factory.createIntrinsicDefinition(!firstLinePart ? IntrinsicTypes.Any : typeof firstLinePart == "number" ? IntrinsicTypes.Number : IntrinsicTypes.String)));
        }

        return factory.createGenericInstanceDefinition(factory.createGlobalReferenceDefinition("Csv", 1), [objectType]);
    });
}