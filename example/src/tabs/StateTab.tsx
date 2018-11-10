import * as React from 'react';
import JSONTree from 'react-native-json-tree';
import getItemString from './utils/getItemString';

export class StateTab extends React.Component<StateTabProps> {
  render() {
    const { nextState, base16Theme } = this.props;
    return (
      <JSONTree
        theme={base16Theme}
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
  styling: any;
  base16Theme: any;
}
