// tslint:disable:no-default-export
declare module "react-virtual-list" {
    import {Component} from "react";
    class VirtualList extends Component {
        public props: {itemBuffer: number; itemHeight: number; items: any[]};
    }

    export default function(): (arg: any) => typeof VirtualList;
}
