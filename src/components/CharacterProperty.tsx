import * as changeCase from "change-case";
import * as React from "react";
import {styled} from "../core/styledComponents";
import {Text} from "../ui/Text";
import {TextName} from "../ui/TextName";
import {TextTitle} from "../ui/TextTitle";

const PropsRow = styled<{isName: boolean}, "div">("div")`
    display: flex;
    flex-wrap: wrap;
    justify-content: ${(props) => (props.isName ? "center" : "space-between")};
    margin-bottom: ${(props) => (props.isName ? "10px" : "5px")};
`;

interface IProps {
    title: string;
    value: string | boolean | number;
}
export class CharacterProperty extends React.PureComponent<IProps> {
    public render() {
        const {title, value} = this.props;

        return (
            <PropsRow isName={title === "name"}>
                {title === "name" && <TextName>{value}</TextName>}
                {title !== "name" && <TextTitle children={changeCase.sentence(title)} />}
                {title !== "name" && <Text value={value}>{this.getValueString(value)}</Text>}
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
