const express = require("express");
const app = express();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
//const { v1: uuid } = require("uuid");
//import axios from "axios";
const User = require("./models/user");
const Person = require("./models/person");
const mongoose = require("mongoose");
require("dotenv").config();

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

//http://localhost:3001/test
//actual url with <MY_PASSWORD> stored in dotenv file ".env"
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});

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

app.get("/test", (req, res) => {
  Person.find({}).then((person) => {
    res.json(person);
    console.log(res.json(person));
  });
});

let persons = [
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
];

const typeDefs = `
enum YesNo {
	YES
	NO
  }

type User{
	username:String!
	friends: [Person!]!
	id: ID!
}

type Token{
	value: String!
}

type Address {
	street: String!
	city: String! 
}

type Person {
name: String!
phone: String!
address: Address
id: ID!
}

type Query {
personCount: Int!
allPersons(phone: YesNo): [Person!]!
findPerson(name: String!): Person
me: User
}

type Mutation {
  addPerson(
	  name: String!
	  phone: String
	  street: String!
	  city: String!
  ): Person,

  addAsFriend(
    name: String!
  ): User

  editNumber(
		name: String!
		phone: String!
  ): Person,
	  
  createUser(
		username: String!
  ): User,
	  
  login(
		username: String!
		password: String!
  ):Token
},
  
`;

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({});
      }
      return Person.find({ phone: { $exists: args.phone === "YES" } });
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Person: {
    address: ({ street, city }) => {
      return {
        street,
        city,
      };
    },
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      const person = new Person({ ...args });

      const currentUser = context.currentUser;
      console.log("mutation-addPerson- context: ", context);
      console.log(
        "mutation-addPerson- context.currentUser: ",
        context.currentUser
      );
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      try {
        await person.save();

        currentUser.friends = currentUser.friens.concat(person);
        await currentUser.save();

        //
      } catch (error) {
        throw new GraphQLError("saving person failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return person;
    },

    addAsFriend: async (root, args, { currentUser }) => {
      const isFriend = (person) =>
        currentUser.friends
          .map((f) => f._id.toString())
          .includes(person._id.toString());

      if (!currentUser) {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const person = await Person.findOne({ name: args.name });
      if (!isFriend(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }

      await currentUser.save();

      return currentUser;
    },

    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      person.phone = args.phone;
      try {
        await person.save();
      } catch (error) {
        throw new GraphQLError("editing number failed", {
          extensions: {
            code: "BAS_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      }
      return person;
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username });
      return user.save().catch((error) => {
        throw new GraphQLError("User Creation Failed", {
          extensions: { code: "BAD_USER_INPUT", invalidArgs: args.name, error },
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_NAME" },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id).populate(
        "friends"
      );
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
