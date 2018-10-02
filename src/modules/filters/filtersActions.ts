import {actionCreatorFactory} from "typescript-fsa";
import {IFilterState} from "./filtersReducer";

const charactersActionCreator = actionCreatorFactory("Filters");

export const setFilters = charactersActionCreator<Partial<IFilterState>>("set");
export const resetFilters = charactersActionCreator<Partial<IFilterState>>("reset");
