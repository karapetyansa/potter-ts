import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {loadCharacters} from "../modules/characters/charactersActions";
import {Button} from "../ui/Button";

const mapDispatch = (dispatch: Dispatch) => ({
    reload: () => dispatch(loadCharacters.started({}))
});

interface IProps extends ReturnType<typeof mapDispatch> {}

export const ReloadButton = connect(
    null,
    mapDispatch
)(
    class extends React.Component<IProps> {
        public componentDidMount() {
            this.props.reload();
        }

        public render() {
            const {reload} = this.props;
            return <Button onClick={reload}>Reload</Button>;
        }
    }
);
