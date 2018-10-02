import {styled} from "../core/styledComponents";

export const Button = styled<{}, "div">("div")`
    box-sizing: border-box;
    background-color: ${(props) => props.theme.colors.blueAccent};
    padding: 10px 40px 10px 40px;
    color: white;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    :hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
    margin: 5px 0px 5px 0px;
`;
