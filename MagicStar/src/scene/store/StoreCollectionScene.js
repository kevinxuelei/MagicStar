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
import StoreCollectionPage from "./StoreCollectionPage";




type State = {
    dataList: Array<Object>,
    bannerList: Array<Object>,
    adList: Array<Object>,
    secondTypeId: String,
    refreshing: boolean,
    isHasSegment: boolean,
    segmentIdList: Array<Object>,
}


class StoreCollectionScene extends PureComponent<>{

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
        headerRight:(
            <NavigationItem
                icon={require('../../img/store/product_xiaolei.png')}
                title='   '
                onPress={() => {
                    alert('search_action')
                }}
            />
        ),
    })

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
            isHasSegment: false,
            segmentIdList: [],
        };
      }


    componentDidMount() {
        //获取二级分类id
        fetch(APIConst.Store_GetTypes + this.props.navigation.state.params.info.id)
            .then((response)=>
                response.json()
            )
            .then((json)=>{
                console.log(json)
                let DataArray = json.Data.Data
                if (DataArray.length==1){
                    this.state.isHasSegment = false;
                    let item =  DataArray[0]
                    this.state.secondTypeId=item.id
                    this.loadMainData();
                }
                if (DataArray.length>1){

                    this.state.isHasSegment = true;
                    this.setState({
                        isHasSegment:true,
                        segmentIdList: DataArray,
                    })

                }


            })
            .catch((error)=>{
                console.log(error)
                alert(error)
            })
    }





    loadMainData = async () => {
        console.log(APIConst.Store_GetProductListByTypeId+this.state.secondTypeId)
        fetch(APIConst.Store_GetProductListByTypeId+this.state.secondTypeId)
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
                    this.state.adList.push(rowData.ad)
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
        let imageHolder = 'http://ms.1976magic.com/upload/201711/04/201711041709477331.jpg'

        let imageUrl = (albums ? albums.original_path : imageHolder)

        return <TouchableOpacity key={i} onPress={() =>                                   this.props.navigation.navigate('ProductDetail', {info: info,isFromCollection:true})} underlayColor="transparent">
            <View style={styles.row}>

                <Image style={{height: (screen.width-2)/3, width:(screen.width-2)/3}} key = {info.product_id} resizeMode='stretch' source={{uri: imageUrl}}/>

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
        </TouchableOpacity>;
    }




    _renderSectionHeader = (info : Object) => {
        let index = info.section.key
        let  item = this.state.adList[index]
        if (index==0 || index==1){
            return item ? (
                <TouchableOpacity onPress={()=> {
                    this.props.navigation.navigate('ProductDetail', {info:item})
                }}
                                  activeOpacity={0.8}
                                  key = {item.link_url}
                >

                    <Image style={{height: screen.height*0.2, width:screen.width,marginTop:20,marginBottom:20}} key = {index} resizeMode='cover' source={{uri: item.img_url}}/>
                </TouchableOpacity>
            ) : <View/>
        }
    }



    keyExtractor = (item: Object, index: number) => {
        return item.id
    }

    render(){

        let segmentIDdata = this.state.segmentIdList

        return(

            this.state.isHasSegment ? <View style={styles.container}>


                    <ScrollableTabView
                        initialPage={0}
                        scrollWithoutAnimation={false}
                        renderTabBar={()=><ScrollableTabBar
                            style={{ height: 40 }}
                            underlineColor='#ce3d3a'
                            activeTextColor= {color.mainBGColor}
                            inactiveTextColor='white'
                            // underlineHeight={0}
                            textStyle={{ fontSize: 20 }}
                            tabsContainerStyle={{ alignItems: 'center'}}
                            backgroundColor='rgb(43,43,43)'
                            underlineStyle={{height:0}}

                        />}
                    >
                        {this.renderSegmentViews()}

                    </ScrollableTabView>

                </View>:

            <View style={styles.container}>
                <SectionList
                    ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderCell}
                    keyExtractor={this.keyExtractor}
                    // contentContainerStyle={styles.list}
                    numColumns ={3}

                    // pageSize={3}
                    renderSectionFooter={this._renderSectionHeader}
                    showsVerticalScrollIndicator={false}
                    sections={
                        this.state.dataList
                    }
                />


                {/*<TouchableOpacity style={styles.submitBtn} onPress={()=> {*/}
                    {/*// this.props.navigation.navigate('ProductDetail', {info:item})*/}
                    {/*this.loadMainData()*/}
                {/*}}*/}
                                  {/*activeOpacity={0.8}*/}
                {/*>*/}

                    {/*<Image style={{width:50,height:50}} resizeMode='cover' source={{uri: 'http://ms.1976magic.com/upload/201711/04/201711041709477331.jpg'}}/>*/}
                {/*</TouchableOpacity>*/}


            </View>
        )
    }


    renderSegmentViews(){
        let segment = []
        let data = this.state.segmentIdList
        for (let i = 0; i < data.length; i++) {
            let item = data[i]
            let id = item.id
            let segmentView = <StoreCollectionPage key={i} Id={id} tabLabel= {item.title}
            onCellSelected={(info)=>{

                this.props.navigation.navigate('ProductDetail', {info: info,isFromCollection:true})
            }}/>
            segment.push(segmentView)
        }

        return segment

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
    submitBtn: {
        position: 'absolute',
        top:300,
        right:0,
        margin:20,
        marginBottom: "auto",
        marginTop:"auto",
        height:50,
        width:50,
        backgroundColor:'red'
    },







})



export default StoreCollectionScene


