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
import NavigationItem from "../../widget/NavigationItem";
import Video from "react-native-video";
var itemW = (screen.width)/2;


var page  = 1;
type Props = {
    onCellSelected: Function,
    onCategoryItemSelected: Function,
}



type State = {
    discounts: Array<Object>,
    dataList: Array<Object>,
    bannerList: Array<Object>,
    categoryList: Array<Object>,

}


class VideoCollectionPage  extends PureComponent<>{


    static navigationOptions = ({navigation}: any) =>({
        headerTitle:(
            <Text style={{fontSize:21, color:'black'}}>{navigation.state.params.info.gridTitle}</Text>

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
            discounts: [],
            dataList: [],
            bannerList: [],
            categoryList: [],

            loaded: false,
            refresh:false,
        };
    }


    componentDidMount() {
        this.requestData()
    }

    requestData = () => {
        this.setState({refreshing: true})
        this.loadMainData()
    }


    loadMainData = async () => {

        fetch(APIConst.News_sub_VideoGetNewsList+this.props.navigation.state.params.info.classId)
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


    render(){
        return(
            <View style={styles.container}>

                <FlatList
                    data={this.state.dataList}

                    renderItem={this.renderCell}
                    keyExtractor={this.keyExtractor}
                    // contentContainerStyle={styles.listViewStyle}
                    // columnWrapperStyle={{borderWidth:2,borderColor:'black',paddingLeft:20}}
                    numColumns ={2}
                    refreshing={this.state.refresh}
                    onEndReachedThreshold= {0.4}

                />

            </View>
        )
    }

    renderCell = (info : Object) => {
        let {onCellSelected} = this.props

        return(
            <TouchableOpacity style={styles.cellBGView}
                              onPress={()=> {
                                  // onCellSelected(info.item)
                                  this.props.navigation.navigate('VideoPlay', {info: info.item})
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



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.paper,
    },

    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
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



export default VideoCollectionPage