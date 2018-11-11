import * as React from 'react';
import { Tab, TabName, Action, ActionsDict } from './state';
import { View, AppState, ScrollView, Text } from 'react-native';
import { ActionPreviewHeader } from './ActionPreviewHeader';
import { Delta } from 'jsondiffpatch';
import { ActionTab } from './tabs/ActionTab';
import { StateTab } from './tabs/StateTab';
import { DiffTab } from './tabs/DiffTab';
import bind from 'bind-decorator';

const DEFAULT_TABS: Tab[] = [
  {
    name: 'Action',
    component: ActionTab as any
  },
  {
    name: 'State',
    component: StateTab as any
  },
  {
    name: 'Diff',
    component: DiffTab as any
  }
];

export class ActionPreview extends React.Component<ActionPreviewProps> {
  static defaultProps = {
    tabName: 'Action'
  };

  render() {
    const {
      delta,
      error,
      nextState,
      onInspectPath,
      inspectedPath,
      tabName,
      onSelectTab,
      action,
      actions,
      selectedActionId,
      startActionId,
      computedStates,
      tabs,
      base16Theme,
      styling
    } = this.props;

    const renderedTabs =
      typeof tabs === 'function'
        ? tabs(DEFAULT_TABS)
        : tabs
        ? tabs
        : DEFAULT_TABS;

    const tab = renderedTabs.find(tab => tab.name === tabName);

    let TabComponent: any;
    if (tab) {
      TabComponent = tab.component;
    }
    return (
      <View {...styling('actionPreviewContainer')}>
        <ActionPreviewHeader
          tabs={renderedTabs}
          {...{ inspectedPath, onInspectPath, tabName, onSelectTab, styling }}
        />
        {!error && (
          <ScrollView>
            {TabComponent && (
              <TabComponent
                labelRenderer={this.labelRenderer}
                {...{
                  computedStates,
                  actions,
                  selectedActionId,
                  startActionId,
                  delta,
                  action,
                  nextState,
                  base16Theme,
                  styling
                }}
              />
            )}
          </ScrollView>
        )}
        {error &&
          <Text {...styling('stateError')}>{error}</Text>
        }
      </View>
    );
  }

  @bind
  private labelRenderer(
    [key, ...rest]: any,
    nodeType: string,
    expanded: boolean
  ) {
    const { styling, onInspectPath, inspectedPath } = this.props;

    return (
      <Text>
        <Text {...styling('treeItemKey')}>{key}</Text>
        {/* <span {...styling('treeItemPin')}
              onClick={() => onInspectPath([
                ...inspectedPath.slice(0, inspectedPath.length - 1),
                ...[key, ...rest].reverse()
              ])}>
          {'(pin)'}
        </span> */}
        {!expanded && ': '}
      </Text>
    );
  }
}

interface ActionPreviewProps {
  tabs?: ((defaultTabs: Tab[]) => Tab[]) | Tab[];
  tabName: TabName;
  inspectedPath: string[];
  onInspectPath: (path: string[]) => void;
  delta?: Delta;
  error?: string;
  onSelectTab: (tabName: TabName) => void;
  nextState: Object;
  action: Action;
  startActionId: number | null;
  selectedActionId: number | null;
  computedStates: AppState[];
  actions: ActionsDict;
  styling: any;
  base16Theme: any;
}
