/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { reset, start, stop } from './timerActions';

class TimerHome extends Component {
    _onPressReset() {
        this.props.dispatch(reset());
    }

    _onPressInc() {
        this.props.dispatch(start());
    }

    _onPressDec() {
        this.props.dispatch(stop());
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.counter}>{this.props.timer.seconds}</Text>
                <TouchableOpacity style={styles.reset} onPress={()=>this._onPressReset()}>
                    <Text>重置</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.start} onPress={()=>this._onPressInc()}>
                    <Text>开始</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.stop} onPress={()=>this._onPressDec()}>
                    <Text>停止</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    counter: {
        fontSize: 70,
        marginBottom: 70,
        color: '#FF8500'
    },
    reset: {
        margin: 10,
        backgroundColor: 'yellow'
    },
    start: {
        margin: 10,
        backgroundColor: 'yellow'
    },
    stop: {
        margin: 10,
        backgroundColor: 'yellow'
    }
});

const mapStateToProps = state => ({
    timer: state.timer
})

export default connect(mapStateToProps)(TimerHome);
