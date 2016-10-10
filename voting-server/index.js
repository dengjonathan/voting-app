import makeStore from './src/store';
import startServer from './src/server';
import fs from 'fs';

console.log('index called');

export const store = makeStore();
fs.writeFileSync('./logs.txt', JSON.stringify(store));
startServer(store);

store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});
store.dispatch({ type: 'NEXT' });

console.log(store.getState());
