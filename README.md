# AppSocket

Lightweight, fast & simple WebSocket client

## Features

- Lightweight
- Fast / Performant
- Simple
- Responsive
- Session supported (only for this feature i did own app)
- LocalStorage saving
- Cross-browser (if you want use web-version)

## Installing

```bash
npm i
```

And that's all, nothing more need

## Running app

```bash
npm run app
```

**Note**: _App runs in production mode, so, any changes related to code not trigger app changes_

## Rendering

This app uses your system default browser engine, if you use macOS, then app embeds Safari or if you using Windows 10, then it embeds Microsoft Edge browser and so on.

## Session Open / Save (Download)

Session files are JSON encoded objects, arrays and primites which contains `websocket` items, url, host, messages and state

- You can now Load session by `ctrl + o` and select `your-session-file.json`
- You can Download session by `ctrl + d` and save your session file where you want

## TO-DO

- [ ] Implement Save session dialog like Open session dialog (i haven't idea)

## Credits

### Icons

Icons and/or Logo made by [Freepik](https://www.freepik.com/) from [www.flaticon.com](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)

### Libraries

- DeskApp (@patr0nus)
- Preact and Unistore (@developit)

And others who made great library and frameworks which used by this application. All packages can be seen in `package.json` (don't forget)

## License

MIT
