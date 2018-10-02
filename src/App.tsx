import {ConnectedRouter} from "connected-react-router";
import * as React from "react";
import {Provider} from "react-redux";
import {Route, Switch} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import "./App.css";

import {CharactersList} from "./components/CharactersList";
import {configureStore} from "./core/store/configureStore";
import {ThemeProvider} from "./core/styledComponents";
import {theme} from "./core/theme";
// tslint:disable-next-line:no-var-requires
const logo = require("./logo.svg");

const MainPage = () => (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
    </div>
);

const {store, history, persistor} = configureStore();

export class App extends React.Component {
    public render() {
        return (
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <ConnectedRouter history={history}>
                            <React.Fragment>
                                <MainPage />
                                <Switch>
                                    <Route exact={true} path="/" component={CharactersList} />
                                </Switch>
                            </React.Fragment>
                        </ConnectedRouter>
                    </PersistGate>
                </Provider>
            </ThemeProvider>
        );
    }
}
