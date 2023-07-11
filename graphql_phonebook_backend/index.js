const express = require("express");
const app = express();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
//const { v1: uuid } = require("uuid");
//import axios from "axios";

const Person = require("./models/person");
require("dotenv").config();
const mongoose = require("mongoose");

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
  }
  type Mutation {
	addPerson(
	  name: String!
	  phone: String
	  street: String!
	  city: String!
	): Person,
	editNumber(
		name: String!
		phone: String!
	  ): Person
  }
`;

const resolvers = {
  Query: {
    personCount: async () => persons.collection.countDocuments(),
    allPersons: (root, args) => {
      if (!args.phone) {
        return Person.find({});
      }
      return Person.find({ phone: { $exists: args.phone === "YES" } });
    },

    findPerson: async (root, args) => Person.findOne({ name: args.name }),
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
    addPerson: async (root, args) => {
      const person = new Person({ ...args });
      try {
        await person.save();
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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
