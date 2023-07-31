import { useState } from "react";
import { useQuery } from "@apollo/client";
import { FIND_PERSON } from "./queries";

/*
const FIND_PERSON = gql`
	query findPersonByName($nameToSearch: String!) {
		findPerson(name: $nameToSearch) {
			name
			phone
			address {
				street
				city
			}
			id
		}
	}
`;
*/

const Person = ({ person, onClose }) => {
  // console.log("*Persons.js Person: ", person);
  return (
    <div>
      <h2>{person.name}</h2>
      <div>Street: {person.address.street}</div>
      <div>City: {person.address.city}</div>
      <div>Phone: {person.phone}</div>
      <div>id: {person.id}</div>
      <button onClick={onClose}>close</button>
    </div>
  );
};

const Persons = ({ persons, onClose }) => {
  const [nameToSearch, setNameToSearch] = useState(null);
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  });
  if (nameToSearch && result.data) {
    //console.log("*Persons.js result.data.findPerson: ", result.data.findPerson);
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setNameToSearch(null)}
      />
    );
  }

  return (
    <div>
      <div>
        <h2>Persons</h2>
        {persons.map((p) => (
          <div key={p.id}>
            {p.name} {p.phone}
            <button onClick={() => setNameToSearch(p.name)}>
              show address
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Persons;
