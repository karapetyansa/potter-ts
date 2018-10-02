import {connectRouter, routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";
import {applyMiddleware, compose, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {PersistConfig, persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware, {SagaMiddleware} from "redux-saga";
import {loadCharacterSaga, loadCharactersSaga} from "../../modules/characters/charactersSaga";
import {mainReducer} from "./mainReducer";

const persistConfig: PersistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, mainReducer);

const composeEnhancers =
    process.env.NODE_ENV === "production"
        ? compose
        : composeWithDevTools({
              shouldHotReload: false
          });

export function configureStore() {
    const history = createBrowserHistory();
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [sagaMiddleware, routerMiddleware(history)];
    const enhancer = composeEnhancers(applyMiddleware(...middleware));
    const store = createStore(connectRouter(history)(persistedReducer), enhancer);
    const persistor = persistStore(store);
    runSagas(sagaMiddleware);

    return {store, history, persistor};
}

const runSagas = (sagaMiddleware: SagaMiddleware<{}>) => {
    sagaMiddleware.run(loadCharactersSaga);
    sagaMiddleware.run(loadCharacterSaga);
};
