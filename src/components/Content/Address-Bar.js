import cx from 'classnames';
import ws from '../../websockets';
import connectWebSocket from '../../helpers/connect-ws';

const AddressBar = ({ id, type, host, port, path, reconnect, connected, actions }) => {
	let socket = ws[id];
	const handleChange = (key) => (e) => {
		e.stopPropagation();
		let { value } = e.target;

		if (key === 'reconnect') {
			value = !reconnect;
		}
		actions.setConnectionValue(id, key, value);

		if (connected) {
			socket = ws[id];
			if (socket) {
				if (socket.readyState === socket.OPEN) {
					ws[id].close(1000);
				}
				return;
			}
		}
	};
	function handleConnect(e) {
		e.preventDefault();

		if (connected) {
			socket = ws[id];
			if (socket) {
				if (socket.readyState === socket.OPEN) {
					ws[id].close();
				}
				return;
			}
		}

		let url = type;
		url += '://';
		url += host;
		url += port;
		url += path;

		socket = connectWebSocket(
			id,
			url,
			{
				open() {
					actions.setConnectionValue(id, 'connected', true);
				},
				close() {
					actions.setConnectionValue(id, 'connected', false);
				},
				message(e) {
					actions.pushMessage(id, 'input', e.data);
				}
			},
			reconnect
		);
	}

	if (connected && (!socket || socket.readyState !== socket.OPEN)) {
		actions.setConnectionValue(id, 'connected', false);
		connected = false;
	}

	return (
		<form className="app__layout--form" onSubmit={handleConnect}>
			<select
				name="type"
				key="ws-type-field"
				value={type}
				className="app__layout--form-input app__layout--form-input-ws-type"
				onChange={handleChange('type')}
			>
				<option value="ws">ws://</option>
				<option value="wss">wss://</option>
			</select>
			<input
				name="host"
				key="host-field"
				value={host}
				className="app__layout--form-input app__layout--form-input-host"
				placeholder="Host"
				onInput={handleChange('host')}
			/>
			<input
				name="port"
				key="port-field"
				value={port}
				className="app__layout--form-input app__layout--form-input-port"
				placeholder="Port"
				onInput={handleChange('port')}
			/>
			<input
				name="path"
				key="path-field"
				value={path}
				className="app__layout--form-input app__layout--form-input-path"
				placeholder="Path"
				onInput={handleChange('path')}
			/>
			<button
				className={cx('app__layout--form-input', {
					'app__layout--form-input-connect-active': reconnect
				})}
				type="button"
				onClick={handleChange('reconnect')}
			>
				Reconnect
			</button>
			<button
				name="connect"
				key="connect-button"
				type="submit"
				className={cx('app__layout--form-input', 'app__layout--form-input-connect', {
					'app__layout--form-input-connect-active': connected
				})}
			>
				{connected ? 'Disconnect' : 'Connect'}
			</button>
		</form>
	);
};

export default AddressBar;
