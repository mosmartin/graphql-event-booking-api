const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

// body parser middleware
app.use(bodyParser.json());

// graphql middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(name: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {},
    graphiql: true
  })
);

app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
