import { connect } from 'unistore/preact';
import { actions } from '../../store';
import cx from 'classnames';

const Toolbar = ({ id, type, host, port, path, reconnect, connected, actions, ...props }) => {
	const handleChange = (key) => (e) => {
		actions.setConnectionValue(id, 'connected', false);
		actions.setConnectionValue(id, key, key === 'reconnect' ? e.target.checked : e.target.value);
	};
	return (
		<div className="toolbar-form">
			<select
				name="type"
				key="ws-type-field"
				value={type}
				className="input--default input__ws-type"
				onChange={handleChange('type')}
			>
				<option value="ws">ws://</option>
				<option value="wss">wss://</option>
			</select>
			<input
				name="host"
				key="host-field"
				value={host}
				className="input--default input__host"
				placeholder="Websocket host"
				onInput={handleChange('host')}
			/>
			<input
				name="port"
				key="port-field"
				value={port}
				className="input--default input__port"
				placeholder="Websocket port"
				onInput={handleChange('port')}
			/>
			<input
				name="path"
				key="path-field"
				value={path}
				className="input--default input__path"
				placeholder="Websocket path"
				onInput={handleChange('path')}
			/>
			<input
				id="reconnect-websocket"
				name="reconnect"
				key="reconnect-button"
				type="checkbox"
				className="input__reconnect"
				checked={reconnect}
				onChange={handleChange('reconnect')}
			/>
			<label htmlFor="reconnect-websocket" className="input__reconnect-btn">
				<button className="input--default input__connect">Reconnect</button>
			</label>
			<button
				name="connect"
				key="connect-button"
				type="button"
				className={cx('input--default input__connect', { 'input__connect-active': connected })}
			>
				Connect
			</button>
		</div>
	);
};

const Content = ({ actions, connection }) =>
	(connection && connection.id !== undefined && <Toolbar {...connection} actions={actions} key="content" />) || null;

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
