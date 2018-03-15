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
import MenuView from "../store/MenuView";
import VideoCategoryView from "./VideoCategoryView";
import NavigationItem from "../../widget/NavigationItem";
import Video from "react-native-video";


class VideoDetailPage  extends PureComponent<>{


    static navigationOptions = ({navigation}: any) =>({
        headerTitle:(
            <Text style={{fontSize:21, color:'black'}}>{navigation.state.params.info.title}</Text>

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

                <Video source={{uri: this.props.navigation.state.params.info.fields.video_src}} // Can be a URL or a local file.
                       rate={1.0}                   // 0 is paused, 1 is normal.
                       volume={1.0}                 // 0 is muted, 1 is normal.
                       muted={false}                // Mutes the audio entirely.
                       paused={false}               // Pauses playback entirely.
                       // resizeMode="cover"           // Fill the whole screen at aspect ratio.
                       repeat={true}                // Repeat forever.
                       // onLoadStart={this.loadStart} // Callback when video starts to load
                       // onLoad={this.setDuration}    // Callback when video loads
                       // onProgress={this.setTime}    // Callback every ~250ms with currentTime
                       // onEnd={this.onEnd}           // Callback when playback finishes
                       // onError={this.videoError}    // Callback when video cannot be loaded
                       style={styles.backgroundVideo} />

            </View>
        )
    }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.paper,
    },

    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
})



export default VideoDetailPage