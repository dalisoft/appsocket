const { app, BrowserWindow, Menu, shell } = require('deskgap');

app.setName('AppSocket');

if (process.platform === 'darwin') {
	const myMenu = Menu.buildFromTemplate([
		...(process.platform === 'darwin'
			? [
				{
					label: app.getName(),
					submenu: [{ role: 'about', label: 'About' }, { type: 'separator' }, { role: 'quit', label: 'Quit' }]
				}
			  ]
			: []),
		{
			label: 'File',
			submenu: [{ label: 'Load session' }, { label: 'Save session' }, { type: 'separator' }, { role: 'quit' }]
		},
		{
			label: 'Help',
			submenu: [
				{
					label: 'GitHub Repo',
					click() {
						shell.openExternal('https://github.com/dalisoft/appsocket');
					}
				}
			]
		}
	]);
	Menu.setApplicationMenu(myMenu);
}

app.once('ready', () => {
	let win = new BrowserWindow({
		title: 'AppSocket',
		minWidth: 360,
		minHeight: 400,
		icon: 'build/assets/favicon.ico'
	});
	win.loadFile('build/index.html');

	win.on('closed', () => {
		win = null;
	});
});
