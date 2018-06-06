const { ApolloServer, gql } = require('apollo-server');
const axios = require ('axios');


// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    getComment:[Comment]
  }
  type Comment{
      id:String
      name:String
      email:String
      body:String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
      getComment:(obj, args, context,info)=>{
    return axios.get('https://jsonplaceholder.typicode.com/comments').
    then(function(response){
        console.log(response.data)
        return response.data
    })
}
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

//This `listen` method launches a web-server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});