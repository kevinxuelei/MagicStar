/***
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */
import { UPDATEAVATAR, UPDATENAME , UPDATESEX ,UPDATECOIN ,FETCH_REQUESTED
 } from '../actionTypes/UserInfoActionTypes';

// const updateAvatar = () => ({ type: UPDATEAVATAR ,  text: ''});
// const updateName = () => ({ type: UPDATENAME ,  text: ''});
// const updateSex = () => ({ type: UPDATESEX ,  text: ''});
//
// export {
//     updateAvatar,
//     updateName,
//     updateSex
// }
export const updateAvatar = (avatar) => {
    return {
        type: UPDATEAVATAR,
        data: avatar,
    }
};
export const updateName = (nickName) => {
    return {
        type: UPDATENAME,
        data: nickName,
    }
};
export const updateSex = (sex) => {
    return {
        type: UPDATESEX,
        data: sex,
    }
};
export const updateCoin = (coin) => {
    return {
        type: UPDATECOIN ,
        data: coin,
    }
};

export const fetch_requsested = (url) => {
    return {
        type: FETCH_REQUESTED ,
        data: url,
    }
};