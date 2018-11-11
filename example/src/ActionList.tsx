import * as React from 'react';
import { FlatList, View } from 'react-native';
import { ActionListRow } from './ActionListRow';
import { ActionsDict } from './state';
import bind from 'bind-decorator';
import { ActionListHeader } from './ActionListHeader';

function getTimestamps(
  actions: ActionsDict,
  actionIds: number[],
  actionId: number
) {
  const idx = actionIds.indexOf(actionId);
  const prevActionId = actionIds[idx - 1];

  return {
    current: actions[actionId].timestamp,
    previous: idx ? actions[prevActionId].timestamp : 0
  };
}

export class ActionList extends React.Component<ActionListProps> {
  private flatListRef: FlatList<any> | null = null;

  componentDidUpdate(prevProps: any) {
    if (this.props.lastActionId !== prevProps.lastActionId) {
      this.flatListRef!.scrollToEnd();
    }
  }

  render() {
    const {
      actions,
      actionIds,
      onToggleAction,
      skippedActionIds,
      selectedActionId,
      startActionId,
      onSearch,
      searchValue,
      currentActionId,
      onCommit,
      onSweep,
      onJumpToState,
      styling
    } = this.props;
    const lowerSearchValue = searchValue && searchValue.toLowerCase();
    const filteredActionIds = searchValue
      ? actionIds.filter(
          id =>
            (actions[id] as any).action.type
              .toLowerCase()
              .indexOf(lowerSearchValue) !== -1
        )
      : actionIds;

    return (
      <FlatList
        style={{ flex: 1 }}
        data={filteredActionIds}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ref={(ref: any) => (this.flatListRef = ref)}
        ItemSeparatorComponent={this.renderItemSeparator}
        ListHeaderComponent={
          <ActionListHeader
            styling={styling}
            onSearch={onSearch}
            onCommit={onCommit}
            onSweep={onSweep}
            hasSkippedActions={skippedActionIds.length > 0}
            hasStagedActions={actionIds.length > 1}
          />
        }
      />
    );
  }

  private keyExtractor(item: number) {
    return item.toString();
  }

  @bind
  private renderItemSeparator() {
    const { styling } = this.props;
    return <View {...styling('actionListItemSeparator')} />;
  }

  @bind
  private renderItem({ item: actionId }: any) {
    const { startActionId, selectedActionId } = this.props;
    const isSelected =
      (startActionId !== null &&
        actionId >= startActionId &&
        actionId <= selectedActionId!) ||
      actionId === selectedActionId;

    return (
      <ActionListRow
        key={actionId}
        actionId={actionId}
        isInitAction={!actionId}
        isInFuture={actionId > this.props.currentActionId}
        timestamps={getTimestamps(
          this.props.actions,
          this.props.actionIds,
          actionId
        )}
        action={(this.props.actions[actionId] as any).action}
        isSkipped={this.props.skippedActionIds.indexOf(actionId) !== -1}
        isSelected={isSelected}
        styling={this.props.styling}
        onSelect={this.props.onSelect}
        onJumpClick={this.props.onJumpToState}
        onToggleClick={this.props.onToggleAction}
      />
    );
  }
}

interface ActionListProps {
  actions: ActionsDict;
  actionIds: number[];
  lastActionId: number;
  skippedActionIds: number[];
  selectedActionId: number | null;
  startActionId: null | number;
  searchValue?: string;
  currentActionId: number;
  onSearch: (searchStr: string) => void;
  onCommit: () => void;
  onSweep: () => void;
  onToggleAction: (actionId: number) => void;
  onJumpToState: (actionId: number) => void;
  onSelect: (actionId: number) => void;
  styling: any;
}
