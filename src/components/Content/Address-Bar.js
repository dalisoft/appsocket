import Preact from 'preact';
import cx from 'classnames';
import ws from '../../websockets';
import connectWebSocket from '../../helpers/connect-ws';
import getHeaders from '../../helpers/get-headers';

class AddressBar extends Preact.Component {
	constructor(props) {
		super(props);

		this.handleConnect = this.handleConnect.bind(this);
		this.socket = ws[props.id];
	}
	async handleConnect(e) {
		const { id, type, host, port, path, reconnect, headers, connected, actions } = this.props;
		const { socket } = this;

		e.preventDefault();

		if (connected) {
			this.socket = ws[id];
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
		url += port ? ':' + port : '';
		url += path;

		this.socket = await connectWebSocket(
			id,
			url,
			{
				async beforeConnect() {
					await fetch(
						`${type === 'ws' ? 'http' : 'https'}://${host}${port ? ':' + port : ''}${path}`,
						{ method: 'GET' },
						getHeaders(headers)
					).catch((err) => {
						console.error('AppSocket [Error]: ', err);
					});
				},
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
	handleChange(key) {
		return (e) => {
			e.stopPropagation();
			const { id, reconnect, connected, configuring, actions } = this.props;
			let { socket } = this;
			let { value } = e.target;

			if (key === 'reconnect') {
				value = !reconnect;
			}
			else if (key === 'configuring') {
				value = !configuring;
			}
			actions.setConnectionValue(id, key, value);

			if (connected) {
				socket = ws[id];
				this.socket = socket;
				if (socket) {
					if (socket.readyState === socket.OPEN) {
						ws[id].close(1000);
					}
					return;
				}
			}
		};
	}
	render({ id, type, host, port, path, reconnect, configuring, connected, actions }) {
		if (connected && (!this.socket || this.socket.readyState !== this.socket.OPEN)) {
			actions.setConnectionValue(id, 'connected', false);
			connected = false;
		}

		return (
			<form className="app__layout--form" onSubmit={this.handleConnect}>
				<select
					name="type"
					key="ws-type-field"
					value={type}
					className="app__layout--form-input app__layout--form-input-ws-type"
					onChange={this.handleChange('type')}
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
					onInput={this.handleChange('host')}
				/>
				<input
					name="port"
					key="port-field"
					value={port}
					className="app__layout--form-input app__layout--form-input-port"
					placeholder="Port"
					onInput={this.handleChange('port')}
				/>
				<input
					name="path"
					key="path-field"
					value={path}
					className="app__layout--form-input app__layout--form-input-path"
					placeholder="Path"
					onInput={this.handleChange('path')}
				/>
				<button
					className={cx('app__layout--form-input', 'app__layout--form-input-reconnect-btn', {
						'app__layout--form-input-connect-active': reconnect
					})}
					type="button"
					onClick={this.handleChange('reconnect')}
				>
					Reconnect
				</button>
				<button
					className={cx('app__layout--form-input', 'app__layout--form-input-reconnect-btn', {
						'app__layout--form-input-connect-active': configuring
					})}
					type="button"
					onClick={this.handleChange('configuring')}
				>
					Configure
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
	}
}

export default AddressBar;
