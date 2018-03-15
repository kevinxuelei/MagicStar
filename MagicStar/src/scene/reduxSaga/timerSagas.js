/**
 *
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */

import { takeEvery, delay, END } from 'redux-saga';
import { put, call, take, fork, cancel, cancelled } from 'redux-saga/effects';
import { START, STOP, RESET, RUN_TIMER } from './timerActionsTypes';
import { stop, runTime } from './timerActions';

function* watchStart() {
    // 一般用while循环替代 takeEvery
    while (true) {
        // take: 等待 dispatch 匹配某个 action
        yield take(START);
        // 通常fork 和 cancel配合使用，实现非阻塞任务，take是阻塞状态，也就是实现执行take时候，无法向下继续执行，fork是非阻塞的，同样可以使用cancel取消一个fork 任务
        var runTimeTask = yield fork(timer);
        yield take(STOP);
        // cancel: 取消一个fork任务
        yield cancel(runTimeTask);
    }
}

function* watchReset() {
    while (true) {
        yield take(RESET)
        yield put(stop());
    }
}

function* timer() {
    try {
        while(true) {
            // call: 有阻塞地调用 saga 或者返回 promise 的函数，只在触发某个动作
            yield call(delay, 1000);
            // put: 触发某个action， 作用和dispatch相同
            yield put(runTime());
        }
    } finally {
        if (yield cancelled()) {
            console.log('取消了runTimeTask任务');
        }
    }
}


export default function* rootSaga() {
    yield fork(watchStart);
    yield fork(watchReset)
}



