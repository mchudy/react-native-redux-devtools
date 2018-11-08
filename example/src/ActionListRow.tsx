import * as React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { Action } from './state';
import dateformat from 'dateformat';

const TIME_FORMAT = '+mm:ss.SS';
const MONOSPACE_FONT = Platform.OS === 'android' ? 'monospace' : 'Menlo';

export class ActionListRow extends React.Component<ActionListRowProps> {
  render() {
    const {
      isSelected,
      action,
      isInitAction,
      timestamps,
      isSkipped,
      isInFuture
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
      <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 4,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Text style={styles.actionTypeText}>{actionType}</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{timeFormat}</Text>
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
}

const styles = StyleSheet.create({
  actionTypeText: {
    color: 'white',
    flex: 1,
    fontFamily: MONOSPACE_FONT
  },
  timeContainer: {
    borderRadius: 5,
    backgroundColor: 'rgba(190, 190 ,190, 0.2)',
    padding: 3
  },
  timeText: {
    color: '#b0b0b0',
    fontSize: 12,
    fontFamily: MONOSPACE_FONT
  }
});
