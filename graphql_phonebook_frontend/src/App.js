import { useState } from "react";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import PhoneForm from "./components/PhoneForm";
import { ALL_PERSONS, PERSON_ADDED } from "./components/queries";
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

export const updateCache = (cache, query, addedPerson) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    };
  });
};

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const result = useQuery(ALL_PERSONS);
  //console.log("*App.js result= useQuery(ALL_PERSONS): ", result);
  //console.log("*App.js result.data: ", result.data);
  const client = useApolloClient();

  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      // console.log(data);
      const addedPerson = data.data.personAdded;
      notify(`user "${addedPerson.name}" added`);
      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson);

      /* client.cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
        return {
          allPersons: allPersons.concat(addedPerson),
          xx,
        };
      });*/
    }, //onData
  }); //useSubscription

  if (result.loading) {
    return <div>loading........</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  /* if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }*/
  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    );
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
};

export default App;
