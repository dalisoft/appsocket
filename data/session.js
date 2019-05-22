module.exports = {
  sessionId: 'session-id',
  connections: [
    {
      id: 1,
      key: 'sess_connection_id1',
      type: 'ws',
      host: 'localhost',
      port: 3501,
      path: '/websocket',
      reconnect: true,
      active: true,
      cache: {
        messages: [
          {
            id: 1,
            key: 'sess_message_id1',
            message: 'message query 1',
            time: '2019-05-22T13:19:24.539Z',
          },
          {
            id: 2,
            key: 'sess_message_id2',
            message: 'message query 1',
            time: '2019-05-22T13:19:24.539Z',
          },
        ],
        responses: [
          {
            id: 1,
            key: 'sess_response_id1',
            message: 'message response 1',
            time: '2019-05-22T13:19:24.539Z',
          },
        ],
      },
    },
    {
      id: 2,
      key: 'sess_connection_id2',
      type: 'wss',
      host: 'localhost',
      port: 3501,
      path: '/websocket',
      reconnect: false,
      active: false,
      cache: {
        messages: [
          {
            id: 1,
            key: 'sess_message_id1',
            message: 'message query 1',
            time: '2019-05-22T13:19:24.539Z',
          },
          {
            id: 2,
            key: 'sess_message_id2',
            message: 'message query 1',
            time: '2019-05-22T13:19:24.539Z',
          },
        ],
        responses: [
          {
            id: 1,
            key: 'sess_response_id1',
            message: 'message response 1',
            time: '2019-05-22T13:19:24.539Z',
          },
        ],
      },
    },
  ],
};
