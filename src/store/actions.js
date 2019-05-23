export default (store) => ({
  setActive: (state, id) => ({
    ...state,
    connections: state.connections.map((connection) => {
      if (connection.id === id) {
        connection.active = true;
      } else {
        connection.active = false;
      }
      return connection;
    }),
  }),
  deleteConnection: (state, id) => ({
    ...state,
    connections: state.connections.filter((connection) => connection.id !== id),
  }),
  setConnectionValue: (state, id, key, value) => ({
    ...state,
    connections: state.connections.map((connection) => {
      if (connection.id === id) {
        connection[key] = value;
      }
      return connection;
    }),
  }),
});
