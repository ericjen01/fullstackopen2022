//import { useState } from "react";
import { useQuery } from "@apollo/client";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonFrom";
import { ALL_PERSONS } from "./components/queries";

/*
const ALL_PERSONS = gql`
	query {
		allPersons {
			name
			phone
			id
		}
	}
`;
*/

const App = () => {
	const result = useQuery(ALL_PERSONS, { pollInterval: 2000 });

	if (result.loading) {
		return <div>loading........</div>;
	}

	return (
		<div>
			<Persons persons={result.data.allPersons} />
			<PersonForm />
		</div>
	);
};

export default App;
