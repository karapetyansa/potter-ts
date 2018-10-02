import * as React from "react";
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {Dispatch} from "redux";
import {IAppState} from "../core/store/mainReducer";
import {loadCharacter} from "../modules/characters/charactersActions";
import {CharactersListContainer} from "../ui/CharactersListContainer";
import {CharacterCard} from "./CharacterCard";

const mapState = ({characters}: IAppState, {match}: RouteComponentProps<{id: string}>) => ({
    character: characters.data[match.params.id]
});
const mapDispatch = (dispatch: Dispatch) => ({
    load: (id: string) => dispatch(loadCharacter.started(id))
});

interface IProps
    extends ReturnType<typeof mapState>,
        ReturnType<typeof mapDispatch>,
        RouteComponentProps<{id: string}> {}

export const CharacterPage = connect(
    mapState,
    mapDispatch
)(
    class extends React.Component<IProps> {
        public componentDidMount() {
            this.props.load(this.props.match.params.id);
        }
        public render() {
            const {_id, __v, ...character} = this.props.character;
            return (
                <CharactersListContainer>
                    <CharacterCard {...character} />
                </CharactersListContainer>
            );
        }
    }
);
