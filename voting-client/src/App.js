import React, { Component } from 'react';
import logo from './logo.svg';

import Pair from './components/Pair'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    //this.state = store.getState(); //TODO get state
    // this.props = {
    //   //default props
    // }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      <Pair pair={[/*TODO get first two movies */]} />
      </div>
    );
  }
}

App.propTypes = {

}

App.defaultProps = {

}

export default App;
