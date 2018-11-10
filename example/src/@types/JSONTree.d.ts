declare module 'react-native-json-tree' {
    import { Component } from 'react';

    export interface JSONTreeProps {
        data: any;
        theme?: any;
        sortObjectKeys?: boolean | ((a: any, b: any) => number);
        hideRoot?: boolean;
        invertTheme?: boolean;
        labelRenderer?: any;
        valueRenderer?: any;
        getItemString?: (type: string, data: any) => React.ReactElement;
        shouldExpandNode?: (keyName, data, level) => boolean;
        postprocessValue?: (value: any) => any;
        isCustomNode?: any;
    }

    export default class JSONTree extends React.Component<JSONTreeProps, any> {
        render(): JSX.Element;
    }
}