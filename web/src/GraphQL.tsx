import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  });

  /*client
    .query({
      query: gql`
        query {
          checkMatchStatus(game: {playerId: "howdy", opponentId: "fine", data: "dwqdwq"})
        }
      `
    }).then(result => console.log(result));*/

  export default client;