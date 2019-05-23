import cx from 'classnames';

const SidebarItem = ({ active, type, host, port, path, reconnect, onDelete, onClick }) => (
	<div
		className={cx('app-sidebar__connection', {
			'app-sidebar__connection-active': active,
			'app-sidebar__connection-secure': type === 'wss'
		})}
		onClick={onClick}
	>
		<span className="app-sidebar__connection--host">{host}</span>
		<span className="app-sidebar__connection--port">{port}</span>
		<span className="app-sidebar__connection--path">{path}</span>
		<span
			className={cx('icon--reconnect', 'app-sidebar__connection--reconnect', {
				'app-sidebar__connection--reconnect-active': reconnect
			})}
		/>
		<span className="app-sidebar__connection--close" onClick={onDelete}>
      &times;
		</span>
	</div>
);

export default SidebarItem;
