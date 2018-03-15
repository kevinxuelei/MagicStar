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
import MenuView from "./MenuView";
import Swiper from 'react-native-swiper';
import APIConst from "../../APIConst";



type Props = {
    navigation: any,
}

type State = {
    discounts: Array<Object>,
    dataList: Array<Object>,
    bannerList: Array<Object>,
    categoryList: Array<Object>,
    refreshing: boolean,
}


class StoreScene extends PureComponent<>{

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
            discounts: [],
            dataList: [],
            bannerList: [],
            categoryList: [],
            refreshing: false,
        };
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
                            this.props.navigation.navigate('ProductDetail', {info:item})
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
                    <MenuView menuInfos={this.state.categoryList} onMenuSelected={this.onMenuSelected}/>
                </View>
        )
    }

    renderCell = (info : Object) => {
        return(
            <View style={styles.cellBGView}>
                <Swiper autoplay = {true}
                        height = {140-10}
                        showsPagination = {true}
                        dotColor='white'
                        activeDotColor='yellow'
                        horizontal={true}>
                    {
                        info.item.loucenglist.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={()=> {
                                    this.props.navigation.navigate('ProductDetail', {info: item})
                                                  }}
                                                  activeOpacity={0.8}
                                                  key = {item.link_url}
                                >

                                    <Image style={{height:140,width:screen.width-10,borderRadius:5}} key = {item.link_url} resizeMode='stretch' source={{uri: item.img_url}}/>
                                </TouchableOpacity>
                            )
                        })
                    }
                </Swiper>

            </View>
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
            />
        </View>
        )
    }




    componentDidMount() {
        this.requestData()
    }

    requestData = () => {
        this.setState({refreshing: true})
        this.loadMainData()
    }

    loadMainData = async () => {

        fetch(APIConst.Store_GetProductListForHome)
            .then((response)=>
                response.json()
            )
            .then((json)=>{
                console.log(json)
                let Data = json.Data
                this.setState({
                    dataList:Data.loucengdata,
                    bannerList:Data.luobodata,
                    categoryList:Data.categorydata,
                    refreshing: false,
                })
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
        backgroundColor: color.paper
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
        flex:1,
        backgroundColor: 'white',
        height:140,
        marginTop:5,
        marginLeft:5,
        marginRight:5,
        justifyContent: 'center',
        alignItems: 'center',
    }


})



export default StoreScene