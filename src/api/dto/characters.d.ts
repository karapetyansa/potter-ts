import {IError, Omit} from "../../types/interfaces";

export type Houses = "Gryffindor" | "Ravenclaw" | "Slytherin" | "Hufflepuff";

export type BloodStatus = "pure-blood" | "half-blood" | "muggle-born" | "unknown";

export interface ICharacter {
    _id: string;
    __v: number;
    name: string;
    house?: Houses;
    patronus?: string;
    species?: string;
    bloodStatus?: BloodStatus;
    role?: string;
    school?: string;
    deathEater?: boolean;
    dumbledoresArmy?: boolean;
    orderOfThePhoenix?: boolean;
    ministryOfMagic?: boolean;
    alias?: string;
    wand?: string;
    boggart?: string;
    animagus?: string;
}

export type ICharactersRequest = Omit<ICharacter, "_id" | "__v" | "name">;

export type ICharactersResponse = ICharacter[] | IError;
