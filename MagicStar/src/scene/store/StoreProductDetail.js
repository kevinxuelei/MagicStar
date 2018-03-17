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
import MenuView from "./MenuView";
import Swiper from 'react-native-swiper';
import APIConst from "../../APIConst";
import NavigationItem from "../../widget/NavigationItem";
import StoreProductDetailBottomView from "./StoreProductDetailBottomView";
import AutoHeightWebView from "react-native-autoheight-webview/autoHeightWebView/index.ios";




type State = {
    infoData: any,
    refreshing: boolean,
    albums: Array<Object>,
    fields:any,
    userinfo:any,
    webViewHeight:any,
    loadUrl:string,
}


class StoreProductDetail extends PureComponent<>{

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

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            infoData: Object,
            albums: [],
            refreshing: false,
            fields:Object,
            userinfo:Object,
            webViewHeight:0,
            loadUrl:'',

        };
    }




    componentDidMount() {

    this.state.loadUrl =  this.props.navigation.state.params.isUsedProduct ? (APIConst.UserdProduct_GetuedProductDetail + this.props.navigation.state.params.info.product_id) : (APIConst.Store_GetDetailInfo + this.props.navigation.state.params.info.link_url)

        if (this.props.navigation.state.params.isFromCollection){
            this.state.loadUrl = APIConst.Store_GetDetailInfo + this.props.navigation.state.params.info.product_id
        }



        fetch(this.state.loadUrl)
            .then((response)=>
                response.json()
            )
            .then((json)=>{
                console.log(json)
                let Data = json.Data

                this.setState({
                    infoData:Data,
                    refreshing: false,
                    albums:Data.albums,
                    fields:Data.fields,
                    userinfo:Data.userinfo,

                })
            })
            .catch((error)=>{
                console.log(error)
                alert(error)
            })

    }

    render(){

        let headerImageUrl = this.state.userinfo.avatar ? this.state.userinfo.avatar:'http://ms.1976magic.com/upload/201712/06/201712061713515928.jpg'
        return(
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                    ref="scrollView"
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={true}
                    pagingEnabled={false}
                >
                    <Swiper autoplay = {true}
                            height = {screen.width}
                            showsPagination = {true}
                            dotColor='white'
                            activeDotColor='yellow'
                            horizontal={true}>
                        {
                            this.state.albums.map((item, index) => {
                                return (
                                    <Image style={{height:screen.width,width:screen.width}} key = {index} resizeMode='stretch' source={{uri: item.thumb_path}}/>
                                )
                            })
                        }
                    </Swiper>

                    <View style={{backgroundColor:'white',width:screen.width,height:70,justifyContent:'space-between',padding:10}}>
                        <Text style={{fontSize:15, color:'black'}}>{this.state.infoData.title}</Text>
                        <Text style={{fontSize:15, color:'red'}}>￥ {this.state.fields.sell_price}</Text>
                    </View>

                    <View style={{backgroundColor:color.bgGray,width:screen.width,height:10}}></View>

                    <TouchableOpacity  style={{backgroundColor:'white',width:screen.width,height:45,justifyContent:'space-between',padding:10,justifyContent:'center'}}
                                       onPress={()=> {
                                           alert('自定义弹框')
                                       }}>
                        <Text style={{fontSize:14, color:'black'}}>请选择颜色或者款式(可自定义)</Text>
                    </TouchableOpacity>

                    <View style={{backgroundColor:color.bgGray,width:screen.width,height:10}}></View>


                    <View style={{backgroundColor:'white',width:screen.width,height:70,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>

                        <View style={{backgroundColor:'white',height:70,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

                            <Image style={{height:40,width:40}} resizeMode='stretch' source={{uri: headerImageUrl}}/>

                            <Text style={{fontSize:15, color:'black',padding:10}}>{this.state.userinfo.nick_name}</Text>

                        </View>
                    </View>

                    <AutoHeightWebView
                        onHeightUpdated={height => this.setState({ height })}
                        source={{uri:this.state.infoData.ContentUrl}}
                    />

                </ScrollView>

                <StoreProductDetailBottomView isUsedProduct={this.props.navigation.state.params.isUsedProduct}/>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.paper
    },
    scrollView:{
        backgroundColor: color.paper,

    }


})

export default StoreProductDetail
