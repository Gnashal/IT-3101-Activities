import {ApolloClient, InMemoryCache, HttpLink, split } from '../../$node_modules/@apollo/client/index.js'
import {getMainDefinition} from '../../$node_modules/@apollo/client/utilities/index.js'
import { GraphQLWsLink } from "../../$node_modules/@apollo/client/link/subscriptions/index.js";
import { createClient } from "../../$node_modules/graphql-ws/dist/index.js";

const wsUrl = "ws://localhost:4002/graphql"
const wsLink = new GraphQLWsLink (
    createClient({
        url: wsUrl,
        onNonLazyError: (err) => console.error("WebSocket Error:", err),
        on: {
            opened: () => console.log("WebSocket connected! ✅"),
            closed: () => console.log("WebSocket disconnected! ❌"),
            message: (msg) => console.log("Message received:", msg),
        },
    }),
);  

const httpLink = new HttpLink({
    uri: 'http://localhost:4002/graphql' 
});

const splitLink = split(
    ({query}) => {
        const def = getMainDefinition(query);
        return (
            def.kind === 'OperationDefinition' &&
            def.operation === 'subscription'
        );
    },
    wsLink,
    httpLink
);
const client = new ApolloClient({
    link: splitLink,
    cache : new InMemoryCache(),
});

export default client;
