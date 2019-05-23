import { Sidebar, Content } from '.';
import { connect } from 'unistore/react';
import '../stylesheets/index.css';

export default connect('sessionId')(
  React.memo(({ sessionId }) => (
    <main className="app-layout" key={sessionId}>
      <Sidebar />
      <Content />
    </main>
  ))
);
