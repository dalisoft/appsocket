import Preact from 'preact';
import ws from '../../websockets';

class Configuration extends Preact.Component {
	handleHeaderChange(currentHeader) {
		return (e) => {
			const { connection, actions } = this.props;
			const { target } = e;
			const headers = connection.headers.map((header) => {
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

			actions.setConnectionValue(connection.id, 'headers', headers);

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

			actions.setConnectionValue(connection.id, 'headers', connection.headers.filter((header) => header.id !== id));
		};
	}
	render({ connection, actions }) {
		return (
			<form className="app__configurations">
				<h3 className="app__configuration-title">Headers</h3>
				{connection.headers.map((header) => (
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
