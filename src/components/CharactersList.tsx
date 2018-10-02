import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {createSelector} from "reselect";
import {ICharacter} from "../api/dto/characters";
import {IAppState} from "../core/store/mainReducer";
import {loadCharacters} from "../modules/characters/charactersActions";

const mapState = createSelector(
    (state: IAppState) => state.characters,
    (characters) => {
        const charactersList = Object.keys(characters.data).map((key) => characters.data[key]);
        return {charactersList};
    }
);

const mapDispatch = (dispatch: Dispatch) => ({
    reload: () => dispatch(loadCharacters.started({}))
});

interface IProps extends ReturnType<typeof mapState>, ReturnType<typeof mapDispatch> {}

export const CharactersList = connect(
    mapState,
    mapDispatch
)(
    class extends React.Component<IProps> {
        public componentDidMount() {
            this.props.reload();
        }
        public render() {
            const {reload, charactersList} = this.props;
            return (
                <div>
                    <ul>{charactersList.map(this.renderCharacterItem)}</ul>
                    <button onClick={reload}>Reload</button>
                </div>
            );
        }
        private renderCharacterItem = ({_id, ...character}: ICharacter) => <li key={_id}>{character.name}</li>;
    }
);
