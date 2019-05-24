import { useState } from 'preact/hooks';
import cx from 'classnames';

import ws from '../../websockets';

const MessageFormBar = ({ id, actions }) => {
	const [messageText, setMessage] = useState('');
	const [fieldError, setFieldError] = useState(false);

	function handleMessageInput(e) {
		setMessage(e.target.value);
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
			setMessage('');
			setFieldError(false);
		}
		else {
			setFieldError(true);
		}
	}

	if (messageText.length > 0 && fieldError) {
		setFieldError(false);
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
};

export default MessageFormBar;
