import * as React from 'react';
import JSONTree from 'react-native-json-tree';
import themes from '../themes';
import getItemString from './utils/getItemString';

export class StateTab extends React.Component<StateTabProps> {
  render() {
    const { nextState } = this.props;
    return (
      <JSONTree
        theme={themes}
        data={nextState}
        getItemString={getItemString}
        invertTheme={false}
        hideRoot
      />
    );
  }
}

interface StateTabProps {
  nextState: Object;
}
