/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import createLogger from 'redux-logger';
import rootReducer from './timerReducers';
import sagas from './timerSagas';

const configureStore = preloadedState => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        preloadedState,
        compose (
            applyMiddleware(sagaMiddleware, createLogger())
        )
    )

    sagaMiddleware.run(sagas);
    store.close = () => store.dispatch(END);
    return store;
}

const timerStore = configureStore();
export default timerStore;
