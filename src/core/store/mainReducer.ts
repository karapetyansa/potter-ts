import {RouterState} from "connected-react-router";
import {combineReducers} from "redux";
import {charactersReducer} from "../../modules/characters/charactersReducer";
import {filtersReducer} from "../../modules/filters/filtersReducer";

export const mainReducer = combineReducers({
    characters: charactersReducer,
    filters: filtersReducer
});

export interface IAppState extends ReturnType<typeof mainReducer> {
    router: RouterState;
}
