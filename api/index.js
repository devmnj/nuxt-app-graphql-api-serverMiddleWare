const { ApolloServer, gql } = require("apollo-server-express");
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
import express from "express";
const app = express();
app.get("/", (req, res) => {
  res.json("Wlcome to API");
});

const typeDefs = gql`
  type Query {
    sayHello: String
  }
`;

const resolvers = {
  Query: {
    sayHello(parent, args, context) {
      return 'Hello World!';
    },
  },
};

// Apollo server instance
const server = new ApolloServer({ typeDefs, resolvers , plugins: [
         ApolloServerPluginLandingPageGraphQLPlayground({
             // options
         })
     ]},
  
  
  ); 
 server.start().then(res => {
  server.applyMiddleware({ app,path:"/graphql" });

});
 

export default { 
   handler: app,
   path:"/api"
 };
 