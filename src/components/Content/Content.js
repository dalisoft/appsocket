import { Fragment } from 'preact';

import AddressBar from './Address-Bar';
import MessagesList from './Messages-List';
import MessagesFormBar from './Message-Form-Bar';

const Content = ({ actions, connection }) =>
	(connection && connection.id !== undefined && (
		<Fragment key="content-fragment">
			<AddressBar {...connection} actions={actions} key="content" />
			{connection.messages && <MessagesList messages={connection.messages} key="messages-list" />}
			<MessagesFormBar id={connection.id} actions={actions} key="app__messages__message--send-bar" />
		</Fragment>
	)) ||
	null;

export default Content;
