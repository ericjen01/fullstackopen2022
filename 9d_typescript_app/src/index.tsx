import ReactDOM from 'react-dom/client'
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)



/*
import ReactDOM from 'react-dom/client'
import PropTypes from "prop-types";

interface WelcomeProps{
  name: string
}

// {name} as destructured prop from <Welcome name="Sarah"/>
// {name:string} as prop from WelcomeProps
// return type is JSX.Element
const Welcome = ({ name }: { name: string }): JSX.Element => (
  <h1>Hello, {name}</h1>
);

// type assertion "as HTMLElement". search 9d "type assertion" for explianation
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Welcome name="Sarah" />
)

*/