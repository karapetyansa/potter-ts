import {RouterState} from "connected-react-router";
import {combineReducers} from "redux";
import {charactersReducer} from "../../modules/characters/charactersReducer";

export const mainReducer = combineReducers({
    characters: charactersReducer
});

export interface IAppState extends ReturnType<typeof mainReducer> {
    router: RouterState;
}
