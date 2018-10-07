import * as React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { actions } from "./src/actions";
import { connect, Provider } from "react-redux";
import { store } from "./src/store";

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    );
  }
}

type AppProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class App extends React.Component<AppProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.counter}>{this.props.counter}</Text>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.touchable}
            underlayColor={'#f9f9f9'}
            onPress={this.props.increment}
          >
            <Text style={styles.touchableText}>+</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.touchable}
            underlayColor={'#f9f9f9'}
            onPress={this.props.decrement}
          >
            <Text style={styles.touchableText}>-</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  counter: state.counter
});

const mapDispatchToProps = (dispatch: Function) => ({
  increment: () => dispatch(actions.increment()),
  decrement: () => dispatch(actions.decrement())
});

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  buttonContainer: {
    flexDirection: "row"
  },
  counter: {
    fontSize: 40,
    color: "#455268",
    textAlign: "center",
    margin: 10
  },
  touchable: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    width: 60,
    padding: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  touchableText: {
    fontSize: 35
  }
});