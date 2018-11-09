import * as React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ActionList } from './ActionList';
import { Dispatch, Action } from 'redux';
import { Delta } from 'jsondiffpatch';
import createDiffPatcher, {
  PropertyFilter,
  ObjectHash
} from './createDiffPatcher';
import { MonitorState, Tab, TabName } from './state';
import { reducer, updateMonitorState } from './redux';
const ActionCreators = require('redux-devtools').ActionCreators;
import bind from 'bind-decorator';
import getInspectedState from './utils/getInspectedState';
import { ActionPreview } from './ActionPreview';

const CONTAINER_HEIGHT = 250;

const {
  commit,
  sweep,
  toggleAction,
  jumpToAction,
  jumpToState
} = ActionCreators;

function getLastActionId(props: ReactNativeMonitorProps) {
  return props.stagedActionIds[props.stagedActionIds.length - 1];
}

function getCurrentActionId(
  props: ReactNativeMonitorProps,
  monitorState: MonitorState
) {
  return monitorState.selectedActionId === null
    ? props.stagedActionIds[props.currentStateIndex]
    : monitorState.selectedActionId;
}

function getFromState(
  actionIndex: number,
  stagedActionIds: number[],
  computedStates: AppState[],
  monitorState: MonitorState
) {
  const { startActionId } = monitorState;
  if (startActionId === null) {
    return actionIndex > 0 ? computedStates[actionIndex - 1] : null;
  }
  let fromStateIdx = stagedActionIds.indexOf(startActionId - 1);
  if (fromStateIdx === -1) fromStateIdx = 0;
  return computedStates[fromStateIdx];
}

function createIntermediateState(
  props: ReactNativeMonitorProps,
  monitorState: MonitorState
) {
  const {
    supportImmutable,
    computedStates,
    stagedActionIds,
    actionsById: actions,
    diffObjectHash,
    diffPropertyFilter
  } = props;
  const { inspectedStatePath, inspectedActionPath } = monitorState;
  const currentActionId = getCurrentActionId(props, monitorState);
  const currentAction =
    actions[currentActionId] && (actions[currentActionId] as any).action;

  const actionIndex = stagedActionIds.indexOf(currentActionId);
  const fromState = getFromState(
    actionIndex,
    stagedActionIds,
    computedStates,
    monitorState
  );
  const toState = computedStates[actionIndex];
  const error = toState ? toState.error : null;

  const fromInspectedState =
    !error && fromState
      ? getInspectedState(fromState.state, inspectedStatePath, supportImmutable)
      : null;
  const toInspectedState =
    !error && toState
      ? getInspectedState(toState.state, inspectedStatePath, supportImmutable)
      : null;
  const delta =
    fromInspectedState && toInspectedState
      ? createDiffPatcher(diffObjectHash, diffPropertyFilter).diff(
          fromInspectedState,
          toInspectedState
        )
      : null;

  return {
    delta,
    nextState:
      toState && getInspectedState(toState.state, inspectedStatePath, false),
    action: getInspectedState(currentAction, inspectedActionPath, false),
    error
  };
}

export class ReactNativeMonitor extends React.Component<
  ReactNativeMonitorProps,
  ReactNativeMonitorState
> {
  static update = reducer;
  static defaultProps = {
    select: (state: any) => state,
    supportImmutable: false
  };

  constructor(props: ReactNativeMonitorProps) {
    super(props);

    this.state = createIntermediateState(props, props.monitorState) as any;
  }

  updateMonitorState(monitorState: any) {
    this.props.dispatch(updateMonitorState(monitorState));
  }

  componentWillReceiveProps(nextProps: ReactNativeMonitorProps) {
    let nextMonitorState = nextProps.monitorState;
    const monitorState = this.props.monitorState;

    if (
      getCurrentActionId(this.props, monitorState) !==
        getCurrentActionId(nextProps, nextMonitorState) ||
      monitorState.startActionId !== nextMonitorState.startActionId ||
      monitorState.inspectedStatePath !== nextMonitorState.inspectedStatePath ||
      monitorState.inspectedActionPath !== nextMonitorState.inspectedActionPath
    ) {
      this.setState(createIntermediateState(
        nextProps,
        nextMonitorState
      ) as any);
    }
  }

  render() {
    const {
      stagedActionIds: actionIds,
      actionsById: actions,
      computedStates,
      skippedActionIds,
      currentStateIndex,
      monitorState,
    } = this.props;
    const {
      selectedActionId,
      startActionId,
      searchValue,
      tabName
    } = monitorState;
    // const inspectedPathType =
    //   tabName === 'Action' ? 'inspectedActionPath' : 'inspectedStatePath';
    const { action, nextState, delta, error } = this.state;

    return (
      <View style={styles.container}>
        <ActionList
          {...{
            actions,
            actionIds,
            searchValue,
            selectedActionId,
            startActionId
          } as any}
          onSearch={this.handleSearch}
          onToggleAction={() => {}}
          onJumpToState={() => {}}
          onCommit={() => {}}
          onSweep={() => {}}
          skippedActionIds={skippedActionIds}
          currentActionId={actionIds[currentStateIndex]}
          lastActionId={getLastActionId(this.props)}
        />
        <ActionPreview
          {...{
            delta,
            error,
            nextState,
            computedStates,
            action,
            actions,
            selectedActionId,
            startActionId,
            tabName
          } as any}
          onInspectPath={() => null}
          inspectedPath={[]}
          onSelectTab={this.handleSelectTab}
        />
      </View>
    );
  }

  @bind
  private handleSearch(value: string) {
    this.updateMonitorState({ searchValue: value });
  }

  @bind
  private handleSelectTab(tabName: TabName) {
    this.updateMonitorState({ tabName });
  }
}

type AppState = any;

interface ReactNativeMonitorProps {
  supportImmutable: boolean;
  // theme: Theme;
  // invertTheme: boolean;
  dispatch: Dispatch<any>;
  computedStates: AppState[];
  stagedActionIds: number[];
  skippedActionIds: number[];
  actionsById: {
    [id: number]: Action;
  };
  currentStateIndex: number;
  monitorState: MonitorState;
  preserveScrollTop: boolean;
  stagedActions: number[];
  diffObjectHash: ObjectHash;
  diffPropertyFilter: PropertyFilter;
  tabName: TabName;
}

export interface ReactNativeMonitorState {
  // isWideLayout: boolean;
  // themeState: {
  //   base16Theme: Base16Theme,
  //   styling: StylingFunction
  // };
  action: Action;
  nextState: Object;
  delta?: Delta;
  error?: string;
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
