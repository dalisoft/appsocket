export default (store) => ({
	toggleContentSize: (state) => ({
		...state,
		contentSize: state.contentSize === 'full' ? 'content' : 'full'
	}),
	setActive: (state, id) => ({
		...state,
		connections: state.connections.map((connection) => {
			if (connection.id === id) {
				connection.active = true;
			} else {
				connection.active = false;
			}
			return connection;
		})
	}),
	addConnection: (state) => ({
		...state,
		connections: [
			...(state.connections || []),
			{
				id: state.connections.length > 0 ? Math.max(...state.connections.map((conn) => conn.id)) + 1 : 1,
				key: 'sess_connection_' + Math.round(Math.random() * 1e10).toString(36),
				active: false,
				reconnect: false,
				configuring: false,
				connected: false,
				type: 'ws',
				host: 'host',
				port: 80,
				path: '',
				messages: [],
				authStatus: null,
				authHeaders: [{ id: 1 }],
				authBody: [{ id: 1 }],
				authUrl: ''
			}
		]
	}),
	pushMessage: (state, id, type, message) => ({
		...state,
		connections: state.connections.map((connection) => {
			if (connection.id === id) {
				connection.messages.push({
					type,
					message
				});
			}
			return connection;
		})
	}),
	deleteConnection: (state, id) => ({
		...state,
		connections: state.connections.filter((connection) => connection.id !== id)
	}),
	setConnectionValue: (state, id, key, value) => ({
		...state,
		connections: state.connections.map((connection) => {
			if (connection.id === id) {
				connection[key] = value;
			}
			return connection;
		})
	})
});
