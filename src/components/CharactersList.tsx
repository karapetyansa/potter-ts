import * as React from "react";
import {connect} from "react-redux";
import {CellMeasurer, CellMeasurerCache, List, ListRowRenderer, WindowScroller} from "react-virtualized";
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
        private cache: CellMeasurerCache;

        public componentDidMount() {
            this.props.reload();
        }

        public render() {
            this.cache = new CellMeasurerCache({
                fixedWidth: true,
                minHeight: 250
            });
            const {charactersList} = this.props;
            return (
                <CharactersListContainer>
                    <WindowScroller>
                        {({height, width, isScrolling, scrollTop}) => (
                            <div>
                                <List
                                    autoHeight={true}
                                    isScrolling={isScrolling}
                                    deferredMeasurementCache={this.cache}
                                    overscanRowCount={5}
                                    height={height}
                                    rowCount={charactersList.length}
                                    rowHeight={this.cache.rowHeight}
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
        // _rowRenderer({index, key, parent, style}) {
        //     const {getClassName, list} = this.props;

        //     const datum = list.get(index % list.size);
        //     const classNames = getClassName({columnIndex: 0, rowIndex: index});

        //     const imageWidth = 300;
        //     const imageHeight = datum.size * (1 + (index % 3));

        //     const source = `https://fillmurray.com/${imageWidth}/${imageHeight}`;

        //     return (
        //         <CellMeasurer cache={this._cache} columnIndex={0} key={key} rowIndex={index} parent={parent}>
        //             {({measure}) => (
        //                 <div className={classNames} style={style}>
        //                     <img
        //                         onLoad={measure}
        //                         src={source}
        //                         style={{
        //                             width: imageWidth
        //                         }}
        //                     />
        //                 </div>
        //             )}
        //         </CellMeasurer>
        //     );
        // }
        private renderCharacterItem: ListRowRenderer = ({index, parent, key, style}) => {
            const {_id, __v, ...character} = this.props.charactersList[index];
            return (
                <CellMeasurer cache={this.cache} columnIndex={0} key={key} rowIndex={index} parent={parent}>
                    <div key={_id} style={style}>
                        <CharacterCard {...character} />
                    </div>
                </CellMeasurer>
            );
        };
    }
);
