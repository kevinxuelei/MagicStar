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
import VideoDetailPage from "./VideoDetailPage";

var itemW = (screen.width)/2;


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


class VideoPage  extends PureComponent<Props,State>{

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
    }

    renderHeader = ()=>{
        let swiperH = (this.state.bannerList.length !== 0) ? screen.height*0.2 : 0
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

                <View style={{  flexDirection:'row',flexWrap:'wrap'}}>
                    {this.renderAllBadge()}
                </View>

                <View style={{  flexDirection:'row',height:10,backgroundColor:color.paper}}>
                </View>

            </View>
        )
    }


    renderCell = (info : Object) => {
        let {onCellSelected} = this.props

        return(
            <TouchableOpacity style={styles.cellBGView}
                              onPress={()=> {
                                  onCellSelected(info.item)
                                  // this.props.navigation.navigate('VideoPlay', {info: item})
                              }}
            >
                <View style={{backgroundColor:'white',flex:1}}>
                    <Image style={{height:itemW*0.6}} source={{uri: info.item.fields.videopic}} />
                    <Text style={{marginTop:10,marginLeft:10,fontSize:16}}>{info.item.title}</Text>
                    <View style={{backgroundColor:'white',justifyContent:'flex-end',  alignItems: 'flex-end',flex:1}}>
                        <Text style={{marginBottom:10,marginRight:10,fontSize:9,color:'gray'}}>●●●</Text>
                    </View>

                </View>

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
                    contentContainerStyle={styles.listViewStyle}
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


    componentDidMount() {
        this.requestData()
    }

    requestData = () => {
        this.setState({refreshing: true})
        this.loadBannerData()
        this.loadMainData()
    }


    loadBannerData = async () => {

        fetch(APIConst.News_VideoGetCustomLuoboNewsList)
            .then((response)=>
                response.json()
            )
            .then((json)=>{
                console.log(json)
                this.state.bannerList =  json.Data.Data
                // this.setState({
                //     bannerList:json.Data.Data,
                //     dataList:[],
                //
                // })
            })
            .catch((error)=>{
                console.log(error)
                alert(error)
            })

    }



    loadMainData = async () => {

        fetch(APIConst.News_VideoGetNewsList+page)
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

    _onRefresh = () => {
        page =1;
        this.setState({

            refresh:true
        });
        this.requestData();
    }


    getCategoryList() {
        return (
                [
                    {gridTitle: '撩妹',  iconImage: 'v1',classId:56},
                    {gridTitle: '社交',  iconImage: 'v2',classId:57},
                    {gridTitle: '亲子',  iconImage: 'v3',classId:58},
                    {gridTitle: '纸牌',  iconImage: 'v4',classId:59},
                    {gridTitle: '硬币',  iconImage: 'v5',classId:60},
                    {gridTitle: '近景',  iconImage: 'v6',classId:61},
                    {gridTitle: '舞台',  iconImage: 'v7',classId:62},
                    {gridTitle: '花切',  iconImage: 'v8',classId:63},
                ]
        )
    }

    renderAllBadge(){
        let BadgeData = this.getCategoryList();
        //定义数组所有的子组件
        var allBadge = [];
        //遍历json数据
        for(var i=0 ;i<BadgeData.length;i++){
            var model = BadgeData[i];

        //直接装入数组
            allBadge.push(
                <VideoCategoryView model={model}></VideoCategoryView>
            );
        }
        //返回
        return allBadge;
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
        backgroundColor: color.paper,
        width:itemW,
        height:itemW,

        // margin:1,
        paddingLeft:5,
        paddingRight:5,
        paddingBottom:10,
    },
    listViewStyle:{
        flexDirection:'row', //设置横向布局
        flexWrap:'wrap'    //设置换行显示
    },




})



export default VideoPage