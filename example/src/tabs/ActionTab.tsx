import * as React from 'react';
import { Action } from '../state';
import JSONTree from 'react-native-json-tree';

export class ActionTab extends React.Component<ActionTabProps> {
  render() {
    const { action, base16Theme } = this.props;
    return (
      <JSONTree
        data={action}
        hideRoot
        theme={base16Theme}
        invertTheme={false}
      />
    );
  }
}

interface ActionTabProps {
  action: Action;
  styling: any;
  base16Theme: any;
}
