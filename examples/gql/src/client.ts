import type {DocumentNode} from "graphql";
interface GQLQueryResult<T> {
    data: T;
};

interface GQLMutationResult<T> {
    data: T;
};

interface GQLFragmentResult<T> {
    data: T;
};


type GQLFetchResult<T extends GQLQueryDefinition<any> | GQLMutationDefinition<any> | GQLFragmentDefinition<any>> = 
    T extends GQLQueryDefinition<infer TData> ? GQLQueryResult<TData> : T extends GQLMutationDefinition<infer TData> ? GQLMutationResult<TData> : T extends  GQLFragmentDefinition<infer TData> ? GQLFragmentResult<TData> : never;

const client = {
    async fetch<TDoc extends GQLQueryDefinition<any> | GQLMutationDefinition<any>>(doc: TDoc): Promise<GQLFetchResult<TDoc>> {
        const docNode = (doc as any).__doc as DocumentNode;

        console.log("fetching", docNode.kind);

        return {} as any;
    },
    use<TDoc extends GQLFragmentDefinition<any>>(doc: TDoc): GQLFragmentResult<TDoc> {
        const docNode = (doc as any).__doc as DocumentNode;

        console.log("using", docNode.kind);

        return {} as any;
    },
};


export default client;