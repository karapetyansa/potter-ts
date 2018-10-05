import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import VirtualList from "react-virtual-list";
import {Dispatch} from "redux";
import {createSelector} from "reselect";
import {ICharacter} from "../api/dto/characters";
import {IAppState} from "../core/store/mainReducer";
import {loadCharacters} from "../modules/characters/charactersActions";
import {CharactersListContainer} from "../ui/CharactersListContainer";
import {CharacterCard} from "./CharacterCard";

const mapState = createSelector(
    (state: IAppState) => state.characters.data,
    (state) => state.characters.loading,
    (state) => state.filters,
    (charactersData, loading, filters) => {
        const {type, searchString, caseSensitive} = filters;
        const charactersList = Object.keys(charactersData)
            .map((key) => charactersData[key])
            .filter((item) => {
                const itemFilteredProps = item[type];
                if (itemFilteredProps == null) {
                    return false;
                } else {
                    return caseSensitive
                        ? itemFilteredProps.indexOf(searchString) !== -1
                        : itemFilteredProps.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
                }
            });
        return {charactersList, loading};
    }
);

const mapDispatch = (dispatch: Dispatch) => ({
    reload: () => dispatch(loadCharacters.started({}))
});

interface IProps extends ReturnType<typeof mapState>, ReturnType<typeof mapDispatch> {}

const MyList = ({virtual}: {virtual: any}) => <ul style={virtual.style}>{virtual.items.map(renderItem)}</ul>;
const renderItem = ({_id, ...character}: ICharacter) => (
    <Link key={_id} to={`/${_id}`} style={{textDecoration: "none"}}>
        <CharacterCard {...character} />
    </Link>
);
const MyVirtualList = VirtualList()(MyList);

export const CharactersList = connect(
    mapState,
    mapDispatch
)(
    class extends React.Component<IProps> {
        public componentDidMount() {
            this.props.reload();
        }

        public render() {
            const {charactersList} = this.props;
            return (
                <CharactersListContainer>
                    <MyVirtualList itemBuffer={2} itemHeight={300} items={charactersList} />
                </CharactersListContainer>
            );
        }
    }
);
