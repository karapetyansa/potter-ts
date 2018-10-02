import {styled} from "../core/styledComponents";
import {Text} from "./Text";

export const TextName = styled(Text)`
    font-weight: 600;
    font-size: 20px;
    text-align: center;
    color: ${(props) => props.theme.colors.blueAccent};
`;
