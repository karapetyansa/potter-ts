import {Success} from "typescript-fsa";
import {reducerWithInitialState} from "typescript-fsa-reducers";
import {ICharacter, ICharactersRequest} from "../../api/dto/characters";
import {loadCharacter, loadCharacters} from "./charactersActions";

interface ICharactersState {
    loading: boolean;
    data: {[key: string]: ICharacter};
    error: string;
}

const charactetsInitialState: ICharactersState = {
    data: {},
    error: "",
    loading: false
};

const loadCharactersDonedHandler = (
    state: ICharactersState,
    {result}: Success<ICharactersRequest, ICharacter[]>
): ICharactersState => {
    const data = result.reduce((acc, el) => ({...acc, [el._id]: el}), {});
    return {...state, data, loading: false};
};

export const charactersReducer = reducerWithInitialState(charactetsInitialState)
    .case(loadCharacters.started, (state) => ({...state, loading: true}))
    .case(loadCharacters.done, loadCharactersDonedHandler)
    .case(loadCharacters.failed, (state, {error}) => ({...state, error, loading: false}))
    .case(loadCharacter.started, (state) => ({...state, loading: true}))
    .case(loadCharacter.done, ({data, ...state}, {params: id, result}) => ({
        ...state,
        data: {...data, [id]: result},
        loading: false
    }))
    .case(loadCharacter.failed, (state, {error}) => ({...state, error, loading: false}));
