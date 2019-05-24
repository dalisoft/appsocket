import cx from 'classnames';

const AddressBar = ({ id, type, host, port, path, reconnect, connected, actions }) => {
	const handleChange = (key) => (e) => {
		e.stopPropagation();
		let { value } = e.target;

		if (key === 'reconnect') {
			value = !reconnect;
		}
		actions.setConnectionValue(id, key, value);
		actions.setConnectionValue(id, 'connected', false);
	};
	function handleConnect(e) {
		e.preventDefault();
		console.log('submit called');
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
				placeholder="Websocket host"
				onInput={handleChange('host')}
			/>
			<input
				name="port"
				key="port-field"
				value={port}
				className="app__layout--form-input app__layout--form-input-port"
				placeholder="Websocket port"
				onInput={handleChange('port')}
			/>
			<input
				name="path"
				key="path-field"
				value={path}
				className="app__layout--form-input app__layout--form-input-path"
				placeholder="Websocket path"
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
