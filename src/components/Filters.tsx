import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {IAppState} from "../core/store/mainReducer";
import {setFilters} from "../modules/filters/filtersActions";
import {filterTypes, IFilterState} from "../modules/filters/filtersReducer";

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
                <div style={{display: "flex"}}>
                    <select value={type} onChange={this.onChangeType}>
                        {options}
                    </select>
                    <input
                        type="text"
                        value={searchString}
                        onChange={this.onChangeSearchText}
                        placeholder={type === "name" ? "Character name" : "Character role"}
                    />
                    <label style={{marginLeft: 10}}>Case sensitive:</label>
                    <input type="checkbox" checked={caseSensitive} onChange={this.onCaseSensitiveChange} />
                </div>
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
