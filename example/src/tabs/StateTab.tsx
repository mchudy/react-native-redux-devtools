import * as React from 'react';
import JSONTree from 'react-native-json-tree';
import getItemString from './utils/getItemString';

export class StateTab extends React.Component<StateTabProps> {
  render() {
    const { nextState, base16Theme, labelRenderer } = this.props;
    return (
      <JSONTree
        theme={base16Theme}
        data={nextState}
        getItemString={getItemString}
        invertTheme={false}
        labelRenderer={labelRenderer}
        hideRoot
      />
    );
  }
}

interface StateTabProps {
  nextState: Object;
  styling: any;
  base16Theme: any;
  labelRenderer: any;
}
