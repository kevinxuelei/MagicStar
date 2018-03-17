/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */


/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */

import React, {PureComponent} from 'react'
import {
    View, Text, StyleSheet, ScrollView, TouchableHighlight, ListView, Image, StatusBar, FlatList,
    TouchableOpacity,SectionList,
} from 'react-native'

import color from '../../widget/color'
import {screen, system} from '../../common'
import MenuView from "./MenuView";
import Swiper from 'react-native-swiper';
import APIConst from "../../APIConst";
import NavigationItem from "../../widget/NavigationItem";
import ScrollableTabView,{ ScrollableTabBar } from 'react-native-scrollable-tab-view';



type Props = {
    Id: string,
    onCellSelected: Function,
}

type State = {
    dataList: Array<Object>,
    bannerList: Array<Object>,
    adList: Array<Object>,
    secondTypeId: String,
    refreshing: boolean,

}


class StoreCollectionPage extends PureComponent<Props>{


    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataList: [],
            bannerList: [],
            secondTypeId:'',
            refreshing: false,
            adList: [],

        };
    }


    componentDidMount() {
        this.loadMainData()
    }


    loadMainData = async () => {
        let {Id} = this.props
        console.log(APIConst.Store_GetProductListByTypeId+Id)
        fetch(APIConst.Store_GetProductListByTypeId+Id)
            .then((response)=>
                response.json()
            )
            .then((json)=>{
                console.log(json)
                let Data = json.Data
                let productdata = Data.productdata

                let finalDataList = [];
                for (let i = 0; i < productdata.length; i++) {

                    let rowData = productdata[i]
                    let row = [];
                    for (let j = 0; j < rowData.productdata.length; j++) {
                        row.push(rowData.productdata[j]);
                    }
                    let newRowData = [row]

                    finalDataList.push({ data: [newRowData], key: i });
                    // this.state.adList.push(rowData.ad)
                }

                this.setState({
                    dataList:finalDataList,
                    bannerList:Data.luobodata,
                })
            })
            .catch((error)=>{
                console.log(error)
                alert(error)
            })
    }




    renderHeader = ()=>{
        let swiperH = (this.state.bannerList.length !== 0) ? screen.height*0.25 : 0
        let {onCellSelected} = this.props
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
                                    onCellSelected(item)
                                }}
                                                  activeOpacity={0.8}
                                                  key = {index}
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
        let sectionData = info.item[0]
        return(
            <View style={styles.list}>
                { sectionData.map((sectionData, i) => this.renderExpenseItem(sectionData, i))}
            </View>
        )

    }



    renderExpenseItem(info, i) {

        let albumsArray = info.albums
        let albums = albumsArray[0]
        console.log("---------" + albums)
        // let imageUrl = (albums.original_path ? albums.original_path : albums.thumb_path)


        let {onCellSelected} = this.props



        return albums ? <TouchableOpacity key={i} onPress={() =>
            onCellSelected(info)}
                                 underlayColor="transparent">
            <View style={styles.row}>

                <Image style={{height: (screen.width-2)/3, width:(screen.width-2)/3}} key = {info.product_id} resizeMode='stretch' source={{uri: albums.original_path}}/>

                <Text style={{color:'black',fontSize:14,marginTop:0,padding:5}}
                      numberOfLines={3}>{info.product_name}</Text>

                <View style={{backgroundColor:'white',flexDirection:'row',justifyContent:'space-between',height:30,width:(screen.width-2)/3,alignItems:'center',position:'absolute',bottom:0}}>

                    <Text style={{color:'black',fontSize:13,marginLeft:5}}
                    >￥{info.sell_price}</Text>

                    <View style={{backgroundColor:'red',justifyContent:'center',height:20,width:70,alignItems:'center',borderRadius:5}}>

                        <Text style={{color:'white',fontSize:13}}
                        >点击购买</Text>

                    </View>

                </View>

            </View>
        </TouchableOpacity> : <View/>
    }




    _renderSectionHeader = (info : Object) => {
        let index = info.section.key
        let  item = this.state.adList[index]
        if (index==0 || index==1){
            return(
                <TouchableOpacity onPress={()=> {
                    this.props.navigation.navigate('ProductDetail', {info:item})
                }}
                                  activeOpacity={0.8}
                                  key = {item.link_url}
                >

                    <Image style={{height: screen.height*0.2, width:screen.width,marginTop:20,marginBottom:20}} key = {index} resizeMode='cover' source={{uri: item.img_url}}/>
                </TouchableOpacity>
            )
        }
    }



    keyExtractor = (item: Object, index: number) => {
        return item.id
    }

    render(){

        return(
                <View style={styles.container}>
                    <SectionList
                        ListHeaderComponent={this.renderHeader}
                        renderItem={this.renderCell}
                        keyExtractor={this.keyExtractor}
                        // contentContainerStyle={styles.list}
                        // pageSize={3}
                        numColumns ={3}
                        // renderSectionFooter={this._renderSectionHeader}
                        showsVerticalScrollIndicator={false}
                        sections={
                            this.state.dataList
                        }
                    />
                </View>


        )
    }






}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.paper
    },
    cellBGView:{
        flex:1,
        backgroundColor: 'red',
        height:140,
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerView:{
        backgroundColor: color.paper,
        width:screen.width,
    },
    list: {
        //justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF'
    },
    row: {
        // backgroundColor: 'red',
        // justifyContent: 'center',
        // width: (screen.width - 1) / 4,
        // height: (screen.width - 1) / 4,
        // alignItems: 'center',
        // borderWidth: 0.5,
        // borderRadius: 5,
        // borderColor: '#E6E6E6'


        backgroundColor: 'white',
        width:(screen.width-2)/3,
        height:(screen.width-2)/3*1.7,
        // margin:1,
        padding:1,
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
    },


    sectionHeader: {
        marginLeft: 10,
        padding: 6.5,
        fontSize: 12,
        color: '#787878'
    },
    testbg: {
        height:100,
        color: 'red'
    },







})



export default StoreCollectionPage


