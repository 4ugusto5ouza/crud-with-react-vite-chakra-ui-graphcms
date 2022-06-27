import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api-sa-east-1.graphcms.com/v2/cl4wpdo3q050m01ukdzl8h75f/master",
  cache: new InMemoryCache(),
});
