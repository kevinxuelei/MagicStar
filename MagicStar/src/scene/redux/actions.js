/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */


import { INCREASE, DECREASE, RESET } from './actionsTypes';

const increase = () => ({ type: INCREASE });
const decrease = () => ({ type: DECREASE });
const reset = () => ({ type: RESET });

export {
    increase,
    decrease,
    reset
}

