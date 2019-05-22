import { Sidebar, Content } from './components';
import { connect } from 'unistore/react';

export default connect('sessionId, connections')(
  React.memo(({ sessionId }) => (
    <html key="html">
      <head key="head">
        <title>WebSocket client app</title>
        <link rel="stylesheet" href="/stylesheets/index.css" />
      </head>
      <body>
        <main className="app__layout" key={sessionId}>
          <Sidebar />
          <Content />
        </main>
      </body>
    </html>
  ))
);
