import * as React from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import { Action } from './state';
import dateformat from 'dateformat';
import bind from 'bind-decorator';

enum Button {
  SKIP = 'Skip',
  JUMP = 'Jump'
}

export class ActionListRow extends React.Component<
  ActionListRowProps,
  ActionListRowState
> {
  constructor(props: ActionListRowProps) {
    super(props);
    this.state = {
      showButtons: false
    };
  }

  render() {
    const {
      isSelected,
      action,
      isInitAction,
      timestamps,
      isSkipped,
      isInFuture,
      styling
    } = this.props;
    const timeDelta = timestamps.current - timestamps.previous;
    const showButtons = (this.state.showButtons && !isInitAction) || isSkipped;

    let actionType = action.type;
    if (typeof actionType === 'undefined') {
      actionType = '<UNDEFINED>';
    } else if (actionType === null) {
      actionType = '<NULL>';
    } else {
      actionType = actionType.toString() || '<EMPTY>';
    }

    const timeFormat =
      timeDelta === 0
        ? '+00:00:00'
        : dateformat(timeDelta, timestamps.previous ? '+MM:ss.L' : 'h:MM:ss.L');

    return (
      <TouchableOpacity
        {...styling([
          'actionListItem',
          isSelected ? 'actionListItemSelected' : null,
          isInFuture ? 'actionListFromFuture' : null,
          isSkipped ? 'actionListItemSkipped' : null
        ])}
        activeOpacity={0.2}
        onPress={this.onSelect}
      >
        <Text
          {...styling([
            'actionListItemName',
            isSkipped ? 'actionListItemNameSkipped' : null
          ])}
        >
          {actionType}
        </Text>
        {!showButtons && (
          <TouchableOpacity
            {...styling('actionListItemTimeContainer')}
            activeOpacity={0.2}
            onPress={this.toggleButtons}
          >
            <Text {...styling('actionListItemTimeText')}>{timeFormat}</Text>
          </TouchableOpacity>
        )}
        {!!showButtons && (
          <View {...styling('actionListItemSelector')}>
            {this.renderButton(Button.JUMP, 'selectorButtonFirst')}
            {this.renderButton(Button.SKIP, 'selectorButtonLast')}
          </View>
        )}
      </TouchableOpacity>
    );
  }

  @bind
  private handleButtonClick(button: Button) {
    if (button === Button.SKIP) {
      this.props.onToggleClick(this.props.actionId);
    } else {
      this.props.onJumpClick(this.props.actionId);
    }
    this.setState({
      showButtons: false
    });
  }

  @bind
  private toggleButtons() {
    this.setState({
      showButtons: !this.state.showButtons
    });
  }

  @bind
  private onSelect() {
    if (this.state.showButtons) {
      this.setState({
        showButtons: false
      });
    } else {
      this.props.onSelect(this.props.actionId);
    }
  }

  @bind
  private renderButton(button: Button, extraStyling?: string) {
    const isSelected = button === Button.SKIP && this.props.isSkipped;
    const { styling } = this.props;

    return (
      <TouchableOpacity
        onPress={() => this.handleButtonClick(button)}
        {...styling(
          [
            'selectorButton',
            isSelected ? 'selectorButtonSelected' : null,
            'selectorButtonSmall',
            extraStyling
          ],
          isSelected,
          true
        )}
      >
        <Text {...styling('selectorButtonTextSmall')}>{button}</Text>
      </TouchableOpacity>
    );
  }
}

interface ActionListRowProps {
  isSelected: boolean;
  action: Action;
  actionId: number;
  isInFuture: boolean;
  isInitAction: boolean;
  timestamps: {
    current: number;
    previous: number;
  };
  isSkipped: boolean;
  onToggleClick: (actionId: number) => void;
  onJumpClick: (actionId: number) => void;
  onSelect: (actionId: number) => void;
  styling: any;
}

interface ActionListRowState {
  showButtons: boolean;
}
