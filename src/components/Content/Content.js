/* eslint-disable react/jsx-no-undef */
import { connect } from 'unistore/react';
import { actions } from '../../store';
import cx from 'classnames';

const Toolbar = React.memo(({ id, type, host, port, path, reconnect, connected, actions, ...props }) => {
  const [isConnected, setConnect] = React.useState(connected);
  const handleChange = (key) => (e) => {
    setConnect(false);
    actions.setConnectionValue(id, 'connected', false);
    actions.setConnectionValue(id, key, key === 'reconnect' ? e.target.checked : e.target.value);
  };
  return (
    <form className="toolbar-form">
      <select
        name="type"
        key="ws-type-field"
        value={type}
        className="input--default input__ws-type"
        onChange={handleChange('type')}
      >
        <option value="ws">ws://</option>
        <option value="wss">wss://</option>
      </select>
      <input
        name="host"
        key="host-field"
        value={host}
        className="input--default input__host"
        placeholder="Websocket host"
        onChange={handleChange('host')}
      />
      <input
        name="port"
        key="port-field"
        value={port}
        className="input--default input__port"
        placeholder="Websocket port"
        onChange={handleChange('port')}
      />
      <input
        name="path"
        key="path-field"
        value={path}
        className="input--default input__path"
        placeholder="Websocket path"
        onChange={handleChange('path')}
      />
      <input
        id="reconnect-websocket"
        name="reconnect"
        key="reconnect-button"
        type="checkbox"
        className="input__reconnect"
        checked={reconnect}
        onChange={handleChange('reconnect')}
      />
      <label htmlFor="reconnect-websocket" className="input--default input__connect input__reconnect-btn">
        Reconnect
      </label>
      <button
        name="connect"
        key="connect-button"
        type="button"
        className={cx('input--default input__connect', { 'input__connect-active': isConnected })}
      >
        Connect
      </button>
    </form>
  );
});

const Content = React.memo(
  ({ cache, actions, connection }) =>
    (connection && connection.id !== undefined && <Toolbar {...connection} actions={actions} key="content" />) || null
);

const ContentWrapper = React.memo(({ connections, ...actions }) => (
  <main className="app-layout__content">
    <Content connection={connections.find((conn) => conn.active)} actions={actions} key="content-wrapped" />
  </main>
));

const enhance = connect(
  'connections',
  actions
);

export default enhance(ContentWrapper);
