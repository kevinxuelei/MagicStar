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




type State = {
    dataList: Array<Object>,
    bannerList: Array<Object>,
    secondTypeId: String,
    refreshing: boolean,
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
                let item =  DataArray[0]
                this.state.secondTypeId=item.id
                // this.setState({
                //     secondTypeId:item.id
                // })

                this.loadMainData();
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

                    finalDataList.push({ data: row, key: i });
                }

                let newdataSource = [];
                newdataSource.push({ data: finalDataList, key: 0 });


                this.setState({
                    dataList:newdataSource,
                    // bannerList:Data.luobodata,
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

                <View style={myStyles.width}/>

            </View>
        )
    }


    renderCell = (info : Object) => {

        // let albumsArray = info.item.albums
        // let albums = albumsArray[0]
        console.log(info)

        let sectionData = info.item.data


        return(
            <View style={styles.list}>

                {/*<TouchableOpacity style={styles.cellBGView}*/}
                                  {/*onPress={()=> {*/}
                                      {/*this.props.navigation.navigate('ProductDetail', {info: info.item,isUsedProduct:true})*/}

                                  {/*}}*/}
                                  {/*activeOpacity={0.8}*/}
                {/*>*/}


                    {/*<Image style={{height: (screen.width-2)/3, width:(screen.width-2)/3}} key = {info.product_id} resizeMode='stretch' source={{uri: albums.thumb_path}}/>*/}

                    {/*<Text style={{color:'black',fontSize:14,marginTop:0,padding:5}}*/}
                          {/*numberOfLines={3}>{info.item.product_name}</Text>*/}

                    {/*<View style={{backgroundColor:'white',flexDirection:'row',justifyContent:'space-between',height:30,width:(screen.width-2)/3,alignItems:'center',position:'absolute',bottom:0}}>*/}

                        {/*<Text style={{color:'black',fontSize:13,marginLeft:5}}*/}
                        {/*>￥{info.item.sell_price}</Text>*/}

                        {/*<View style={{backgroundColor:'red',justifyContent:'center',height:20,width:70,alignItems:'center',borderRadius:5}}>*/}

                            {/*<Text style={{color:'white',fontSize:13}}*/}
                            {/*>点击购买</Text>*/}

                        {/*</View>*/}

                    {/*</View>*/}
                {/*</TouchableOpacity>*/}



                { sectionData.map((sectionData, i) => this.renderExpenseItem(sectionData, i))}
            </View>
        )

    }

    renderExpenseItem(info, i) {

        let albumsArray = info.albums
        let albums = albumsArray[0]

        return <TouchableOpacity key={i} onPress={() =>                                   this.props.navigation.navigate('ProductDetail', {info: info,isUsedProduct:true})} underlayColor="transparent">
            <View style={styles.row}>

                <Image style={{height: (screen.width-2)/3, width:(screen.width-2)/3}} key = {info.product_id} resizeMode='stretch' source={{uri: albums.thumb_path}}/>

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



    _renderSectionHeader = ({ section }) => (
        <View style={{ flex: 1, height: 25 }}>
            <Text style={styles.sectionHeader} >哈哈哈{section.key}</Text>
        </View>
    );



    keyExtractor = (item: Object, index: number) => {
        return item.id
    }





    render(){


        return(
            <View style={styles.container}>


                <SectionList

                    // ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderCell}
                    // keyExtractor={this.keyExtractor}
                    contentContainerStyle={styles.list}
                    // // horizontal={true}
                    pageSize={3}  // 配置pageSize确认网格数量
                    renderSectionHeader={this._renderSectionHeader}
                    // renderSectionFooter={this._renderSectionHeader}
                    showsVerticalScrollIndicator={false}
                    sections={ // 不同section渲染相同类型的子组件
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







})



export default StoreCollectionScene


