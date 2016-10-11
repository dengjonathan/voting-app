import React from 'react';
import ReactDOM from 'react-dom';

import App from '../src/App';
import Pair from '../src/components/Pair';

import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import testSetup from './test_helper.js';
testSetup();

describe('Voting Pair', () => {

  it('renders a pair of buttons', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Pair pair={['Trainspotting', '28 Days Later']}/>, div);
  });
});