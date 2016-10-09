import { List, Map } from 'immutable';

function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if (aVotes > bVotes) {
    return [a];
  } else if (bVotes > aVotes) {
    return [b];
  } else {
    return [a, b];
  }
}

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries')
    .concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
    // could have just returned a new map Map({winners: entries.first()})
    // but good to show what you explicity changed/removed, incase you add
    // other state in the future that's not meant to be altered by this functioin
    return state.remove('vote')
      .remove('entries')
      .set('winner', entries.first());
  }
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
