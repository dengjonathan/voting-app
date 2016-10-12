import testSetup from './test_helper.js';
testSetup();

import React from 'react';
import ReactDOM from 'react-dom';

import App from '../src/App';
import Voting from '../src/components/Pair';

import jsdom from 'jsdom';
import chai from 'chai';
import {expect} from 'chai';
import chaiImmutable from 'chai-immutable';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';


describe('Voting Pair', () => {

  it('can test render something into the document', () => {
    const component = renderIntoDocument(
      <Voting pair={['Trainspotting', '28 Days Later']}/>
    );
    expect(component).to.not.equal(null);
  });

  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={['Trainspotting', '28 Days Later']}/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'div');
    expect(component).to.equal(['button']);
    expect(buttons.length).to.equal(2);
    expected(buttons[0]).textContent.to.equal('Trainspotting');
    expect(buttons[1]).textContent.to.equal('28 Days Later');
  });

  it('invokes callback when button is clicked', () => {
    let votedWith;
    const vote = entry => votedWith = entry;
    const component = renderIntoDocument(<Voting pair={['Trainspotting', '28 Days Later']}/>);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).to.equal('Trainspotting');
  });
});