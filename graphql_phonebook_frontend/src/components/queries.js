import { gql } from "@apollo/client";

export const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

//declaration of a PersonDetails fragment that can be used with any Person object
//every fragment includes a subset of the fields that belong to its associated type. the Person type must declare id, name, phone... etc fields for the PersonDetails fragment to be valid.
const PERSON_DETAILS = gql`
  fragment PersonDetails on Person {
    id
    name
    phone
    address {
      street
      city
    }
  }
`;

/*
export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      id
      name
      phone
      address {
        street
        city
      }
    }
  }
`;*/

// add fragment defination PERSON_DETAILS to FIND_PERSON gql template literal via placeholder ${}
// then include the PersonDetails fragment in query with standard ... notation
export const FIND_PERSON = gql`
  ${PERSON_DETAILS}
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      ...PersonDetails
    }
  }
`;

export const EDIT_NUMBER = gql`
  ${PERSON_DETAILS}
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      ...PersonDetails
    }
  }
`;

export const CREATE_PERSON = gql`
  ${PERSON_DETAILS}
  mutation createPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String!
  ) {
    addPerson(name: $name, street: $street, city: $city, phone: $phone) {
      ...PersonDetails
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const PERSON_ADDED = gql`
  subscription {
    personAdded {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`;
