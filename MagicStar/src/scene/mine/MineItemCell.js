/**
 *
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
    headerImage?: any,
    onMenuSelected: Function,
}



class MineItemCell extends PureComponent<Props> {




    render() {

        let  {onMenuSelected} = this.props

        let icon = this.props.image && <Image style={styles.icon} source={this.props.image} />
        let headerImge = this.props.headerImage && <Image style={styles.headerImage} source={this.props.headerImage} />

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                    // alert(this.props.title)
                    onMenuSelected && onMenuSelected(this.props.title)
                }}>
                    <View style={[styles.content, this.props.style]}>
                        {icon}
                        <Heading2>{this.props.title}</Heading2>
                        <View style={{flex: 1, backgroundColor: 'blue'}} />
                        <Paragraph style={{color: '#999999'}}>{this.props.subtitle}</Paragraph>
                        {headerImge}
                        <Image style={styles.arrow} source={require('../../img/mine/cell_arrow.png')} />
                    </View>

                    <View style={{backgroundColor:color.paper,width: screen.width,  height: screen.onePixel}} />
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
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
    headerImage: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius:5,
    },
})


export default MineItemCell