import Preact from 'preact';

import cx from 'classnames';
import ws from '../../websockets';

import getHeaders from '../../helpers/get-headers';

class Configuration extends Preact.Component {
	handleHeaderChange(currentHeader) {
		return (e) => {
			const { connection, actions } = this.props;
			const { target } = e;
			const headers = connection.authHeaders.map((header) => {
				if (header.id === currentHeader.id) {
					return { ...header, [target.name]: target.value };
				}
				return header;
			});

			if (target.name === 'value' && target.value.length > 2 && currentHeader.name && currentHeader.name.length > 2) {
				const lastHeader = headers[headers.length - 1];
				if (lastHeader.id === currentHeader.id) {
					headers.push({ id: currentHeader.id + 1 });
				}
			}

			actions.setConnectionValue(connection.id, 'authHeaders', headers);

			let socket;
			if ((socket = ws[connection.id])) {
				if (socket.readyState === socket.OPEN) {
					socket.close(1000);
				}
			}
		};
	}
	removeHeader(id) {
		return (e) => {
			const { actions, connection } = this.props;

			actions.setConnectionValue(
				connection.id,
				'authHeaders',
				connection.authHeaders.filter((header) => header.id !== id)
			);
		};
	}
	handleUrlChange = (e) => {
		const { actions, connection } = this.props;
		const { value } = e.target;
		const { authUrl, authStatus } = connection;

		if (
			authStatus === 'error' &&
			(authUrl || (typeof authUrl === 'string' && (authUrl.startsWith('http') || authUrl.length > 6)))
		) {
			actions.setConnectionValue(connection.id, 'authStatus', null);
		}
		actions.setConnectionValue(connection.id, 'authUrl', value);
	};
	handleSubmitBtnColorReset = (stack) => {
		const { actions, connection } = this.props;
		let { authStatus } = connection;

		actions.setConnectionValue(connection.id, 'authStatus', null);

		if (!stack) {
			setTimeout(() => {
				actions.setConnectionValue(connection.id, 'authStatus', authStatus);
				setTimeout(this.handleSubmitBtnColorReset, 200, true);
			}, 200);
		}
	};
	handleSubmit = (e) => {
		e.preventDefault();

		const { actions, connection } = this.props;
		const { authUrl, authHeaders } = connection;

		if (!authUrl || (typeof authUrl === 'string' && (!authUrl.startsWith('http') || authUrl.length <= 6))) {
			actions.setConnectionValue(connection.id, 'authStatus', 'error');
			return;
		}

		actions.setConnectionValue(connection.id, 'authStatus', null);

		fetch(authUrl, {
			method: 'GET',
			credentials: 'include',
			headers: getHeaders(authHeaders)
		})
			.then(() => {
				actions.setConnectionValue(connection.id, 'authStatus', 'done');

				setTimeout(this.handleSubmitBtnColorReset, 200);
			})
			.catch((err) => {
				actions.setConnectionValue(connection.id, 'authStatus', 'error');
				console.error('AppSocket [Error]: ', err);

				setTimeout(this.handleSubmitBtnColorReset, 200);
			});
	};

	render({ connection, actions }) {
		return (
			<form className="app__configurations" onSubmit={this.handleSubmit}>
				<h3 className="app__configuration-title">URL</h3>
				<div key={'header-url'} className="app__configurations--item">
					<input
						name="name"
						key={'header-name-field-auth-url'}
						value={connection.authUrl}
						className={cx(
							'app__layout--form-input app__layout--form-input-url-field',
							connection.authStatus && 'app__layout--form-input-' + connection.authStatus
						)}
						placeholder="http://"
						onInput={this.handleUrlChange}
					/>
					<button
						className={cx(
							'app__layout--form-input ',
							connection.authStatus && 'app__layout--form-input-' + connection.authStatus
						)}
						type="submit"
					>
						Authorize
					</button>
				</div>
				<h3 className="app__configuration-title">Headers</h3>
				{connection.authHeaders &&
					connection.authHeaders.map((header) => (
						<div key={'header-' + header.id} className="app__configurations--item">
							<input
								name="name"
								key={'header-name-field-' + header.id}
								value={header.name}
								className="app__layout--form-input app__layout--form-input-header-field"
								placeholder="name"
								onInput={this.handleHeaderChange(header)}
							/>
							<input
								name="value"
								key={'header-value-field-' + header.id}
								value={header.value}
								className="app__layout--form-input app__layout--form-input-header-field"
								placeholder="value"
								onInput={this.handleHeaderChange(header)}
							/>
							<button className={'app__layout--form-input'} type="button" onClick={this.removeHeader(header.id)}>
								×
							</button>
						</div>
					))}
			</form>
		);
	}
}

export default Configuration;
