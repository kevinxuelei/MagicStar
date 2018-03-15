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

class StoreProductDetailBottomView extends PureComponent<Props>{

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
            this.props.isUsedProduct ?
                (<View style={{backgroundColor:'white',flexDirection:'row',width:screen.width,height:60}}>


                    <TouchableOpacity style={{backgroundColor:'white',flex:1,justifyContent: 'center',
                        alignItems: 'center'}}
                                      onPress={()=> {
                                          alert('share_action')
                                      }}
                    >

                        <Image
                            style={{width:25,height:25,margin:5}}
                            source={require('../../img/store/zhuanfa.png')}
                        />
                        <Text style={{fontSize:14, color:'black',margin:5}}>分享</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={{backgroundColor:'rgb(220,121,64)',flex:1,justifyContent: 'center',
                        alignItems: 'center'}}
                                      onPress={()=> {
                                          alert('立即购买')
                                      }}
                                      activeOpacity={0.8}

                    >
                        <Text style={{fontSize:15, color:'white'}}>立即购买</Text>
                    </TouchableOpacity>



            </View>) : (<View style={{backgroundColor:'white',flexDirection:'row',width:screen.width,height:60}}>

                    <TouchableOpacity style={{backgroundColor:'white',height:60,width:90,justifyContent: 'center',
                        alignItems: 'center'}}
                                      onPress={()=> {
                                          alert('share_action')
                                      }}
                    >

                        <Image
                            style={{width:25,height:25,margin:5}}
                            source={require('../../img/store/zhuanfa.png')}
                        />
                        <Text style={{fontSize:14, color:'black',margin:5}}>分享</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={{backgroundColor:'white',height:60,width:90,justifyContent: 'center',
                        alignItems: 'center'}}
                                      onPress={()=> {
                                          alert('save_action')
                                      }}
                    >

                        <Image
                            style={{width:25,height:25,margin:5}}
                            source={require('../../img/store/shoucang.png')}
                        />
                        <Text style={{fontSize:14, color:'black',margin:5}}>分享</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor:color.mainBGColor,flex:1,justifyContent: 'center',
                        alignItems: 'center'}}
                                      onPress={()=> {
                                          alert('加入购物车')
                                      }}
                                      activeOpacity={0.8}
                    >

                        <Text style={{fontSize:15, color:'white'}}>加入购物车</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor:'rgb(220,121,64)',flex:1,justifyContent: 'center',
                        alignItems: 'center'}}
                                      onPress={()=> {
                                          alert('立即购买')
                                      }}
                                      activeOpacity={0.8}

                    >
                        <Text style={{fontSize:15, color:'white'}}>立即购买</Text>
                    </TouchableOpacity>
                </View>)
        )

    }


}



export default StoreProductDetailBottomView
