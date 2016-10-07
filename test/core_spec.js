import { List, Map } from 'immutable';
import { expect } from 'chai';
import { setEntries, next, vote } from '../src/core';

describe('app core logic', () => {
  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Trainspotting', '28 Days Later');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
    });
  });

  describe('next', () => {
    it('takes the next two entries to be voted on', () => {
      const state = Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      });
      const nextState = next(state);
      expect(nextState).to.equal(
        Map({
          vote: Map({
            pair: List.of('Trainspotting', '28 Days Later')
          }),
          entries: List.of('Sunshine')
        }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            "Trainspotting": 4,
            "28 Days Later": 2
          })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Sunshine', 'Millions'),
        }),
        entries: List.of('127 Hours', 'Trainspotting')
      }));
    });

    it('puts both entries from tied back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            "Trainspotting": 4,
            "28 Days Later": 4
          })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Sunshine', 'Millions'),
        }),
        entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
      }));
    });
  });

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            "Trainspotting": 3,
            "28 Days Later": 2
          })
        }),
        entries: List()
      });

      const nextState = vote(state, "Trainspotting");
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            "Trainspotting": 4,
            "28 Days Later": 2
          })
        }),
        entries: List()
      }));
    });
  });

});
