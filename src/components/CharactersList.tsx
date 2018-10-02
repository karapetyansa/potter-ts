import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {createSelector} from "reselect";
import {ICharacter} from "../api/dto/characters";
import {IAppState} from "../core/store/mainReducer";
import {loadCharacters} from "../modules/characters/charactersActions";

const mapState = createSelector(
    (state: IAppState) => state.characters.data,
    (state) => state.characters.loading,
    (charactersData, loading) => {
        const charactersList = Object.keys(charactersData).map((key) => charactersData[key]);
        return {charactersList, loading};
    }
);

const mapDispatch = (dispatch: Dispatch) => ({
    reload: () => dispatch(loadCharacters.started({}))
});

interface IProps extends ReturnType<typeof mapState>, ReturnType<typeof mapDispatch> {}

interface IState {
    currentPage: number;
    initLoad: boolean;
    currentScrollPage: number;
}

const scrollPortion = 16;

export const CharactersList = connect(
    mapState,
    mapDispatch
)(
    class extends React.Component<IProps, IState> {
        private containerRef: React.RefObject<HTMLUListElement>;
        constructor(props: IProps) {
            super(props);
            this.state = {currentPage: 0, initLoad: true, currentScrollPage: 0};
            this.containerRef = React.createRef();
        }
        public componentDidMount() {
            window.addEventListener("scroll", this.onScroll, false);

            this.props.reload();
        }
        public componentWillUnmount() {
            window.removeEventListener("scroll", this.onScroll, false);
        }
        public render() {
            const {reload, charactersList} = this.props;
            const {currentScrollPage} = this.state;
            const items = charactersList.slice(0, (currentScrollPage + 1) * scrollPortion);
            return (
                <div>
                    <ul ref={this.containerRef}>{items.map(this.renderCharacterItem)}</ul>
                    <button onClick={reload}>Reload</button>
                </div>
            );
        }
        private onScroll = () => {
            const containerDom = this.containerRef.current;
            if (containerDom !== null) {
                const {charactersList, loading} = this.props;
                const needScroll = window.innerHeight + window.scrollY >= containerDom.offsetHeight - 500;
                if (needScroll && charactersList.length > 0 && !loading) {
                    this.setState({currentScrollPage: this.state.currentScrollPage + 1});
                }
            }
        };
        private renderCharacterItem = ({_id, ...character}: ICharacter) => (
            <li key={_id} style={{marginTop: 50, marginBottom: 50}}>
                {character.name}
            </li>
        );
    }
);
