/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */

import { UPDATEAVATAR, UPDATENAME , UPDATESEX,FETCH_REQUESTED  } from '../actionTypes/UserInfoActionTypes';

import {updateAvatar,updateName,updateSex,fetch_requsested,updateCoin} from '../actions/UserInfoAction';

import {take, fork, call, put, cancel} from 'redux-saga/effects';
import APIConst from "../../../APIConst";
import fetchRequest from "../../../NetWorkTools";

export  function* wordFlow() {
    try {
        const data = yield call(fetchRequest, APIConst.UserInfo_Url);

        // let mainData = data._bodyText
        let info = data.Data.Data
        console.log(info)
        yield put(updateCoin(info.point));
        yield put(updateName(info.nick_name));
        yield put(updateSex(info.sex));
        yield put(updateAvatar(info.avatar));
    } catch (e){

    }
}
