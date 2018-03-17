/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    NativeModules,
    requireNativeComponent
} from 'react-native';
import color from "../../widget/color";
import NavigationItem from "../../widget/NavigationItem";
import {screen} from "../../common";

var Push = NativeModules.PushNative;
class MineInvitation extends Component {

    static navigationOptions = ({navigation}: any) =>({
        headerTitle:(
            <Text style={{fontSize:21, color:'black'}}>React-UI</Text>

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


    render() {

        return(
            <View style={styles.container}>

                <TouchableOpacity onPress={() => {
                    Push.RNReturnIosVC('ios界面')
                }}>

                    <Text>React-UI</Text>


                </TouchableOpacity>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        alignSelf:'center',
        justifyContent: 'center',
    },
    buttonStyle:{
        width:200,
        height:100,
        backgroundColor:'red',
        alignSelf:'center',
        justifyContent: 'center',
        marginTop:100
    }
});

// export default MineInvitation
AppRegistry.registerComponent('MineInvitation', () => MineInvitation);