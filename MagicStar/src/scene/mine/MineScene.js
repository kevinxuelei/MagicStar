/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */


import React, {PureComponent} from 'react'
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, StatusBar, FlatList,
    RefreshControl, NativeModules,
    requireNativeComponent
} from 'react-native'


import {Heading2, Paragraph} from "../../widget/Text";
import color from '../../widget/color'
import {screen, system} from '../../common'
import MineItemCell from "./MineItemCell";
import SpacingView from "../../widget/SpacingView";
import { connect } from 'react-redux';
import { updateAvatar, updateName, updateSex } from '../../common/reduxUse/actions/UserInfoAction';

var Push = NativeModules.PushNative;

type Props = {

}

type State = {
    isRefreshing: boolean,
}


class MineScene extends PureComponent<Props, State>{

    static navigationOptions = ({navigation}: any) => ({
        headerTitle: (
            <Text style={{color:'black',fontSize:20}}>我的</Text>
        ),
        headerStyle: {backgroundColor: color.mainBGColor},
    })

    constructor(props: Object) {
        super(props)

        this.state = {
            isRefreshing: false
        }
    }

    renderHeader() {

        var avatar = ((this.props.undateUserInfo.avatar==='default')?require('../../img/store/background_image.png'): this.props.undateUserInfo.avatar)

        return (

            <View>
                <View style={styles.header}>

                    <TouchableOpacity onPress={()=>
                        this.props.navigation.navigate('MineInfomation')
                    }>
                       <Image style={styles.avatar} source={avatar} />


                    </TouchableOpacity>


                    <View style={{paddingRight:20,flex:1,flexDirection:'row', justifyContent: 'space-between', alignItems: 'center',}}>
                        <Text style={{color: 'black',fontSize:17 }}>{this.props.undateUserInfo.nickName}</Text>

                        <TouchableOpacity onPress={()=>
                            // alert('邀请有奖')
                            Push.RNOpenOneVC('邀请有奖')

                        }>
                            <Image style={{width:100,height:25}} source={require('../../img/mine/my_yqyj.jpg')} />
                        </TouchableOpacity>


                    </View>
                </View>

                <View style={{backgroundColor:color.paper,height:1,width:screen.width}}/>

                <View style={{backgroundColor:'white',width:screen.width,height:70,}}>
                    <View style={{backgroundColor:'white',width:150,height:70,justifyContent: 'center',alignItems: 'center',}}>
                        <Text style={{fontSize:15,paddingTop:10,color:'gray' }}>我的魔豆</Text>
                        <Text style={{color: 'black',fontSize:15 ,paddingTop:10 }}>33</Text>
                    </View>
                </View>

            </View>




        )
    }



    renderCells() {
        let cells = []
        let dataList = this.getDataList()
        for (let i = 0; i < dataList.length; i++) {
            let sublist = dataList[i]
            for (let j = 0; j < sublist.length; j++) {
                let data = sublist[j]
                let cell = <MineItemCell image={data.image} title={data.title} subtitle={data.subtitle} key={data.title} />
                cells.push(cell)
            }
            cells.push(<SpacingView key={i} />)
        }

        return (
            <View style={{flex: 1}}>
                {cells}
            </View>
        )
    }




    getDataList() {
        return (
            [
                [
                    {title: '我的购物车',  image: require('../../img/mine/gouwuche.png')},
                    {title: '已买到的商品', image: require('../../img/mine/my_mlist1.jpg')},
                    {title: '已退货的商品', image: require('../../img/mine/maichudeshangpin.png')},
                    {title: '我的二手商品',  image: require('../../img/mine/my_mlist5.jpg')},
                    {title: '二手商品发布', image: require('../../img/mine/my_mlist2.jpg')},
                    {title: '已买到的二手商品', image: require('../../img/mine/my_mlist1.jpg')}
                ],
                [

                    {title: '我的教学库', image: require('../../img/mine/my_mlist3.jpg')},
                    {title: '我的收藏',  image:require('../../img/mine/my_mlist4.jpg')},

                ],
                [
                    {title: '实名认证', image: require('../../img/mine/shimingrenzheng.png')},

                ]
            ]
        )
    }



    render(){
        return(
            <View style={{flex: 1, backgroundColor: color.paper}}>
                <View style={{position: 'absolute', width: screen.width, height: screen.height, backgroundColor: color.paper}} />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            // onRefresh={() => this.onHeaderRefresh()}
                            tintColor='gray'
                        />
                    }>
                    {this.renderHeader()}
                    <View style={{backgroundColor:color.paper,height:15,width:screen.width}}/>
                    {this.renderCells()}

                    <TouchableOpacity style={{backgroundColor:'white',width:screen.width,height:50,justifyContent: 'center', alignItems: 'center',}}
                                      onPress={() => {
                                          alert('退出登录')
                                      }}
                    >
                        <Text style={{color:'red',fontSize:20}}>退出登录</Text>

                    </TouchableOpacity>

                    <SpacingView/>
                </ScrollView>
            </View>
        )

    }

}

const styles = StyleSheet.create({


    icon: {
        width: 27,
        height: 27,
    },
    header: {
        backgroundColor: 'white',
        // paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 0,
        height:100,
    },
    avatar: {
        width: 60,
        height: 60,
        // marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 10,
        // borderWidth: 2,
        // borderColor: '#51D3C6'
    },


    topBarImage:{
        backgroundColor:color.mainBGColor
    }
})




const mapStateToProps = state => ({
    undateUserInfo: state.undateUserInfo
})

export default connect(mapStateToProps)(MineScene);