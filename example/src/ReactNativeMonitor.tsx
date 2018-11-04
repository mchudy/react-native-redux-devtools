import * as React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ActionList } from './ActionList';

const CONTAINER_HEIGHT = 250;

export class ReactNativeMonitor extends React.Component<any, any> {
  static update = (state: any) => state;

  render() {
    return (
      <View style={styles.container}>
        <ActionList {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: CONTAINER_HEIGHT,
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    backgroundColor: '#2A2F3A'
  }
});
