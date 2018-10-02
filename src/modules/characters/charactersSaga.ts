import {call, put, takeEvery} from "redux-saga/effects";
import {Action} from "typescript-fsa/src/index";
import {getCharacter, getCharacters} from "../../api/characters";
import {ICharacterResponse, ICharactersRequest, ICharactersResponse} from "../../api/dto/characters";
import {loadCharacter, loadCharacters} from "./charactersActions";

export function* loadCharactersSaga() {
    yield takeEvery(loadCharacters.started.type, loadCharactersAsync);
}

export function* loadCharacterSaga() {
    yield takeEvery(loadCharacter.started.type, loadCharacterAsync);
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

function* loadCharacterAsync({payload: id}: Action<string>) {
    try {
        const result: ICharacterResponse = yield call(getCharacter, id);
        yield put(loadCharacter.done({params: id, result}));
    } catch (error) {
        yield put(loadCharacter.failed({params: id, error: error.message}));
    }
}
