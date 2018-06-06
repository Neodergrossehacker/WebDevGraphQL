const { ApolloServer, gql } = require('apollo-server');
const axios = require ('axios');
//GraphQL Server
// kann man in verschiedenen sprachen aufsetzen beispielsweise php.
//passend zum wpm zeigen wirs euch mit javascript und node.js

//Apollo Server 2 beta
//"Out of the box" EXPRESS-Server Einrichtung
//(Node.js HTTP-Server mit Express-Framework), 
//dieser Hostet eure GraphQL API und den GraphQL Playground(per default mitgeliefert), 
//eine IDE(integrated development environment) die euch das schema und Querys testen lässt . 

//AXIOS
//Promise based HTTP client for the browser and node.js

//Make XMLHttpRequests from the browser
//Make http requests from node.js
//Supports the Promise API
//Intercept request and response
//Transform request and response data
//Cancel requests
//Automatic transforms for JSON data
//Client side support for protecting against XSRF

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