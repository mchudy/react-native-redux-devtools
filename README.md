# react-native-redux-devtools

[![npm version](https://badge.fury.io/js/react-native-redux-devtools.svg)](https://badge.fury.io/js/react-native-redux-devtools)


Redux DevTools implementation for React Native based on [redux-devtools-inspector](https://github.com/alexkuz/redux-devtools-inspector).

For now, it's mostly a one-to-one port adjusted for mobile. Some features might be missing but I plan to implement in the future.

<img src="https://github.com/mchudy/react-native-redux-devtools/blob/master/screenshots/counter.png?raw=true" width="200">

### Installation
```
npm install --save react-native-redux-devtools
```
```
yarn add react-native-redux-devtools
```

### Usage

Create store composed with devtools:
```js
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducer';
import { DevTools } from 'react-native-redux-devtools';

const enhancer = compose(
    applyMiddleware(), // apply middlewares that you are using
    DevTools.instrument() 
);

export const store = createStore(reducer, enhancer);
```

Then you can render devtools in your application:
```jsx
import * as React from 'react';
import { View } from 'react-native';
import { DevTools } from 'react-native-redux-devtools';

class App extends React.Component {
  render() {
    return (
      <View>
        {/* Your app content */}
        <DevTools />
      </View>
    );
  }
}
```

Remember not to enable devtools in production builds!
More details on how to set up devtools can be found in [redux-devtools documentation](https://github.com/reduxjs/redux-devtools/blob/master/docs/Walkthrough.md).
