import { Component } from 'preact';
import cx from 'classnames';

import ws from '../../websockets';

class MessageFormBar extends Component {
	setMessage = (messageText) => {
		this.setState({ messageText });
	};
	setFieldError = (fieldError) => {
		this.setState({ fieldError });
	};
	setBtnError = (btnError) => {
		this.setState({ btnError });
	};
	handleMessageInput = (e) => {
		const { value } = e.target;

		if (value.length > 0) {
			this.setFieldError(false);
		}
		this.setMessage(value);
	};
	handleMessagesClear = (e) => {
		e.preventDefault();
		const { id, actions } = this.props;

		actions.setConnectionValue(id, 'messages', []);
	};
	handleMessageSend = (e) => {
		e.preventDefault();
		const { id, actions } = this.props;
		const { messageText } = this.state;
		if (messageText.length > 0) {
			let socket = ws[id];
			if (socket && socket.readyState === socket.OPEN) {
				socket.send(messageText);
				actions.pushMessage(id, 'output', messageText);
				actions.setConnectionValue(id, 'configuring', false);
				this.setMessage('');
				this.setFieldError(false);
				this.setBtnError(false);
			}
			else {
				this.setBtnError(true);
			}
		}
		else {
			this.setFieldError(true);
		}
	};
	constructor(props) {
		super(props);

		this.state = { messageText: '', btnError: false, fieldError: false };
	}
	render(props, { messageText, btnError, fieldError }) {
		return (
			<form className="app__layout--form app__messages__message--send-bar" onSubmit={this.handleMessageSend}>
				<button
					name="send"
					key="send-button"
					type="button"
					className="app__layout--form-input"
					onClick={this.handleMessagesClear}
				>
					{'Clear Messages'}
				</button>
				<input
					name="message-text"
					key="message-text-field"
					value={messageText}
					className={cx('app__layout--form-input', 'app__layout--form-input-msg', {
						'app__layout--form-input-error': fieldError
					})}
					placeholder="Type message here"
					onInput={this.handleMessageInput}
				/>
				<button
					name="send"
					key="send-button"
					type="submit"
					className={cx('app__layout--form-input', {
						'app__layout--form-input-error': btnError
					})}
				>
					{'Send'}
				</button>
			</form>
		);
	}
}

export default MessageFormBar;
