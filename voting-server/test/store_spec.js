import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import makeStore from '../src/store';

describe('store', () => {
  it('is a Redux store configured with right reducer', () => {
    const store = makeStore();
    const entries = ['Trainspotting', '28 Days Later'];
    expect(store.getState()).to.equal(Map());
    store.dispatch({ type: 'SET_ENTRIES', entries: entries });
    expect(store.getState()).to.equal(fromJS({
      entries: ['Trainspotting', '28 Days Later']
    }));
  });
});
