import { useState } from "react";
import { useQuery } from "@apollo/client";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import PhoneForm from "./components/PhoneForm";
import { ALL_PERSONS } from "./components/queries";
import LoginForm from "./components/LoginForm";

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

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);

  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>loading........</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PhoneForm />

      <PersonForm setError={notify} />

      <LoginForm />
    </div>
  );
};

export default App;
