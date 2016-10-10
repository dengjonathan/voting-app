import { Map, List, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('can be used with reduce', () => {
    const actions = [
      { type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later'] },
      { type: 'NEXT' },
      { type: 'VOTE', entry: 'Trainspotting' },
      { type: 'VOTE', entry: '28 Days Later' },
      { type: 'VOTE', entry: 'Trainspotting' },
      { type: 'NEXT' }
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'Trainspotting'
    }));
  });

  it('will return an initial state when given undefined state', () => {
    const action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
    const state = reducer(undefined, action);
    expect(state).to.equal(fromJS({
      entries: ['Trainspotting']
    }))
  });

  it('handles action SET_ENTRIES', () => {
    const initialState = Map();
    const action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(Map({
      entries: List.of('Trainspotting')
    }))
  });

  it('handles action NEXT', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          'Trainspotting': 1,
          '28 Days Later': 3
        }
      },
      entries: ['Fight Club', 'Zootopia']
    });
    const nextState = reducer(initialState, { type: 'NEXT' });
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Fight Club', 'Zootopia'],
      },
      entries: ['28 Days Later']
    }));
  });

  it('handles action VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
      },
      entries: []
    });
    const nextState = reducer(initialState, { type: 'VOTE', entry: 'Trainspotting' });
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          'Trainspotting': 1
        }
      },
      entries: []
    }));
  });
});
