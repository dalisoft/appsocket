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
			}
			else {
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
				id: state.connections.length > 0 ? Math.max.apply(null, state.connections.map((conn) => conn.id)) + 1 : 1,
				key: 'sess_connection_' + Math.round(Math.random() * 1e10).toString(36),
				active: false,
				reconnect: false,
				connected: false,
				type: 'ws',
				host: '',
				port: 80,
				path: '/websocket',
				cache: {
					responses: [],
					messages: []
				}
			}
		]
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
