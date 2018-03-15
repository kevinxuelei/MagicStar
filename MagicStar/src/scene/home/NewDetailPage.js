/**

 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */


import React, {PureComponent} from 'react'
import {
    View, Text, StyleSheet, ScrollView, TouchableHighlight, ListView, Image, StatusBar, FlatList,
    TouchableOpacity, WebView
} from 'react-native'

import color from '../../widget/color'
import {screen, system} from '../../common'

import Swiper from 'react-native-swiper';
import APIConst from "../../APIConst";
import MenuView from "../store/MenuView";
import VideoCategoryView from "./VideoCategoryView";
import NavigationItem from "../../widget/NavigationItem";
import Video from "react-native-video";
import AutoHeightWebView from "react-native-autoheight-webview/autoHeightWebView/index.ios";
import NewsDetailBottomView from "./NewsDetailBottomView";


class NewDetailPage  extends PureComponent<>{


    static navigationOptions = ({navigation}: any) =>({
        headerTitle:(
            <Text style={{fontSize:21, color:'black'}}>查看详情</Text>

        ),
        headerStyle:{backgroundColor:color.mainBGColor},
        headerLeft:(
            <NavigationItem
                icon={require('../../img/store/img_back_black.png')}
                title='返回'
                onPress={() => {
                    navigation.goBack();
                }}
            />
        ),
    })

    render(){
        return(
            <View style={styles.container}>

                <WebView
                    source={{uri:this.props.navigation.state.params.info.ContentUrl}}
                    style={{width:'100%',height:'100%'}}
                />




                {/*<View style={{backgroundColor:'red',height:100,width:screen.width}}/>*/}
                <NewsDetailBottomView/>

            </View>
        )
    }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.paper,
    },
    scrollView:{
        backgroundColor: 'red',
        height:screen.height-60,

    }
})



export default NewDetailPage