import * as React from 'react';
import { View, Text, Platform } from 'react-native';
import { Action } from './state';
import dateformat from 'dateformat';

export class ActionListRow extends React.Component<ActionListRowProps> {
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
    // const showButtons = hover && !isInitAction || isSkipped;

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
      <View {...styling('actionListItem')}>
        <Text {...styling('actionListItemName')}>{actionType}</Text>
        <View {...styling('actionListItemTimeContainer')}>
          <Text {...styling('actionListItemTimeText')}>{timeFormat}</Text>
        </View>
      </View>
    );
  }
}

interface ActionListRowProps {
  isSelected: boolean;
  action: Action;
  isInFuture: boolean;
  isInitAction: boolean;
  timestamps: {
    current: number;
    previous: number;
  };
  isSkipped: boolean;
  onToggleClick?: () => void;
  onJumpClick?: () => void;
  styling: any;
}
