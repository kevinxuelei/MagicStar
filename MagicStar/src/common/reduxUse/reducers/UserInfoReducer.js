/**
 *
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */
import { combineReducers } from 'redux';
import { UPDATEAVATAR, UPDATENAME , UPDATESEX,UPDATECOIN,FETCH_REQUESTED  } from '../actionTypes/UserInfoActionTypes';

// 原始默认state
const defaultState = {
    avatar: 'default',
    nickName: '爱豆魔术',
    sex:'男',
    coin:0,
    url:''

}

function undateUserInfo(state = defaultState, action) {
    switch (action.type) {
        case UPDATEAVATAR:
            return { ...state, avatar: action.data };
        case UPDATENAME:
            return { ...state, nickName: action.data };
        case UPDATESEX:
            return { ...state, sex: action.data };
        case UPDATECOIN:
            return { ...state, coin: action.data };
        case FETCH_REQUESTED:
            return { ...state, url: action.data };
        default:
            return state;
    }
}



export default combineReducers({
    undateUserInfo
});
