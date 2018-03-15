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
import { increase, decrease, reset } from './actions';

class ReduxDemo extends Component {
    _onPressReset() {
        this.props.dispatch(reset());
    }

    _onPressInc() {
        this.props.dispatch(increase());
    }

    _onPressDec() {
        this.props.dispatch(decrease());
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.counter}>{this.props.counter.count}</Text>
                <TouchableOpacity style={styles.reset} onPress={()=>this._onPressReset()}>
                    <Text>归零</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.start} onPress={()=>this._onPressInc()}>
                    <Text>加1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.stop} onPress={()=>this._onPressDec()}>
                    <Text>减1</Text>
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
    counter: state.counter
})

export default connect(mapStateToProps)(ReduxDemo);

