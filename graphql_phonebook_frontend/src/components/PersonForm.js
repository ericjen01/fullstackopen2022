import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_PERSONS, CREATE_PERSON } from "./queries";

/*
const CREATE_PERSON = gql`
	mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String!) {
		addPerson(name: $name, street: $street, city: $city, phone: $phone) {
			name
			phone
			id
			address {
				street
				city
			}
		}
	}
`;
*/

const PersonForm = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    // refetchQueries: [{ query: ALL_PERSONS }],
    onError: (err) => {
      const messages = err.graphQLErrors[0].message;
      let errorObject = null;
      let errorArray = null;

      if (err.graphQLErrors[0].extensions.error) {
        errorObject = err.graphQLErrors[0].extensions.error.errors;
        //console.log("errorObject: ", errorObject);
        errorArray = Object.entries(errorObject); //turns the errorObject into an Array for mapping
        //errorArray = Object.entries(errorObject).map((p) => p[1].message);
        //console.log("errorArray: ", errorArray);

        setError(() => {
          return (
            <div>
              <div>{messages}</div>
              {errorArray.map((p) => (
                <div>{p[1].message}</div>
              ))}
            </div>
          );
        }); //setError;
      } //if statement
    }, //onError,

    update: (cache, response) => {
      //callback function given a reference to the cache and the data returned by mutation as parameters. in this case, this would be the created person
      //updateQuery updates the query ALL_PERSONS in cache by adding the new person to the cached data.
      cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        return {
          allPersons: allPersons.concat(response.data.addPerson),
        };
      });
    },
  });

  const submit = (event) => {
    event.preventDefault();

    createPerson({
      variables: {
        name,
        street,
        city,
        phone: phone.length > 0 ? phone : "phone not provided",
      },
    });

    setName("");
    setPhone("");
    setStreet("");
    setCity("");
  };

  return (
    <div>
      <h2>Create a New Person</h2>
      <form onSubmit={submit}>
        <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone{" "}
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street{" "}
          <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          city{" "}
          <input
            value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type="submit">add!</button>
      </form>
    </div>
  );
};

export default PersonForm;
