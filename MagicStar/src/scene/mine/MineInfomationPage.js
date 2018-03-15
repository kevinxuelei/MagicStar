/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */


import React, {PureComponent} from 'react'
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, StatusBar, FlatList,
    RefreshControl, Alert,AlertIOS,
} from 'react-native'


import {Heading2, Paragraph} from "../../widget/Text";
import color from '../../widget/color'
import {screen, system} from '../../common'
import MineItemCell from "./MineItemCell";
import SpacingView from "../../widget/SpacingView";
import NavigationItem from "../../widget/NavigationItem";
import PickerWidget from "../../common/widget/PickerWidget";

// import * as ImagePicker from "react-native-image-picker";
var ImagePicker = require('react-native-image-picker');

import { connect } from 'react-redux';
import { updateAvatar, updateName, updateSex } from '../../common/reduxUse/actions/UserInfoAction';



type Props = {

}

type State = {
    isRefreshing: boolean,
    headerImage: any,
}


class MineInfomationPage extends PureComponent<Props, State>{

    static navigationOptions = ({navigation}: any) =>({
        headerTitle:(
            <Text style={{fontSize:21, color:'black'}}>我的资料</Text>

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

    constructor(props: Object) {
        super(props)

        this.state = {
            isRefreshing: false,
            headerImage: require('../../img/store/background_image.png'),
        }
    }


    pickHeaderImage(){
        ImagePicker.showImagePicker( (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                // this.setState({
                //     headerImage: source
                // });

                this.props.dispatch(updateAvatar(source));

            }
        });
    }

    updateNickName(){
        AlertIOS.prompt('提示', '请出输入您的昵称', [
            {
                text: '取消',
                onPress: function() {
                    console.log('取消按钮点击');
                }
            },
            {
                text: '确认',
                onPress: (name) =>
                    this.props.dispatch(updateName(name))

            },
        ])
    }

    updateSex(){
        this.refs.pickerView.show(this,(info)=>{
            this.props.dispatch(updateSex(info));
        });

    }

    renderCells() {
        let cells = []
        let dataList = this.getDataList()
        for (let i = 0; i < dataList.length; i++) {
            let sublist = dataList[i]
            for (let j = 0; j < sublist.length; j++) {
                let data = sublist[j]
                let cell = <MineItemCell image={data.image} title={data.title} subtitle={data.subtitle} key={data.title} style={{height:60}} headerImage={data.headerImage} onMenuSelected={(info)=>{
                    if (info === '头像') {
                        this.pickHeaderImage()
                    }else if(info==='昵称'){
                        this.updateNickName();

                    }else if(info==='性别'){
                        this.updateSex();

                    }else {
                        alert(info)
                    }
                }
                }/>
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

        var avatar = ((this.props.undateUserInfo.avatar==='default')?require('../../img/store/background_image.png'): this.props.undateUserInfo.avatar)


        return (
            [
                [
                    {title: '头像',headerImage: avatar}
                ],
                [
                    {title: '昵称',subtitle:this.props.undateUserInfo.nickName},
                    {title: '性别',subtitle:this.props.undateUserInfo.sex},
                    {title: '收货地址'}

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
                    {this.renderCells()}
                </ScrollView>
                <PickerWidget ref='pickerView' options={['男','女']} />
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
    },
    content: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 10,
    },
    icon: {
        width: 22,
        height: 22,
        marginRight: 10,
    },
    subtitleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    arrow: {
        width: 14,
        height: 14,
        marginLeft: 5,
    }
})




const mapStateToProps = state => ({
    undateUserInfo: state.undateUserInfo
})

export default connect(mapStateToProps)(MineInfomationPage);
