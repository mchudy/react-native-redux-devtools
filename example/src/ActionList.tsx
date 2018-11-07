import * as React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { ActionListRow } from './ActionListRow';
import { ActionListHeader } from './ActionListHeader';
import { Action } from './state';

export class ActionList extends React.Component<ActionListProps> {
  private flatListRef: FlatList<any> | null = null;
  private baseTime: any;

  constructor(props: any) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.lastActionId !== prevProps.lastActionId) {
      this.flatListRef!.scrollToEnd();
    }
  }

  render() {
    const { actions, actionIds, onToggleAction, skippedActionIds,
          selectedActionId, startActionId, onSearch, searchValue, currentActionId,
          onCommit, onSweep, onJumpToState } = this.props;
    const lowerSearchValue = searchValue && searchValue.toLowerCase();
    const filteredActionIds = searchValue ? actionIds.filter(
    id => (actions[id] as any).action.type.toLowerCase().indexOf(lowerSearchValue) !== -1
    ) : actionIds;


    // const { onSearch, onCommit, onSweep, skippedActionIds, actionIds } = this.props;

    // this.baseTime = this.props.actionsById[
    //   this.props.stagedActionIds[0]
    // ].timestamp;
    // const actions = this.props.stagedActionIds.map((id: any) => ({
    //   ...this.props.actionsById[id],
    //   id
    // }));
    const filteredActions = filteredActionIds.map(actionId => (actions[actionId] as any).action) as any;

    return (
      <FlatList
        data={filteredActions}
        renderItem={this.renderItem}
        ref={(ref: any) => (this.flatListRef = ref)}
        keyExtractor={this.keyExtractor}
        ListHeaderComponent={<ActionListHeader 
        
            // onSearch={onSearch}
            // onCommit={onCommit}
            // onSweep={onSweep}
            // hasSkippedActions={skippedActionIds.length > 0}
            // hasStagedActions={actionIds.length > 1}
        />}
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
    console.warn(item);
    return item.toString();
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

interface ActionListProps {
    actions: {
      [id: number]: Action
    };
    actionIds: number[];
    lastActionId: number;
    onToggleAction: (actionId: number) => void;
    skippedActionIds: number[];
    selectedActionId: number | null;
    startActionId: null | number;
    // onSelect: (e: SyntheticMouseEvent, actionId: number) => void;
    onSearch: (searchStr: string) => void;
    searchValue?: string;
    currentActionId: number;
    onCommit: () => void;
    onSweep: () => void;
    onJumpToState: (actionId: number) => void;
  };
