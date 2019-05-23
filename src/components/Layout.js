import { Sidebar, Content, LayoutToggler } from './index';
import { connect } from 'unistore/preact';
import cx from 'classnames';
import '../stylesheets/index.css';

const Layout = ({ sessionId, contentSize }) => (
	<main className={cx('app-layout', { 'full-content': contentSize === 'full' })} key={sessionId}>
		<Sidebar />
		<Content />
		<LayoutToggler />
	</main>
);

const enhance = connect('sessionId, contentSize');

export default enhance(Layout);
