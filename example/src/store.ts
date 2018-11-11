import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducer';
import { DevTools } from 'react-native-redux-devtools';

const enhancer = compose(
    applyMiddleware(),
    DevTools.instrument()
);

export const store = createStore(reducer, enhancer as any);