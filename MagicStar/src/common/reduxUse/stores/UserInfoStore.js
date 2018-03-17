/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/UserInfoReducer';
import sagas from '../saga/UserInfoSaga';
import createSagaMiddleware, { END } from 'redux-saga';

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




const UserInfoStore = configureStore();

export default UserInfoStore;
