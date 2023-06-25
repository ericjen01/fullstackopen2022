import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const FIND_PERSON = gql`
	query findPersonByName($nameToSearch: String!) {
		findPerson(name: $nameToSearch) {
			name
			phone
			address {
				street
				city
			}
		}
	}
`;

const Person = ({ person, onClose }) => {
	return (
		<div>
			<h2>{person.name}</h2>
			{person.address.street} {person.address.city}
			<div>{person.phone}</div>
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
		return <Person person={result.data.findPerson} onClose={() => setNameToSearch(null)} />;
	}

	return (
		<div>
			<div>
				<h2>Persons</h2>
				{persons.map((p) => (
					<div key={p.name}>
						{p.name} {p.phone}
						<button onClick={() => setNameToSearch(p.name)}>show address</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Persons;
