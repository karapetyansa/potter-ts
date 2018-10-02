import {styled} from "../core/styledComponents";

export const Button = styled<{}, "button">("button")`
    box-sizing: border-box;
    background-color: ${(props) => props.theme.colors.blueAccent};
    padding: 10px 40px 10px 40px;
    color: white;
    text-transform: uppercase;
`;
