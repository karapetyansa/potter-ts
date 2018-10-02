import {styled} from "../core/styledComponents";
import {Text} from "./Text";

export const TextTitle = styled(Text)`
    font-weight: 800;
    text-transform: capitalize;
    ::after {
        content: ":";
    }
    margin-right: 10px;
`;
