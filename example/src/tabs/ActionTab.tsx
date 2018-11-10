import * as React from 'react';
import { Action } from '../state';
import JSONTree from 'react-native-json-tree';
import theme from '../themes';
import getJsonTreeTheme from './utils/getJsonTreeTheme';
import { View } from 'react-native';

export class ActionTab extends React.Component<ActionTabProps> {
  render() {
    const { action } = this.props;
    const treeTheme = getJsonTreeTheme(theme);
    return (
      <JSONTree data={action} hideRoot theme={treeTheme} invertTheme={false} />
    );
  }
}

interface ActionTabProps {
  action: Action;
}
