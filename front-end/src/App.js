import React from 'react';
import logo from './logo.svg';
import './App.css';

const API_URL = 'http://localhost:4000';

class App extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    superagent.get(`${API_URL}/foods`)
    .then(results => console.log(results.body))
  }

  render() {
    return(
      <>
      <ul>
        {
          <p>HI THERE!</p>
        }
      </ul>
      </>
    )
  }
}

export default App;
