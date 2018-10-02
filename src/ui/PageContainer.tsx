import {styled} from "../core/styledComponents";

export const PageContainer = styled<{}, "div">("div")`
    display: flex;
    background-color: ${(props) => props.theme.colors.beige};
    justify-content: center;
`;
