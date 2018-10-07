import { createDevTools } from 'redux-devtools';
import * as React from 'react';
import { Text } from 'react-native';

class ReactNativeMonitor extends React.Component {
    static update = (state: any) => state;

    constructor(props: any, context: any) {
        super(props, context);
        console.warn('ctor');
    }

    render() {
        console.warn(this.props);
        return <Text>Devtools</Text>;
    }
}

export const DevTools = createDevTools(
    <ReactNativeMonitor />
);

export default DevTools;