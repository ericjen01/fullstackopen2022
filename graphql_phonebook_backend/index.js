const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const express = require("express");
const cors = require("cors");
//const bodyParser = require("body-parser");
const http = require("http");

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
//const Person = require("./models/person");
const User = require("./models/user");

require("dotenv").config();

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

/*
const trial_run_person = new Person({
  name: "trial_run_person",
  street: "test_street",
  city: "test_city",
  phone: "test_phone",
});

trial_run_person.save().then((testResult) => {
  console.log("trial_run_person saved to the MongoDB database!");
  console.log(testResult);
});
*/

/*app.get("/test", (req, res) => {
  Person.find({}).then((person) => {
    res.json(person);
    console.log(res.json(person));
  });
});*/

/*let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: "3d599470-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Venla Ruuska",
    phone: "040-432342",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: "3d599471-3436-11e9-bc57-8b80ba54c431",
  },
];*/

//http://localhost:3001/test
//actual url with <MY_PASSWORD> stored in dotenv file ".env", refer to .env_DUMMY
/*const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});*/

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connecting to MongoDB: ", err.message);
  });

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  // console.log("* httpServer: ", httpServer);

  //webstockserver object to listen the webstock connections, beside the usual http connections.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });
  //console.log("* wsServer: ", wsServer);
  //When queries and mutations are used, GraphQL uses the HTTP protocol in the communication. In case of subscriptions, the communication between client and server happens with WebSockets

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  // console.log("* schema: ", schema);
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    //definition registers a function that closes the WebSocket connection on server shutdown.
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  }); //server
  await server.start();

  app.use(
    "/",
    cors(), // resolves the issue with "blocked by CORS policy"
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        //console.log("req: ", req);
        //console.log("auth: ", auth);
        if (auth && auth.startsWith("Bearer ")) {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          );
          //Populate automatically replace specified path in document, w/ document(s) from other collection(s)
          //Try clg to find difference
          const currentUser = await User.findById(decodedToken.id).populate(
            "friends"
          );
          return { currentUser };
        } //if
      }, //context
    })
    /*.then(({ url }) => {
      console.log(`Server ready at ${url}`);
    }) //then*/
  ); //app.use

  const PORT = process.env.PORT;

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  );
}; //const start

start();
