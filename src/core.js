import { List, Map } from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries');
  return state.merge({
    vote: Map({ pair: entries.take(2) }),
    entries: entries.skip(2)
  });
}

export function vote(state, entry) {
  return state.updateIn(
    // enters nested State tree, initializes maps with 0 if don't exist
    // otherrrrrrrrrwise update by incrementing by 1.
    ['vote', 'tally', entry],
    0,
    tally => tally + 1
  );
}
