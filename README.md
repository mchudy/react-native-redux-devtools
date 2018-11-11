# react-native-redux-devtools

[![npm version](https://badge.fury.io/js/react-native-redux-devtools.svg)](https://badge.fury.io/js/react-native-redux-devtools)


Redux DevTools implementation for React Native based on [redux-devtools-inspector](https://github.com/alexkuz/redux-devtools-inspector).

![](https://raw.githubusercontent.com/mchudy/react-native-redux-devtools/master/screenshots/counter.png)

### Installation
```
npm install --save react-native-redux-devtools
```
```
yarn add react-native-redux-devtools
```

### Usage

```js
import React from 'react';
import { createDevTools } from 'redux-devtools';
import Inspector from 'redux-devtools-inspector';

export default createDevTools(
  <Inspector />
);
```