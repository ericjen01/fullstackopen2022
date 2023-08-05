import ReactDOM from "react-dom/client";
import App from "./App";
import gql from "graphql-tag";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const authLink = setContext((_, { headers }) => {
  //"phonenumbers-user-token" set & defined by 'setItem' under effect hook in frontend LoginForm.js
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("phonenumbers-user-token");
  // console.log("*localStorage:", localStorage);
  // console.log("*token: ", token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});
//console.log("*authLink: ", authLink);

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});
//console.log("*httpLink: ", httpLink);

const wsLink = new GraphQLWsLink(createClient({ url: "ws://localhost:4000" }));
//console.log("wsLink: ", wsLink);
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);
console.log("splitLink: ", splitLink);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // link: authLink.concat(httpLink),
  link: splitLink,
});
//console.log("*client: ", client);
//console.log("*authLink.concat(httpLink): ", authLink.concat(httpLink));

/*const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});
*/

const query = gql`
  query {
    allPersons {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`;

client.query({ query }).then((response) => {
  // console.log("index.js response.data: "response.data);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
