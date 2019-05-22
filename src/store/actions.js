export default (store) => ({
  setActive: (state, id) =>
    console.log({ state, id }) || {
      ...state,
      connections: state.connections.map((connection) => {
        if (connection.id === id) {
          connection.active = true;
        } else {
          connection.active = false;
        }
        return connection;
      }),
    },
});
