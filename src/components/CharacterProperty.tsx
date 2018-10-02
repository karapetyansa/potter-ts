import * as React from "react";
import {styled} from "../core/styledComponents";
import {Text} from "../ui/Text";
import {TextTitle} from "../ui/TextTitle";

const PropsRow = styled<{}, "div">("div")`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 5px;
`;

interface IProps {
    title: string;
    value: string | boolean | number;
}
export class CharacterProperty extends React.PureComponent<IProps> {
    public render() {
        const {title, value} = this.props;

        return (
            <PropsRow>
                <TextTitle children={title} />
                <Text>{this.getValueString(value)}</Text>
            </PropsRow>
        );
    }
    public getValueString = (value: any) => {
        if (value === true) {
            return "yes";
        } else if (value === false) {
            return "no";
        } else {
            return value;
        }
    };
}
