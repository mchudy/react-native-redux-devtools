import * as React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { ActionListRow } from './ActionListRow';
import { ActionListHeader } from './ActionListHeader';

export class ActionList extends React.Component<any> {
  private flatListRef: FlatList<any> | null = null;
  private baseTime: any;

  constructor(props: any) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.stagedActionIds.length > prevProps.stagedActionIds.length) {
      this.flatListRef!.scrollToEnd();
    }
  }

  render() {
    this.baseTime = this.props.actionsById[
      this.props.stagedActionIds[0]
    ].timestamp;
    const actions = this.props.stagedActionIds.map((id: any) => ({
      ...this.props.actionsById[id],
      id
    }));
    return (
      <FlatList
        data={actions}
        renderItem={this.renderItem}
        ref={(ref: any) => (this.flatListRef = ref)}
        keyExtractor={this.keyExtractor}
        ListHeaderComponent={<ActionListHeader />}
        ItemSeparatorComponent={() => (
          <View
            style={{
              backgroundColor: '#b0b0b0',
              height: StyleSheet.hairlineWidth
            }}
          />
        )}
      />
    );
  }

  private keyExtractor(item: any) {
    return item.id.toString();
  }

  private renderItem({ item }: any) {
    return (
      <ActionListRow
        key={item.id}
        id={item.id}
        action={item}
        baseTime={this.baseTime}
      />
    );
  }
}
