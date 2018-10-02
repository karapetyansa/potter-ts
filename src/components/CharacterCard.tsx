import * as React from "react";
import {ICharacter} from "../api/dto/characters";
import {styled} from "../core/styledComponents";
import {Omit} from "../types/interfaces";
import {CharacterProperty} from "./CharacterProperty";

const CharacterCardContainer = styled<{}, "div">("div")`
    box-sizing: border-box;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 5px;
    padding: 20px;
    :hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
    max-width: 500px;
    margin: 10px;
    background-color: ${(props) => props.theme.colors.white};
`;

type IProps = Omit<ICharacter, "_id" | "__v">;

export class CharacterCard extends React.Component<IProps> {
    public render() {
        const propsComponent = Object.keys(this.props).map((key) => (
            <CharacterProperty key={key} title={key} value={this.props[key]} />
        ));
        return <CharacterCardContainer>{propsComponent}</CharacterCardContainer>;
    }
}
