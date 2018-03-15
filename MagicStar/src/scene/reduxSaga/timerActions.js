/**
 *
 *
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */

import { START, STOP, RESET, RUN_TIMER } from './timerActionsTypes';

const start = () => ({ type: START });
const stop = () => ({ type: STOP });
const reset = () => ({ type: RESET });
const runTime = () => ({ type: RUN_TIMER });

export {
    start,
    stop,
    reset,
    runTime
}



