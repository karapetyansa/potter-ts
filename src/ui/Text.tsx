import {styled} from "../core/styledComponents";

export const Text = styled<{}, "span">("span")`
    font-size: 16px;
    color: ${(props) => props.theme.colors.slate};
`;
