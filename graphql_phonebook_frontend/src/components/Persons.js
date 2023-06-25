//import { useState } from "react";
import { gql } from "@apollo/client";

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

const Persons = ({ persons }) => {
	return (
		<div>
			<h2>Persons</h2>
			{persons.map((p) => (
				<div key={p.name}>
					{p.name} {p.phone}
				</div>
			))}
		</div>
	);
};

export default Persons;
