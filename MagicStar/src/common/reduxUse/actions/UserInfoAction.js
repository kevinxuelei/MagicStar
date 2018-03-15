/***
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */
import { UPDATEAVATAR, UPDATENAME , UPDATESEX  } from '../actionTypes/UserInfoActionTypes';

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
