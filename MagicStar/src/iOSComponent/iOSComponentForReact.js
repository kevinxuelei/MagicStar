/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */
import React, { Component, PropTypes } from 'react';
import {ScrollView, Text, View,StyleSheet} from "react-native";
var ReactSDCycleScrollView = require('./ReactSDCycleScrollView');

// requireNativeComponent 自动把这个组件提供给 "TestScrollView"
// 如果不新建TestScrollView.js对原生组件封装声明，则直接用这句导入即可
// var TestScrollView = requireNativeComponent('TestScrollView', null);

// 导入常量
// var TestScrollViewConsts = require('react-native').UIManager.ReactSDCycleScrollView.Constants;

var bannerImgs = [
    'http://upload-images.jianshu.io/upload_images/2321678-ba5bf97ec3462662.png?imageMogr2/auto-orient/strip%7CimageView2/2',
    'http://upload-images.jianshu.io/upload_images/1487291-2aec9e634117c24b.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/480/q/100',
    'http://f.hiphotos.baidu.com/zhidao/pic/item/e7cd7b899e510fb37a4f2df3db33c895d1430c7b.jpg'
];

class NativeUIModule extends Component {

    constructor(props){
        super(props);
        this.state={
            bannerNum:0
        }
    }

    render() {

        return (
            <ScrollView style = {{marginTop:64}}>
                <View>
                    <ReactSDCycleScrollView style={styles.container}
                                    autoScrollTimeInterval = {2}
                                    imageURLStringsGroup = {bannerImgs}
                                    // pageControlAliment = {TestScrollViewConsts.SDCycleScrollViewPageContolAliment.right}
                                    onClickBanner={(e) => {
                                        console.log('test' + e.nativeEvent.value);
                                        this.setState({bannerNum:e.nativeEvent.value});
                                    }}
                    />
                    <Text style={{fontSize: 15, margin: 10, textAlign:'center'}}>
                        点击banner -> {this.state.bannerNum}
                    </Text>
                </View>
            </ScrollView>
        );
    }
}

//  实际组件的具体大小位置由js控制
const styles = StyleSheet.create({
    container:{
        padding:30,
        borderColor:'#e7e7e7',
        marginTop:10,
        height:200,
    },
});

export default NativeUIModule