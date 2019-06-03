import Preact from 'preact';

import cx from 'classnames';
import ws from '../../websockets';

import normaliseFields from '../../helpers/normalise-fields';

class Configuration extends Preact.Component {
	handleFieldChange(type, currentField) {
		return (e) => {
			const { connection, actions } = this.props;
			const { target } = e;
			const fields = connection[type].map((field) => {
				if (field.id === currentField.id) {
					return { ...field, [target.name]: target.value };
				}
				return field;
			});

			if (target.name === 'value' && target.value.length > 2 && currentField.name && currentField.name.length > 2) {
				const lastField = fields[fields.length - 1];
				if (lastField.id === currentField.id) {
					fields.push({ id: currentField.id + 1 });
				}
			}

			actions.setConnectionValue(connection.id, type, fields);

			let socket;
			if ((socket = ws[connection.id])) {
				if (socket.readyState === socket.OPEN) {
					socket.close(1000);
				}
			}
		};
	}
	removeField(type, id) {
		return (e) => {
			const { actions, connection } = this.props;

			actions.setConnectionValue(connection.id, type, connection[type].filter((field) => field.id !== id));
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
		const { authUrl, authHeaders, authBody } = connection;

		if (!authUrl || (typeof authUrl === 'string' && (!authUrl.startsWith('http') || authUrl.length <= 6))) {
			actions.setConnectionValue(connection.id, 'authStatus', 'error');
			return;
		}

		actions.setConnectionValue(connection.id, 'authStatus', null);

		fetch(authUrl, {
			method: 'POST',
			credentials: 'include',
			headers: normaliseFields(authHeaders),
			body: JSON.stringify(normaliseFields(authBody))
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
					connection.authHeaders.map((header, index) => {
						const handleInput = this.handleFieldChange('authHeaders', header);
						return (
							<div key={'header-' + header.id} className="app__configurations--item">
								<input
									name="name"
									key={'header-name-field-' + header.id}
									value={header.name}
									className="app__layout--form-input app__layout--form-input-header-field"
									placeholder="name"
									onInput={handleInput}
								/>
								<input
									name="value"
									key={'header-value-field-' + header.id}
									value={header.value}
									className="app__layout--form-input app__layout--form-input-header-field"
									placeholder="value"
									onInput={handleInput}
								/>
								<button
									className={'app__layout--form-input'}
									type="button"
									onClick={this.removeField('authHeaders', header.id)}
									disabled={index === 0}
								>
									×
								</button>
							</div>
						);
					})}
				<h3 className="app__configuration-title">Body</h3>
				{connection.authBody &&
					connection.authBody.map((body, index) => {
						const handleInput = this.handleFieldChange('authBody', body);
						return (
							<div key={'body-' + body.id} className="app__configurations--item">
								<input
									name="name"
									key={'body-name-field-' + body.id}
									value={body.name}
									className="app__layout--form-input app__layout--form-input-header-field"
									placeholder="name"
									onInput={handleInput}
								/>
								<input
									name="value"
									key={'body-value-field-' + body.id}
									value={body.value}
									className="app__layout--form-input app__layout--form-input-header-field"
									placeholder="value"
									onInput={handleInput}
								/>
								<button
									className={'app__layout--form-input'}
									type="button"
									onClick={this.removeField('authBody', body.id)}
									disabled={index === 0}
								>
									×
								</button>
							</div>
						);
					})}
			</form>
		);
	}
}

export default Configuration;
