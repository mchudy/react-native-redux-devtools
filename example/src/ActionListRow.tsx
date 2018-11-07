import * as React from 'react';
import moment from 'moment';
import { View, Text, Platform, StyleSheet } from 'react-native';

const TIME_FORMAT = '+mm:ss.SS';
const MONOSPACE_FONT = Platform.OS === 'android' ? 'monospace' : 'Menlo';

export class ActionListRow extends React.Component<any> {
  render() {
    const { id, action, baseTime } = this.props;
    const timeDiff = action.timestamp - baseTime;
    let formattedTime = moment(timeDiff).format(TIME_FORMAT);
    if (action.type === '@@INIT') {
      formattedTime = moment(baseTime).format('HH:mm:ss.SS');
    }
    console.warn(action);
    return null;

    return (
      <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 4,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Text key={id} style={styles.actionTypeText}>
          {action.action.type}
        </Text>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formattedTime}</Text>
        </View>
      </View>
    );
  }
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
  