import { connect } from 'unistore/preact';
import { actions } from '../store';

const LayoutToggler = ({ contentSize, toggleContentSize }) => (
	<span className="app-layout--toggler" onClick={toggleContentSize}>
		{contentSize === 'full' ? '»' : '«'}
	</span>
);

const enhance = connect('contentSize', actions);

export default enhance(LayoutToggler);
