import * as React from 'react';
import { View, TextInput } from 'react-native';

export const ActionListHeader = ({
  styling,
  onSearch,
  hasSkippedActions,
  hasStagedActions,
  onCommit,
  onSweep
}: ActionListHeaderProps) => (
  <View {...styling('actionListHeader')}>
    <TextInput
      {...styling('actionListHeaderSearch')}
      onChangeText={text => onSearch(text)}
      placeholder="filter..."
    />
    {/* <View {...styling('actionListHeaderWrapper')}>
      {!!hasStagedActions && (
        <RightSlider shown={hasStagedActions} styling={styling}>
          <div {...styling('actionListHeaderSelector')}>
            {getActiveButtons(hasSkippedActions).map(btn => (
              <div
                key={btn}
                onClick={() =>
                  ({
                    Commit: onCommit,
                    Sweep: onSweep
                  }[btn]())
                }
                {...styling(
                  ['selectorButton', 'selectorButtonSmall'],
                  false,
                  true
                )}
              >
                {btn}
              </div>
            ))}
          </div>
        </RightSlider>
      )}
    </View> */}
  </View>
);

const getActiveButtons = (hasSkippedActions: boolean) =>
  [hasSkippedActions ? Button.SWEEP : null, Button.COMMIT].filter(Boolean);

enum Button {
  SWEEP = 'Sweep',
  COMMIT = 'Commit'
}

interface ActionListHeaderProps {
  styling: any;
  onSearch: (searchStr: string) => void;
  onCommit: () => void;
  onSweep: () => void;
  hasSkippedActions: boolean;
  hasStagedActions: boolean;
}
