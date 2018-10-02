import * as React from "react";
import {styled} from "../core/styledComponents";
// import {Button} from "../ui/Button";
import {Filters} from "./Filters";
import {ReloadButton} from "./ReloadButton";

const HeaderContainer = styled<{}, "header">("header")`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    background-color: ${(props) => props.theme.colors.slate};
    width: 100%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    padding: 10px 0px 10px 0px;
`;

export class Header extends React.Component {
    public render() {
        return (
            <HeaderContainer>
                <Filters />
                <ReloadButton />
            </HeaderContainer>
        );
    }
}
