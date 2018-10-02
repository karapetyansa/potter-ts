import {call, put, takeLatest} from "redux-saga/effects";
import {Action} from "typescript-fsa/src/index";
import {getCharacters} from "../../api/characters";
import {ICharactersRequest, ICharactersResponse} from "../../api/dto/characters";
import {loadCharacters} from "./charactersActions";

export function* loadCharactersSaga() {
    yield takeLatest(loadCharacters.started.type, loadCharactersAsync);
}

function* loadCharactersAsync({payload: params}: Action<ICharactersRequest>) {
    try {
        const result: ICharactersResponse = yield call(getCharacters, params);
        if (Array.isArray(result)) {
            yield put(loadCharacters.done({params, result}));
        } else {
            yield put(loadCharacters.failed({params, error: result.error}));
        }
    } catch (error) {
        yield put(loadCharacters.failed({params, error: error.message}));
    }
}
