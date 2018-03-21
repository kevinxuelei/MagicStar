/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */


import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, ViewPropTypes} from 'react-native'
// import {Heading2, Heading3, Paragraph} from './../Text'
// import Separator from './Separator'
import {screen, system} from '../../common'
import {Heading2, Heading3, Paragraph} from "../../widget/Text";
import color from "../../widget/color";

type Props = {
    image?: any,
    style?: ViewPropTypes.style,
    title: string,
    subtitle?: string,
    model:any,
    onCategorySelected: Function,
}




var cols = 4;
var boxW = screen.width/4;
// var vMargin = (screen.width-cols*boxW)/(cols+1);
var vMargin = 0;
var hMargin = 10;

class VideoCategoryView extends PureComponent<Props> {

    render() {

        let imageStr = this.props.model.iconImage

        var icon = require('../../img/News/v1.png')
        if (imageStr === 'v1') {
            icon = require('../../img/News/v1.png')
        }else if (imageStr === 'v2'){
            icon = require('../../img/News/v2.png')
        }else if (imageStr === 'v3'){
            icon = require('../../img/News/v3.png')
        }else if (imageStr === 'v4'){
            icon = require('../../img/News/v4.png')
        }else if (imageStr === 'v5'){
            icon = require('../../img/News/v5.png')
        }else if (imageStr === 'v6'){
            icon = require('../../img/News/v6.png')
        }else if (imageStr === 'v7'){
            icon = require('../../img/News/v7.png')
        }else if (imageStr === 'v8'){
            icon = require('../../img/News/v8.png')
        }

        let {onCategorySelected} = this.props

        return (


            <View style={styles.container}>

                <TouchableOpacity  style={styles.autoViewStyle}
                                  onPress={() => {
                                      // alert(this.props.model.gridTitle)
                                      onCategorySelected(this.props.model)
                                  }}>
                    <Image style={styles.imagesStyle}  source={icon} />
                    <Text style={{fontSize:14}}>{this.props.model.gridTitle}</Text>
                </TouchableOpacity>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: color.paper,
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
    },
    autoViewStyle:{
        backgroundColor:color.paper,
        //设置侧抽对齐
        alignItems:'center',
        justifyContent: 'center',
        width:boxW,
        height:boxW*0.7,
        marginLeft:vMargin,
        marginTop:hMargin
    },
    imagesStyle:{
        width:30,
        height:30,
        margin:5
    },
})


export default VideoCategoryView