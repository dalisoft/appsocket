import { connect } from 'unistore/preact';
import { actions } from '../../store';

import Content from './Content';

const ContentWrapper = ({ connections, ...actions }) => (
	<main className="app-layout__content">
		<Content connection={connections.find((conn) => conn.active)} actions={actions} key="content-wrapped" />
	</main>
);

const enhance = connect(
	'connections',
	actions
);

export default enhance(ContentWrapper);
