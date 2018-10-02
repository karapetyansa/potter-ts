import {styled} from "../core/styledComponents";

export const Text = styled<{value?: any}, "span">("span")`
    font-size: 16px;
    color: ${(props) => {
        if (props.value === true) {
            return props.theme.colors.blueAccent;
        } else if (props.value === false) {
            return props.theme.colors.rose;
        } else {
            return props.theme.colors.slate;
        }
    }};
`;
