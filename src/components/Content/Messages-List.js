import VirtualList from 'preact-virtual-list';

const renderRow = (row) => (
	<div className={'app__messages__message--item app__messages__message--item-' + row.type}>{row.message}</div>
);

const MessagesList = ({ messages }) => (
	<VirtualList
		data={messages}
		className="app__messages__list"
		renderRow={renderRow}
		rowHeight={23}
		key="messages-vlist"
	/>
);

export default MessagesList;
