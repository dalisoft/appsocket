import createStore from 'unistore';
import actions from './actions';
import { saveAs } from 'file-saver';

let state = { session: 'session-' + Math.round(Math.random() * 1e10).toString(36), connections: [] };

const store = createStore(state);

if (typeof window !== 'undefined') {
	let sess;
	if ((sess = window.localStorage.getItem('session'))) {
		sess = JSON.parse(sess);
		store.setState(sess);
	}
	window.addEventListener('keydown', (e) => {
		if (e.ctrlKey) {
			if (e.key === 'o') {
				e.preventDefault();

				let inputElement = document.createElement('input');
				inputElement.type = 'file';
				inputElement.accept = 'text/json';

				inputElement.addEventListener('change', (e) => {
					const { files } = inputElement;
					const [file] = files;

					if (file.type !== 'text/json' && file.type !== 'application/json') {
						console.error('Invalid FileType');
						return;
					}

					let reader = new FileReader();
					reader.readAsText(file, 'UTF-8');
					reader.onload = function (evt) {
						try {
							const data = JSON.parse(evt.target.result);
							store.setState(data);
						} catch (e) {
							console.error('Session file was marlformed');
						}
					};
					reader.onerror = function (evt) {
						console.error('error reading file');
					};

					inputElement = null;
				});

				// dispatch a click event to open the file dialog
				inputElement.dispatchEvent(new MouseEvent('click'));
			} else if (e.key === 'd') {
				let blob = new Blob([JSON.stringify(sess)], { type: 'application/json;charset=utf-8' });
				saveAs(blob, state.session + '.json');
			}
		}
	});
}

store.subscribe(function subscribe(state) {
	if (typeof window !== 'undefined') {
		window.localStorage.setItem('session', JSON.stringify(state));
		window.addEventListener('unload', function unload() {
			store.unsubscribe(subscribe);
			window.removeEventListener('unload', unload);
		});
	}
});

export { store, actions };
