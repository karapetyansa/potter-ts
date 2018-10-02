import {objectToQueryString} from "../core/utilities/objectToQueryString";
import {apiKey, baseUrl} from "../settings";
import {ICharacterResponse, ICharactersRequest, ICharactersResponse} from "./dto/characters";

export const getCharacters = async (request: ICharactersRequest) => {
    const url = `${baseUrl}characters?${objectToQueryString({
        ...request,
        key: apiKey
    })}`;

    try {
        const res = await fetch(url, {method: "get"});
        const resJson = (await res.json()) as ICharactersResponse;
        return resJson;
    } catch (error) {
        return null;
    }
};

export const getCharacter = async (id: string) => {
    const url = `${baseUrl}characters/${id}?${objectToQueryString({key: apiKey})}`;
    try {
        const res = await fetch(url, {method: "get"});
        const resJson = (await res.json()) as ICharacterResponse;
        return resJson;
    } catch (error) {
        return null;
    }
};
