import Layout from './components/Layout';
import { Provider } from 'unistore/preact';
import { store } from './store';

const App = () => (
	<Provider store={store}>
		<Layout />
	</Provider>
);

export default App;
