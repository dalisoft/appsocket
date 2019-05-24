import { connect } from 'unistore/preact';
import { actions } from '../../store';

import Content from './Content';

const ContentWrapper = ({ connections, ...actions }) => (
	<Content connection={connections.find((conn) => conn.active)} actions={actions} key="content-wrapped" />
);

const enhance = connect(
	'connections',
	actions
);

export default enhance(ContentWrapper);
