import * as React from 'react';
import { TabName, Tab } from './state';
import { View, Text, TouchableHighlight } from 'react-native';

export const ActionPreviewHeader = 
({ inspectedPath, onInspectPath, tabName, onSelectTab, tabs }: ActionPreviewHeaderProps) => (
    <View style={{
        flexDirection: 'row'
    }}>
        {tabs.map(tab => (
            <TouchableHighlight style={{
                paddingHorizontal: 15,
                paddingVertical: 5,
                marginRight: 5,
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 2,
                opacity: tab.name === tabName ? 0.5 : 1
            }} key={tab.name} 
            activeOpacity={0.8}
            onPress={() => onSelectTab(tab.name)}>
                <Text style={{color: 'white'}}>{tab.name}</Text>
            </TouchableHighlight>
        ))}
    </View>
);


interface ActionPreviewHeaderProps {
  inspectedPath: string[];
  onInspectPath: (path: string[]) => void;
  tabName: TabName;
  onSelectTab: (tabName: TabName) => void;
  tabs: Tab[];
}
