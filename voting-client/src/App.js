import React, { Component } from 'react';
import logo from './logo.svg';

import Voting from './components/Pair'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      <Voting pair={['Trainspotting', '28 Days Later']} />
      </div>
    );
  }
}

App.propTypes = {

}

App.defaultProps = {

}

export default App;
