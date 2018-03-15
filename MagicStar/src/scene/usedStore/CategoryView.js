/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */



import React, {PureComponent} from 'react'
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity, TouchableHighlight, ListView, Image, StatusBar, FlatList,
    ImageBackground
} from 'react-native'
import color from '../../widget/color'
import {screen} from "../../common";

type Props = {
    height: number,
    opacity:number,

}

class CategoryView extends PureComponent<Props, State>  {

    constructor(props: Object) {
        super(props)

        this.state = {
            height: 0
        }
    }


    render(){
        return(
            <View style={{backgroundColor:'white',width:screen.width,height:60,flexDirection:'row',opacity:this.props.opacity}}>
                <TouchableOpacity style={{height:60,width:screen.width/3,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}
                                  onPress={()=>alert('卡牌')}
                >
                    <ImageBackground style={{height:30,width:80,justifyContent:'center',alignItems:'center',}} source={require('../../img/store/xiaoleibtn_bgView.png')} resizeMode='cover'>
                        <Text style={{color:'black',fontSize:14}}>卡牌</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity style={{height:60,width:screen.width/3,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}
                                  onPress={()=>alert('硬币')}
                >
                    <ImageBackground style={{height:30,width:80,justifyContent:'center',alignItems:'center',}} source={require('../../img/store/xiaoleibtn_bgView.png')} resizeMode='cover'>
                        <Text style={{color:'black',fontSize:14}}>硬币</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity style={{height:60,width:screen.width/3,justifyContent:'center',alignItems:'center',backgroundColor:'white'}}
                                  onPress={()=>alert('道具')}
                >
                    <ImageBackground style={{height:30,width:80,justifyContent:'center',alignItems:'center',}} source={require('../../img/store/xiaoleibtn_bgView.png')} resizeMode='cover'>
                        <Text style={{color:'black',fontSize:14}}>道具</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        )
    }


}

export default CategoryView