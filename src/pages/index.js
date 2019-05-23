import Layout from '../components/Layout';
import { Provider } from 'unistore/react';
import { store } from '../store';

export default React.memo(() => (
  <Provider store={store}>
    <Layout />
  </Provider>
));
