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




var page  = 1;

type Props = {
    onCellSelected: Function,
}
type State = {
    discounts: Array<Object>,
    dataList: Array<Object>,
    bannerList: Array<Object>,
    categoryList: Array<Object>,

}


class NewsPage extends PureComponent<Props>{

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            discounts: [],
            dataList: [],
            bannerList: [],
            categoryList: [],

            loaded: false,
            refresh:false,
        };

        this.page = 1
    }

    renderHeader = ()=>{
        let swiperH = (this.state.bannerList.length !== 0) ? screen.height*0.3 : 0
        return(
            <View style={styles.headerView}>
                <Swiper autoplay = {true}
                        height = {swiperH}
                        showsPagination = {true}
                        dotColor='white'
                        activeDotColor='yellow'
                        horizontal={true}>
                    {
                        this.state.bannerList.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={()=> {
                                    // this.props.navigation.navigate('ProductDetail', {info:item})
                                }}
                                                  activeOpacity={0.8}
                                                  key = {item.link_url}
                                >

                                    <Image style={{height: screen.height*0.3, width:screen.width}} key = {index} resizeMode='cover' source={{uri: item.img_url}}/>
                                </TouchableOpacity>

                            )
                        })
                    }
                </Swiper>

            </View>
        )
    }

    renderCell = (info : Object) => {

        let newType =  info.item.NewsType
        let {onCellSelected} = this.props

        return(

            (newType == 1)?
            <TouchableOpacity style={styles.cellBGView}
                              onPress={()=> {
                                  onCellSelected(info.item)
                              }}
            >
                <View style={{backgroundColor:'white',justifyContent: 'space-between',
                    height:140-20}}>
                    <Text style={{marginTop:20,fontSize:16,width:screen.width-150-50}} numberOfLines={3}>{info.item.title}</Text>
                    <Text style={{marginBottom:20,fontSize:15,color:'gray'}}>{info.item.fields.source +"  "+ info.item.fields.zan_count}评论</Text>
                </View>
                <Image style={{width:150,height:100}} source={{uri: info.item.fields.homepic}} />
            </TouchableOpacity>

                : <TouchableOpacity style={{backgroundColor:'white',height:200}}
                                    onPress={()=> {
                                        onCellSelected(info.item)
                                    }}>
                    <Text style={{marginTop:10,fontSize:16,marginLeft:10}}>{info.item.title}</Text>
                    <Image style={{margin:10,flex:1}} source={{uri: info.item.fields.homepic}} />

                </TouchableOpacity>
        )
    }



    onMenuSelected = (info: any) => {
        // alert(info.title )
        this.props.navigation.navigate('ProductCollection', {info: info})
    }

    keyExtractor = (item: Object, index: number) => {
        return item.id
    }

    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataList}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderCell}
                    keyExtractor={this.keyExtractor}
                    refreshing={this.state.refresh}
                    onEndReachedThreshold= {0.4}
                    onRefresh={this._onRefresh}
                    onEndReached = {() =>{
                        page++;
                        this.requestData();
                        console.log('到底部了');
                    }}
                />
            </View>
        )
    }

    _onRefresh = () => {
        page =1;
        this.setState({
            refresh:true
        });
        this.requestData();
    }


    componentDidMount() {
        this.requestData()
    }

    requestData = () => {
        this.setState({isRefresh: true})
        this.loadBannerData()
        this.loadMainData()
    }


    loadBannerData = async () => {

        fetch(APIConst.News_xinwenGetCustomLuoboNewsList)
            .then((response)=>
                response.json()
            )
            .then((json)=>{
                console.log(json)
                this.state.bannerList =json.Data.Data

            })
            .catch((error)=>{
                console.log(error)
                alert(error)
            })

    }



    loadMainData = async () => {

        console.log(APIConst.News_xinwenGetNewsList+page)

        fetch(APIConst.News_xinwenGetNewsList+page)
            .then((response)=>
                response.json()
            )
            .then((json)=>{
                console.log(json)
                let arrayData = json.Data.Data;
                if(arrayData instanceof Array) {
                    let finalData = (page==1?json.Data.Data:this.state.dataList.concat(json.Data.Data)
                    )
                    this.setState({
                        dataList:finalData,
                        loaded: true,
                        refresh:false
                    })
                }
            })
            .catch((error)=>{
                console.log(error)
                alert(error)
            })
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.paper,
    },
    headerView:{
        backgroundColor: color.paper,
        width:screen.width,
    },
    recommendHeader: {
        height: 35,
        justifyContent: 'center',
        borderWidth: screen.onePixel,
        borderColor: color.border,
        paddingVertical: 8,
        paddingLeft: 20,
        backgroundColor: 'white'
    },
    topBarImage:{
        width:screen.width * 0.95,
        height:40,
        margin: 10,

    },
    topBarGB:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        height:40,
        width:screen.width * 0.95,
    },
    cellBGView:{
        flexDirection:'row',
        backgroundColor: 'white',
        height:120,
        padding:10,
        justifyContent: 'space-between',
        alignItems: 'center',
    }

})



export default NewsPage