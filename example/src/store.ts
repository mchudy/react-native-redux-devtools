import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducer';
import DevTools from './DevTools';

const enhancer = compose(
    applyMiddleware(),
    DevTools.instrument()
);

export const store = createStore(reducer, enhancer as any);