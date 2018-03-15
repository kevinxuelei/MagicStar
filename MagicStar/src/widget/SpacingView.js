/**
 *
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */


import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import color from './color'


class SpacingView extends PureComponent<{}> {
    render() {
        return (
            <View style={styles.container}>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        height:25 ,
        backgroundColor: color.paper,
    },
})


export default SpacingView