import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {createSelector} from "reselect";
import {ICharacter} from "../api/dto/characters";
import {IAppState} from "../core/store/mainReducer";
import {loadCharacters} from "../modules/characters/charactersActions";
import {Button} from "../ui/Button";
import {PageContainer} from "../ui/PageContainer";
import {CharacterCard} from "./CharacterCard";
import {Filters} from "./Filters";

const mapState = createSelector(
    (state: IAppState) => state.characters,
    (state) => state.filters,
    (characters, filters) => {
        const {type, searchString, caseSensitive} = filters;
        const charactersList = Object.keys(characters.data)
            .filter((key) => {
                const item = characters.data[key];
                const itemFilteredProps = item[type];
                if (itemFilteredProps == null) {
                    return false;
                } else {
                    return caseSensitive
                        ? itemFilteredProps.indexOf(searchString) !== -1
                        : itemFilteredProps.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
                }
            })
            .map((key) => characters.data[key]);
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
                <PageContainer>
                    <Button onClick={reload} children="reload" style={{alignSelf: "flex-start"}} />
                    <Filters />
                    <div>{charactersList.map(this.renderCharacterItem)}</div>
                </PageContainer>
            );
        }
        private renderCharacterItem = ({_id, __v, ...character}: ICharacter) => (
            <CharacterCard key={_id} {...character} />
        );
    }
);
