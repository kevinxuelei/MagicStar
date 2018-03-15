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
import APIConst from "../../APIConst";
import Swiper from 'react-native-swiper';
import CategoryView from "./CategoryView";
import fetchRequest from "../../NetWorkTools";


type State = {
    luobodata: Array<Object>,
    categorydata: Array<Object>,
    usedProductData: Array<Object>,
    refreshing: boolean,
}



class UsedStoreScene extends PureComponent<>{

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: (
            <TouchableHighlight style={styles.topBarGB}
                                onPress={()=>alert('search action')}
                                underlayColor='rgb(255, 195, 0)' >
                <Image source={require('../../img/store/product_top.png')} style={styles.topBarImage} />
            </TouchableHighlight>
        ),
        headerStyle: {backgroundColor: color.mainBGColor},
    })



    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            luobodata: [],
            categorydata: [],
            usedProductData: [],
            refreshing: false,
        };
    }


    renderHeader = ()=>{
        let swiperH = (this.state.luobodata.length !== 0) ? screen.height*0.25 : 0
        let CategoryViewH = (this.state.luobodata.length !== 0) ? 60 : 0
        let CategoryViewOpacity = (this.state.luobodata.length !== 0) ? 1 : 0
        return(
            <View style={styles.headerView}>

                <Swiper autoplay = {true}
                        height = {swiperH}
                        showsPagination = {true}
                        dotColor='white'
                        activeDotColor='yellow'
                        horizontal={true}>
                    {
                        this.state.luobodata.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={()=> {
                                    this.props.navigation.navigate('ProductDetail', {info:item})

                                }}
                                                  activeOpacity={0.8}
                                                  key = {item.link_url}
                                >

                                    <Image style={{height: screen.height*0.25, width:screen.width}} key = {index} resizeMode='stretch' source={{uri: item.img_url}}/>
                                </TouchableOpacity>

                            )
                        })
                    }
                </Swiper>


                <CategoryView height={CategoryViewH} opacity={CategoryViewOpacity}/>

            </View>
        )
    }



    renderCell = (info : Object) => {

        let albumsArray = info.item.albums
        let albums = albumsArray[0]

        return(
            <TouchableOpacity style={styles.cellBGView}
                              onPress={()=> {
                                  this.props.navigation.navigate('ProductDetail', {info: info.item,isUsedProduct:true})

                              }}
                              activeOpacity={0.8}
            >


                <Image style={{height: (screen.width-2)/3, width:(screen.width-2)/3}} key = {info.product_id} resizeMode='stretch' source={{uri: albums.thumb_path}}/>

                <Text style={{color:'black',fontSize:14,marginTop:0,padding:5}}
                      numberOfLines={3}>{info.item.product_name}</Text>

                <View style={{backgroundColor:'white',flexDirection:'row',justifyContent:'space-between',height:30,width:(screen.width-2)/3,alignItems:'center',position:'absolute',bottom:0}}>

                    <Text style={{color:'black',fontSize:13,marginLeft:5}}
                          >￥{info.item.sell_price}</Text>

                    <View style={{backgroundColor:'red',justifyContent:'center',height:20,width:70,alignItems:'center',borderRadius:5}}>

                        <Text style={{color:'white',fontSize:13}}
                        >点击购买</Text>

                    </View>

                </View>
            </TouchableOpacity>
        )

    }



    keyExtractor = (item: Object, index: number) => {
        return item.id
    }


    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.state.usedProductData}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderCell}
                    keyExtractor={this.keyExtractor}
                    contentContainerStyle={styles.listViewStyle}
                />
            </View>
        )
    }


    componentDidMount() {
        // fetch(APIConst.UserdProduct_GetProductListForHome )
        //     .then((response)=>
        //         response.json()
        //     )
        //     .then((json)=>{
        //         console.log(json)
        //         let Data = json.Data.Data
        //
        //         this.setState({
        //             refreshing: false,
        //             luobodata: Data.luobodata,
        //             categorydata: Data.categorydata,
        //             usedProductData: Data.usedProductData,
        //         })
        //     })
        //     .catch((error)=>{
        //         console.log(error)
        //         alert(error)
        //     })

        fetchRequest(APIConst.UserdProduct_GetProductListForHome_test,'GET')
            .then( res=>{
                //请求成功
                if(res.header.statusCode == 'success'){
                    //这里设定服务器返回的header中statusCode为success时数据返回成功
                            console.log(json)
                            let Data = json.Data.Data

                            this.setState({
                                refreshing: false,
                                luobodata: Data.luobodata,
                                categorydata: Data.categorydata,
                                usedProductData: Data.usedProductData,
                            })

                }else{
                    //服务器返回异常，设定服务器返回的异常信息保存在 header.msgArray[0].desc
                    console.log(res.header.msgArray[0].desc);
                }
            }).catch( err=>{
            //请求失败
        })

    }




}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.paper
    },
    topBarGB:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        height:40,
        width:screen.width * 0.95,
    },
    topBarImage:{
        width:screen.width * 0.95,
        height:40,
        margin: 10,

    },
    listViewStyle:{
        flexDirection:'row', //设置横向布局
        flexWrap:'wrap'    //设置换行显示
    },
    cellBGView:{
        backgroundColor: 'white',
        width:(screen.width-2)/3,
        height:(screen.width-2)/3*1.7,
        // margin:1,
        padding:1,


        // flex:1,
        // backgroundColor: 'white',
        // height:140,
        // marginTop:10,
        // marginLeft:10,
        // marginRight:10,
        // justifyContent: 'center',
        // alignItems: 'center',
    }
})



export default UsedStoreScene