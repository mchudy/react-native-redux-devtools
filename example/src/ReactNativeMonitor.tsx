import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  LayoutChangeEvent,
  FlatList,
  Platform
} from "react-native";
import moment from "moment";

const CONTAINER_HEIGHT = 200;
const TIME_FORMAT = "+mm:ss.SS";

export class ReactNativeMonitor extends React.Component<any, any> {
  static update = (state: any) => state;
  private flatListRef: FlatList<any> | null = null;
  private baseTime: any;

  constructor(props: any, context: any) {
    super(props, context);

    this.onLayout = this.onLayout.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.state = {
      height: 0
    };
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.stagedActionIds.length > prevProps.stagedActionIds.length) {
      this.flatListRef!.scrollToEnd();
    }
  }

  render() {
    this.baseTime = this.props.actionsById[
      this.props.stagedActionIds[0]
    ].timestamp;
    const actions = this.props.stagedActionIds.map((id: any) => ({
      ...this.props.actionsById[id],
      id
    }));
    return (
      <View style={styles.container}>
        <FlatList
          data={actions}
          renderItem={this.renderItem}
          ref={(ref: any) => (this.flatListRef = ref)}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={() => <View style={{
            backgroundColor: '#b0b0b0',
            height: StyleSheet.hairlineWidth
          }} />}
        />
      </View>
    );
  }

  private keyExtractor(item: any) {
    return item.id;
  }

  private renderItem({ item }: any) {
    return (
      <ReactNativeMonitorActionItem
        key={item.id}
        id={item.id}
        action={item}
        baseTime={this.baseTime}
      />
    );
  }

  private onLayout(event: LayoutChangeEvent) {
    this.setState({
      height: event.nativeEvent.layout.height
    });
  }
}

class ReactNativeMonitorActionItem extends React.Component<any> {
  render() {
    const { id, action, baseTime } = this.props;
    const timeDiff = action.timestamp - baseTime;
    let formattedTime = moment(timeDiff).format(TIME_FORMAT);
    if (action.type === "@@INIT") {
      formattedTime = moment(baseTime).format(TIME_FORMAT);
    }
    return (
      <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 4,
          flexDirection: "row",
          alignItems: "center"
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
  container: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: CONTAINER_HEIGHT,
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
    backgroundColor: "#2A2F3A"
  },
  actionTypeText: {
    color: "white",
    flex: 1
  },
  timeContainer: {
    borderRadius: 5,
    backgroundColor: "rgba(190, 190 ,190, 0.2)",
    padding: 3
  },
  timeText: {
    color: "#b0b0b0",
    fontSize: 12,
    fontFamily: Platform.OS === 'android' ? 'monospace': 'Menlo'
  }
});
