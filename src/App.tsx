import {ConnectedRouter} from "connected-react-router";
import * as React from "react";
import {Provider} from "react-redux";
import {Route, Switch} from "react-router-dom";
import "react-virtualized/styles.css";
import {PersistGate} from "redux-persist/integration/react";
import "./App.css";

import {CharactersList} from "./components/CharactersList";
import {Header} from "./components/Header";
import {configureStore} from "./core/store/configureStore";
import {ThemeProvider} from "./core/styledComponents";
import {theme} from "./core/theme";
import {PageContainer} from "./ui/PageContainer";

const {store, history, persistor} = configureStore();

export class App extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ConnectedRouter history={history}>
                        <ThemeProvider theme={theme}>
                            <React.Fragment>
                                <Switch>
                                    <PageContainer>
                                        <Header />
                                        <Route exact={true} path="/" component={CharactersList} />
                                    </PageContainer>
                                </Switch>
                            </React.Fragment>
                        </ThemeProvider>
                    </ConnectedRouter>
                </PersistGate>
            </Provider>
        );
    }
}
