import { Component } from 'preact';
import cx from 'classnames';

import ws from '../../websockets';

class MessageFormBar extends Component {
	setMessage(messageText) {
		this.setState({ messageText });
	}
	setFieldError(fieldError) {
		this.setState({ fieldError });
	}
	constructor(props) {
		super(props);

		this.state = { messageText: '', fieldError: false };
	}
	render() {
		const { id, actions } = this.props;
		const { messageText, fieldError } = this.state;

		function handleMessageInput(e) {
			this.setMessage(e.target.value);
		}
		function handleMessageSend(e) {
			e.preventDefault();
			if (messageText.length > 0) {
				let socket = ws[id];
				if (socket) {
					if (socket.readyState === socket.OPEN) {
						socket.send(messageText);
					}
					else {
						console.error('Connection was closed before message sent');
					}
				}
				actions.pushMessage(id, 'output', messageText);
				this.setMessage('');
				this.setFieldError(false);
			}
			else {
				this.setFieldError(true);
			}
		}

		if (messageText.length > 0 && fieldError) {
			this.setFieldError(false);
		}

		return (
			<form className="app__layout--form app__messages__message--send-bar" onSubmit={handleMessageSend}>
				<input
					name="message-text"
					key="message-text-field"
					value={messageText}
					className={cx('app__layout--form-input', 'app__layout--form-input-msg', {
						'app__layout--form-input-error': fieldError
					})}
					placeholder="Type message here"
					onInput={handleMessageInput}
				/>
				<button name="send" key="send-button" type="submit" className="app__layout--form-input">
					{'Send'}
				</button>
			</form>
		);
	}
}

export default MessageFormBar;
