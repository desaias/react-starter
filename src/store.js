import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import { clockReducer } from './clock';
import { githubReducer } from './github';

const devtools = window.devToolsExtension || (() => noop => noop);

function createReducer(asyncReducers) {
    return combineReducers({
        clock: clockReducer,
        github: githubReducer,
        ...asyncReducers
    });
}

export default function configureStore(initialState = {}) {
    const middlewares = [thunk];

    const enhancers = [
        applyMiddleware(...middlewares),
        devtools()
    ];

    const store = createStore(
        createReducer(),
        initialState,
        compose(...enhancers)
    );

    store.asyncReducers = {};
    return store;
}

