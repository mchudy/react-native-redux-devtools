import * as React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import bind from 'bind-decorator';

export class ActionListHeader extends React.Component<ActionListHeaderProps> {
  render() {
    const {
      styling,
      onSearch,
      hasSkippedActions,
      hasStagedActions,
      onCommit,
      onSweep
    } = this.props;
    return (
      <View {...styling('actionListHeader')}>
        <TextInput
          {...styling('actionListHeaderSearch')}
          onChangeText={text => onSearch(text)}
          placeholder="filter..."
          placeholderTextColor={
            styling('actionListHeaderPlaceholder').style.color
          }
        />
        {!!hasStagedActions && (
          <View style={{ flexDirection: 'row' }}>
            {!!hasSkippedActions &&
              this.renderButton(Button.SWEEP, ['selectorButtonFirst'])}
            {this.renderButton(Button.COMMIT, [
              'selectorButtonLast',
              hasSkippedActions ? null : 'selectorButtonFirst'
            ])}
          </View>
        )}
      </View>
    );
  }

  @bind
  private renderButton(btn: Button, extraStyling: Array<string | null>) {
    const { styling } = this.props;
    return (
      <TouchableOpacity
        key={btn}
        onPress={() => this.onButtonPress(btn)}
        {...styling(['selectorButton', 'selectorButtonSmall', ...extraStyling])}
      >
        <Text {...styling('selectorButtonTextSmall')}>{btn}</Text>
      </TouchableOpacity>
    );
  }

  @bind
  private onButtonPress(btn: Button) {
    if (btn === Button.SWEEP) {
      this.props.onSweep();
    } else {
      this.props.onCommit();
    }
  }
}

const getActiveButtons = (hasSkippedActions: boolean): Button[] =>
  [hasSkippedActions ? Button.SWEEP : null, Button.COMMIT].filter(
    Boolean
  ) as Button[];

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
