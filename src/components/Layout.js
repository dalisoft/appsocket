import { Sidebar, Content } from './index';
import { connect } from 'unistore/preact';
import '../stylesheets/index.css';

const Layout = ({ sessionId }) => (
	<main className="app-layout" key={sessionId}>
		<Sidebar />
		<Content />
	</main>
);

const enhance = connect('sessionId');

export default enhance(Layout);
