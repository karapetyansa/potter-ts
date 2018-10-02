import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {IAppState} from "../core/store/mainReducer";
import {styled} from "../core/styledComponents";
import {setFilters} from "../modules/filters/filtersActions";
import {filterTypes, IFilterState} from "../modules/filters/filtersReducer";

const Container = styled<{}, "div">("div")`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const ContainerSearch = styled<{}, "div">("div")`
    margin: 5px 0px 5px 0px;
`;

const ContainerCase = styled<{}, "div">("div")`
    margin: 5px 0px 5px 0px;
`;

const Label = styled<{}, "label">("label")`
    color: ${(props) => props.theme.colors.white};
    margin-left: 10px;
`;

const mapState = (state: IAppState) => ({...state.filters});

const mapDispatch = (dispatch: Dispatch) => ({
    setFilters: (params: Partial<IFilterState>) => dispatch(setFilters(params))
});

interface IProps extends ReturnType<typeof mapState>, ReturnType<typeof mapDispatch> {}

export const Filters = connect(
    mapState,
    mapDispatch
)(
    class extends React.Component<IProps> {
        public render() {
            const {type, searchString, caseSensitive} = this.props;
            const options = filterTypes.map((filterType) => <option key={filterType}>{filterType}</option>);
            return (
                <Container>
                    <ContainerSearch>
                        <select value={type} onChange={this.onChangeType} style={{height: 21}}>
                            {options}
                        </select>
                        <input
                            type="text"
                            value={searchString}
                            onChange={this.onChangeSearchText}
                            placeholder={type === "name" ? "Character name" : "Character role"}
                        />
                    </ContainerSearch>
                    <ContainerCase>
                        <Label>Case sensitive:</Label>
                        <input
                            type="checkbox"
                            checked={caseSensitive}
                            onChange={this.onCaseSensitiveChange}
                            style={{marginRight: 10}}
                        />
                    </ContainerCase>
                </Container>
            );
        }
        private onChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
            this.props.setFilters({type: e.target.value as any});
        };
        private onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
            this.props.setFilters({searchString: e.target.value});
        };
        private onCaseSensitiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            this.props.setFilters({caseSensitive: e.target.checked});
        };
    }
);
