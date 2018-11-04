declare module 'react-native-json-tree' {
    import { Component } from 'react';

    export interface JSONTreeProps {
        data: any;
        theme?: any;
        sortObjectKeys?: any;
    }

    export default class JSONTree extends React.Component<JSONTreeProps, any> {
        render(): JSX.Element;
    }
}