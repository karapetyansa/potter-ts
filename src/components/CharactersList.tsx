import * as React from "react";
import {connect} from "react-redux";
import {List, ListRowRenderer, WindowScroller} from "react-virtualized";
import {Dispatch} from "redux";
import {createSelector} from "reselect";
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
                    <WindowScroller>
                        {({height, width, isScrolling, scrollTop}) => (
                            <div>
                                <List
                                    autoHeight={true}
                                    isScrolling={isScrolling}
                                    overscanRowCount={5}
                                    height={height}
                                    rowCount={charactersList.length}
                                    rowHeight={420}
                                    rowRenderer={this.renderCharacterItem}
                                    scrollTop={scrollTop}
                                    width={width - 20 > 500 ? 500 : width - 20}
                                />
                            </div>
                        )}
                    </WindowScroller>
                </CharactersListContainer>
            );
        }

        private renderCharacterItem: ListRowRenderer = ({index, isScrolling, key, style}) => {
            const {_id, __v, ...character} = this.props.charactersList[index];
            return (
                <div key={_id} style={style}>
                    <CharacterCard {...character} />
                </div>
            );
        };
    }
);
