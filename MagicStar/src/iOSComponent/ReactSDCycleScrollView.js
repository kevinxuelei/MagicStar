/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */


import React, { Component, PropTypes } from 'react';
import { requireNativeComponent } from 'react-native';

// requireNativeComponent 自动把这个组件提供给 "RCTScrollView"
var RCTScrollView = requireNativeComponent('ReactSDCycleScrollView', ReactSDCycleScrollView);


export default class ReactSDCycleScrollView extends Component {

    render() {
        return <RCTScrollView {...this.props} />;
    }

}

ReactSDCycleScrollView.propTypes = {
    /**
     * 属性类型，其实不写也可以，js会自动转换类型
     */
    // autoScrollTimeInterval: PropTypes.number,
    // imageURLStringsGroup: PropTypes.array,
    // autoScroll: PropTypes.bool,

    // oonTouchBanner: PropTypes.func
};

module.exports = ReactSDCycleScrollView;