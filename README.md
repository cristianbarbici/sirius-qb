This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Tweaks for Sirius
### Without a backend
The data for the already filled in form comes from a JSON object copied from the real traffic from the real application, and is imported by the SplProcess directive. This way you don't need any running backend to experiment.
> Note: The copied data (found in src/Data folder) is not automatically updated, and will drift away from the "real thing" due to changes in the real environment.

### Towards the real backend
In order to run this against the real Contract POC backend, we must tweak the Sirius Splat Nginx Proxy configuration. The often used `itest.yml` in `uw-config` maps the proxy configuration to your local folder `~/docker-data/sirius-nginx/nginx.conf`.

Add the following two locations just above the "/config" location.

```
        # websocket upgrade support (for hot reload)
        location /react/sockjs-node {
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "Upgrade";
            proxy_set_header Host $host;
            proxy_pass http://host.docker.internal:3000;
        }

        location /react {
            proxy_pass http://host.docker.internal:3000;
        }
```

To notify the proxy of new configuration, either restart it (the container _sir-cfg-itest-nginx_, if started via configs itest), or send it a *HUP* signal (which for nginx means to reload configuration)

    docker kill --signal HUP sir-cfg-itest-nginx`

Also you need to set the environment variable WDS_SOCKET_PATH to indicate where the webpack development server websocket can be found, via `export WDS_SOCKET_PATH=/react/sockjs-node` before running `yarn start` or you'll get the error `WebSocket connection to 'ws://localhost:8000/sockjs-node' failed: Error during WebSocket handshake: Unexpected response code: 404`
This error causes the hot reload feature to stop working.

> Note: alternatively, change `location /react/sockjs-node` in nginx.conf to simply `location /sockjs-node`, but this makes it less clear to which application this location belongs.

Now, if the Splat+React app is started via `yarn start` it will be available both at [http://localhost:3000/react](http://localhost:3000/react) (from where it cannot access the contract backend due to CORS policy issues) and via the proxy also from [http://localhost:8000/react](http://localhost:8000/react) (from where the browser accepts both the React app and the contract backend as having the same origin).

### Backend communication
To enable the POC to work also without a running Splat backend, the application has two separate CreateQuickBusiness components. One wrapped in the SplProcess component (which uses the copied Splat state) and one wrapped in a SplStartProcess, which initially just contains a button "Start Contract POC". SplStartProcess otherwise functions just like SplProcess in that it provides process context for child components (the full process state, and a reducer/dispatcher method). It uses a slightly different reducer, though.

If this button is pressed, the app attempts to communicate with the backend to start a ContractPOCoverview (runs the start-process command) and then fetches messages until it sees the first TypeEventWithState message, which should contain valid TypeData for the process, and the initial state (mostly empty).

If we added navigation to the app, we could remove the button, and have SplStartProcess immediately do start-process. We could also require a backend connection, and simply have SplProcess handle starting. For the real thing we shouldn't need both SplStartProcess and SplProcess.

### Authentication issues
There's no feature for logging in to Splat via the React app, but as it shares origin with portal etc, just navigate to [the portal startpage](http://localhost:8000/portal/eda0ea26-6167-4cdb-9db4-1394d7fa2dbd/content/index.html) from where you'll be asked to login to keycloak, which will store a valid session cookie, which will also allow requests from the React app.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
