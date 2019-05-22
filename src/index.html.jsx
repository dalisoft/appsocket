import Layout from './layout.html.jsx';
import { Provider } from 'unistore/react';
import { store } from './store';

export default React.memo(() => (
  <Provider store={store}>
    <Layout />
  </Provider>
));
