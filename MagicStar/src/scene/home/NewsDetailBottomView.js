/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */

import React, {PureComponent} from 'react'
import {
    View, Text, StyleSheet, ScrollView, TouchableHighlight, ListView, Image, StatusBar, FlatList,
    TouchableOpacity
} from 'react-native'
import {screen} from "../../common";
import color from "../../widget/color";

type Props = {

    isUsedProduct: Boolean,

}




class NewsDetailBottomView extends PureComponent<Props>{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isUsedProduct: false,
        };
    }


    render(){

        return(

                <View style={{backgroundColor:'white',flexDirection:'row',width:screen.width,height:60,}}>



                    <TouchableOpacity style={{backgroundColor:'white',flex:1,justifyContent: 'center',
                        alignItems: 'center',marginRight:0,marginLeft:0,width:screen.width*0.6}}
                                      onPress={()=> {
                                          alert('评论')
                                      }}
                    >

                        <Image
                            style={{width:screen.width*0.6,height:25,}}
                            source={require('../../img/News/news_plbtn.png')}
                        />

                    </TouchableOpacity>


                    <TouchableOpacity style={{backgroundColor:'white',justifyContent: 'center',
                        alignItems: 'center',margin:5}}
                                      onPress={()=> {
                                          alert('赞')
                                      }}
                    >

                        <Image
                            style={{width:25,height:25,margin:5}}
                            source={require('../../img/News/news_plzan.png')}
                        />

                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'white',justifyContent: 'center',
                        alignItems: 'center',margin:5}}
                                      onPress={()=> {
                                          alert('收藏')
                                      }}
                    >

                        <Image
                            style={{width:25,height:25,margin:5}}
                            source={require('../../img/News/news_plshoucang.png')}
                        />

                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'white',justifyContent: 'center',
                        alignItems: 'center',margin:5}}
                                      onPress={()=> {
                                          alert('分享')
                                      }}
                    >

                        <Image
                            style={{width:25,height:25,margin:5}}
                            source={require('../../img/News/news_plfenxiang.png')}
                        />

                    </TouchableOpacity>


                </View>
        )

    }


}



export default NewsDetailBottomView
