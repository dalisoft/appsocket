import cx from 'classnames';

export default React.memo(({ key, active, type, host, port, path, reconnect, onDelete }) => (
  <div
    className={cx('app__sidebar_connection', {
      'app__sidebar_connection-active': active,
      'app__sidebar_connection-secure': type === 'wss',
    })}
    key={key}
  >
    <span className="app__sidebar_connection_host">{host}</span>
    <span className="app__sidebar_connection_port">{port}</span>
    <span className="app__sidebar_connection_path">{path}</span>
    <span
      className={cx('app__sidebar_connection_reconnect', { 'app__sidebar_connection_reconnect-active': reconnect })}
    />
    <span className="app__sidebar_connection_close">&times;</span>
  </div>
));
