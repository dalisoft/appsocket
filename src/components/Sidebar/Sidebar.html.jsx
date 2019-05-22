import { connect } from 'unistore/react';
import { actions } from '../../store';
import SidebarItem from './Sidebar-Item.html.jsx';

const Sidebar = React.memo(({ connections, setActive }) => (
  <aside className="app__layout_sidebar">
    {connections.map(({ key, id, ...props }) => (
      <SidebarItem key={key} onClick={() => setActive(id)} />
    ))}
  </aside>
));

const enhance = connect(
  'connections',
  actions
);
export default enhance(Sidebar);
