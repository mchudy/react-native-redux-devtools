export interface Action {
  timestamp: number;
  error?: string;
  type: string;
}

export type ActionsDict =  {
  [id: number]: Action;
};

export type TabName = 'Action' | 'Diff' | 'State';
export type Tab = {
  name: TabName;
  component: React.Component | React.ReactElement<any>;
};

export type ReduxState = {
  selectedActionId: null | number;
  startActionId: null | number;
  inspectedActionPath: string[];
  inspectedStatePath: string[];
  tabName: TabName;
  searchValue?: string;
};

export type MonitorState = ReduxState & {
  initialScrollTop: number;
};
