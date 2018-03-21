/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */


import React, {PureComponent} from 'react'
import {
    View, Text, StyleSheet, ScrollView, TouchableHighlight, ListView, Image, StatusBar, FlatList,
    TouchableOpacity
} from 'react-native'

import color from '../../widget/color'
import {screen, system} from '../../common'

import Swiper from 'react-native-swiper';
import APIConst from "../../APIConst";
import ScrollableTabView,{ ScrollableTabBar } from 'react-native-scrollable-tab-view';
import MineScene from "../mine/MineScene";
import EvaluatePage from "./EvaluatePage";
import VideoPage from "./VideoPage";
import NavigationItem from "../../widget/NavigationItem";
import NewsPage from "./NewsPage";

type Props = {
    navigation: any,
}

class HomeScene extends PureComponent<Props>{

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: (
                <Image source={require('../../img/tabbar/news-top.png',)} style={styles.topBarImage} />
        ),
        headerStyle: {backgroundColor: color.mainBGColor},
    })




    render(){
        return(
            <View style={styles.container}>

                <ScrollableTabView
                    initialPage={0}
                    scrollWithoutAnimation={false}
                    renderTabBar={()=><ScrollableTabBar
                        style={{ height: 40 }}
                        underlineColor='#ce3d3a'
                        activeTextColor= {color.mainBGColor}
                        inactiveTextColor='white'
                        // underlineHeight={0}
                        textStyle={{ fontSize: 20 }}
                        tabsContainerStyle={{ alignItems: 'center'}}
                        backgroundColor='rgb(43,43,43)'
                        underlineStyle={{height:0}}

                    />}
                >
                    <NewsPage tabLabel='新闻' onCellSelected={(info) =>{
                        this.props.navigation.navigate('NewsDetail', {info:info})
                     }}/>


                    <VideoPage tabLabel='视频' onCellSelected={(info)=>{
                        this.props.navigation.navigate('VideoPlay', {info:info})
                    }} onCategoryItemSelected={(info) =>{
                        this.props.navigation.navigate('VideoSubCollectionPage', {info:info})
                    }}/>
                    <EvaluatePage tabLabel='评测' onCellSelected={(info) =>{
                        this.props.navigation.navigate('NewsDetail', {info:info})
                    }}/>
                </ScrollableTabView>


            </View>
        )
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: color.paper
    },
    topBarImage:{
        backgroundColor:color.mainBGColor,
        height:40,
    }
})





export default HomeScene

