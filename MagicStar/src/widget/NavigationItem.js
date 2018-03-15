/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */


import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, ViewPropTypes} from 'react-native'


type Props = {
    icon?: any,
    iconStyle?: ViewPropTypes.style,
    titleStyle?: ViewPropTypes.style,
    title?: string,
    onPress?: Function,
}

class NavigationItem extends PureComponent<Props> {
    render() {
        let icon = this.props.icon &&
            <Image style={[styles.icon, this.props.iconStyle]} source={this.props.icon} />

        let title = this.props.title &&
            <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                {icon}
                {title}
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 15,
        height: 15,
        margin: 5,
    },
    title: {
        fontSize: 20,
        color: 'black',
        margin: 0,
    }
})


export default NavigationItem