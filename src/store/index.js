import createStore from 'unistore';
import state from './state';
import actions from './actions';

const store = createStore(state);
export { store, actions };
