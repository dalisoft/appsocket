import ws from '../websockets';

const connectWebSocket = (id, url, on = {}, reconnect) => {
	let socket;

	if (ws[id]) {
		socket = ws[id];

		if (on.beforeCloseOldConnection) {
			on.beforeCloseOldConnection(socket);
		}

		socket.onclose = (e) => {
			on.closeOldConnection(e);
		};

		socket.close();
	}

	socket = new WebSocket(url);

	socket.onopen = (e) => {
		ws[id] = socket;
		if (on.open) {
			on.open(e);
		}
	};
	socket.onmessage = on.message;
	socket.onerror = (e) => {
		if (reconnect) {
			connectWebSocket(id, url, on, reconnect);
		}
		else if (on.error) {
			on.error(e);
		}
	};
	socket.onclose = (e) => {
		if (reconnect && e.code !== 1005) {
			if (on.reconnect) {
				on.reconnect(e);
			}
			setTimeout(connectWebSocket, 1000, id, url, on, reconnect);
		}
		else {
			ws[id] = null;
			if (on.close) {
				on.close(e);
			}
		}
	};

	return socket;
};

export default connectWebSocket;
