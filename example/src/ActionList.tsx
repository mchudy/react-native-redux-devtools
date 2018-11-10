import * as React from 'react';
import { FlatList, View } from 'react-native';
import { ActionListRow } from './ActionListRow';
import { ActionListHeader } from './ActionListHeader';
import { ActionsDict } from './state';
import bind from 'bind-decorator';

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

    // const { onSearch, onCommit, onSweep, skippedActionIds, actionIds } = this.props;

    // this.baseTime = this.props.actionsById[
    //   this.props.stagedActionIds[0]
    // ].timestamp;
    // const actions = this.props.stagedActionIds.map((id: any) => ({
    //   ...this.props.actionsById[id],
    //   id
    // }));

    return (
      <FlatList
        data={filteredActionIds}
        renderItem={this.renderItem}
        ref={(ref: any) => (this.flatListRef = ref)}
        keyExtractor={this.keyExtractor}
        ListHeaderComponent={
          <ActionListHeader

          // onSearch={onSearch}
          // onCommit={onCommit}
          // onSweep={onSweep}
          // hasSkippedActions={skippedActionIds.length > 0}
          // hasStagedActions={actionIds.length > 1}
          />
        }
        ItemSeparatorComponent={this.renderItemSeparator}
      />
    );
  }

  private keyExtractor(item: any) {
    return item.toString();
  }

  @bind
  private renderItemSeparator() {
    const { styling } = this.props;
    return <View {...styling('actionListItemSeparator')} />;
  }

  @bind
  private renderItem({ item: actionId }: any) {
    return (
      <ActionListRow
        key={actionId}
        isInitAction={!actionId}
        isInFuture={actionId > this.props.currentActionId}
        timestamps={getTimestamps(
          this.props.actions,
          this.props.actionIds,
          actionId
        )}
        action={(this.props.actions[actionId] as any).action}
        isSkipped={this.props.skippedActionIds.indexOf(actionId) !== -1}
        isSelected={false}
        styling={this.props.styling}
      />
    );
  }
}

interface ActionListProps {
  actions: ActionsDict;
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
  styling: any;
}
