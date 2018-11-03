import * as React from 'react';
import { createDevTools } from 'redux-devtools';
import { ReactNativeMonitor } from './ReactNativeMonitor';

export const DevTools = createDevTools(
    <ReactNativeMonitor />
);

export default DevTools;