import {reducerWithInitialState} from "typescript-fsa-reducers";
import {ICharacter} from "../../api/dto/characters";
import {resetFilters, setFilters} from "./filtersActions";

type FIlterType = keyof Pick<ICharacter, "role" | "name">;

export const filterTypes: FIlterType[] = ["name", "role"];

export interface IFilterState {
    type: FIlterType;
    searchString: string;
    caseSensitive: boolean;
}

const filterInitialState: IFilterState = {
    caseSensitive: false,
    searchString: "",
    type: "name"
};

const setFiltersHandler = (state: IFilterState, payload: Partial<IFilterState>): IFilterState => {
    if (payload.type != null && payload.type !== state.type && payload.searchString == null) {
        // tslint:disable-next-line:no-console
        console.log(payload);
        return {...state, ...payload, searchString: ""};
    } else {
        return {...state, ...payload};
    }
};

export const filtersReducer = reducerWithInitialState(filterInitialState)
    .case(setFilters, setFiltersHandler)
    .case(resetFilters, () => filterInitialState);
