import { connect } from 'unistore/preact';
import { actions } from '../../store';
import SidebarItem from './Sidebar-Item';

const Sidebar = ({ connections, setActive, deleteConnection, addConnection }) => {
	const handleActive = (id) => (e) => {
		e.stopPropagation();
		return setActive(id);
	};
	const handleDelete = (id) => (e) => {
		e.stopPropagation();
		return deleteConnection(id);
	};
	return (
		<aside className="app-layout__sidebar">
			{connections.map(
				({ key, id, ...props }) =>
					key && <SidebarItem key={key} {...props} onClick={handleActive(id)} onDelete={handleDelete(id)} />
			)}
			<span className="app-layout__sidebar--add-connection" onClick={addConnection}>
				ADD
			</span>
		</aside>
	);
};

const enhance = connect('connections', actions);
export default enhance(Sidebar);
