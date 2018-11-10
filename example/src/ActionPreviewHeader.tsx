import * as React from 'react';
import { TabName, Tab } from './state';
import { View, Text, TouchableOpacity } from 'react-native';

export const ActionPreviewHeader = ({
  inspectedPath,
  onInspectPath,
  tabName,
  onSelectTab,
  tabs,
  styling
}: ActionPreviewHeaderProps) => (
  <View {...styling('previewHeader')}>
    {tabs.map((tab, index) => {
      return (
        <TouchableOpacity
          {...styling([
            'selectorButton',
            index === 0 ? 'selectorButtonFirst' : null,
            index === tabs.length - 1 ? 'selectorButtonLast' : null,
            tab.name === tabName ? 'selectorButtonSelected' : null
          ])}
          key={tab.name}
          activeOpacity={0.5}
          onPress={() => onSelectTab(tab.name)}
        >
          <Text {...styling('selectorButtonText')}>{tab.name}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

interface ActionPreviewHeaderProps {
  inspectedPath: string[];
  onInspectPath: (path: string[]) => void;
  tabName: TabName;
  onSelectTab: (tabName: TabName) => void;
  tabs: Tab[];
  styling: any;
}
