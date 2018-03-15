/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/UserInfoReducer';

const configureStore = preloadedState => {
    return createStore (
        rootReducer,
        preloadedState,
        compose (
            applyMiddleware(createLogger())
        )
    );
}




const UserInfoStore = configureStore();

export default UserInfoStore;
