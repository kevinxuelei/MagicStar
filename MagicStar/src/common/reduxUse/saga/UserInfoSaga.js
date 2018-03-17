/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */


import { UPDATEAVATAR, UPDATENAME , UPDATESEX,FETCH_REQUESTED  } from '../actionTypes/UserInfoActionTypes';
import {wordFlow} from './SageTools';
import { takeEvery, delay, END } from 'redux-saga';


export default function* rootSaga() {
    yield [
        // fork(wordFlow)
        takeEvery(FETCH_REQUESTED, wordFlow)
    ];

}
