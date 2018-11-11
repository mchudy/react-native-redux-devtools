import { ReduxState, MonitorState } from './state';

type Action = {
  type: string;
  [key: string]: any;
};

const UPDATE_MONITOR_STATE = '@@redux-devtools-inspector/UPDATE_MONITOR_STATE';

const DEFAULT_STATE: ReduxState = {
  selectedActionId: null,
  startActionId: null,
  inspectedActionPath: [],
  inspectedStatePath: [],
  tabName: 'Action'
};

export function updateMonitorState(monitorState: MonitorState) {
  return { type: UPDATE_MONITOR_STATE, monitorState };
}

function reduceUpdateState(state: ReduxState, action: Action) {
  return action.type === UPDATE_MONITOR_STATE
    ? {
        ...state,
        ...action.monitorState
      }
    : state;
}

export function reducer(
  _props: Object,
  state: ReduxState = DEFAULT_STATE,
  action: Action
) {
  return {
    ...reduceUpdateState(state, action)
  };
}
