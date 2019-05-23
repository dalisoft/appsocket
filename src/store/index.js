import createStore from 'unistore';
import actions from './actions';

let state = { session: 'session-id__' + Math.round(Math.random() * 1e10).toString(36), connections: [] };

const store = createStore(state);

if (typeof window !== 'undefined') {
  let sess;
  if ((sess = window.localStorage.getItem('session'))) {
    sess = JSON.parse(sess);
    store.setState(sess);
  }
}

store.subscribe(function subscribe(state) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('session', JSON.stringify(state));
    window.addEventListener('unload', function unload() {
      store.unsubscribe(subscribe);
      window.removeEventListener('unload', unload);
    });
  }
});

export { store, actions };
