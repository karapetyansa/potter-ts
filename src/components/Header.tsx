import * as React from "react";
import {Route} from "react-router";
import {styled} from "../core/styledComponents";
// import {Button} from "../ui/Button";
import {Filters} from "./Filters";
import {ReloadButton} from "./ReloadButton";

const HeaderContainer = styled<{}, "header">("header")`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    background-color: ${(props) => props.theme.colors.slate};
    width: 100%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    padding: 5px 0px 5px 0px;
    min-height: 48px;
`;

export class Header extends React.Component {
    public render() {
        return (
            <HeaderContainer>
                <Route exact={true} path="/" component={Filters} />
                <Route exact={true} path="/" component={ReloadButton} />
            </HeaderContainer>
        );
    }
}
