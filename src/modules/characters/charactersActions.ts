import {actionCreatorFactory} from "typescript-fsa";
import {ICharacter, ICharactersRequest} from "../../api/dto/characters";

const charactersActionCreator = actionCreatorFactory("Characters");

export const loadCharacters = charactersActionCreator.async<ICharactersRequest, ICharacter[], string>("loadCharacters");
export const loadCharacter = charactersActionCreator.async<string, ICharacter, string>("loadCharacter");
