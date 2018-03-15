/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */

import React, {PureComponent} from 'react'
import {StatusBar, View} from 'react-native'
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation'
import color from './widget/color'
import HomeScene from "./scene/home/HomeScene";
import TabBarItem from "./widget/TabBarItem";
import StoreScene from "./scene/store/StoreScene";
import UsedStoreScene from "./scene/usedStore/UsedStoreScene";
import MineScene from "./scene/mine/MineScene";
import StoreProductDetail from "./scene/store/StoreProductDetail";
import StoreCollectionScene from "./scene/store/StoreCollectionScene";
import VideoDetailPage from "./scene/home/VideoDetailPage";
import NewDetailPage from "./scene/home/NewDetailPage";
import MineInfomationPage from "./scene/mine/MineInfomationPage";


const lightContentScenes = ['Home', 'Mine']

function getCurrentRouteName(navigationState: any) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index]
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route)
    }
    return route.routeName
}


class RootScene extends PureComponent<{}>{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
          StatusBar.setBarStyle('dark-content')
      }

    render(){
        return(

            <Navigator
                onNavigationStateChange={
                    (prevState, currentState) => {
                        const currentScene = getCurrentRouteName(currentState)
                        const previousScene = getCurrentRouteName(prevState)
                        if (previousScene !== currentScene) {
                            // if (lightContentScenes.indexOf(currentScene) >= 0) {
                            //     StatusBar.setBarStyle('light-content')
                            // } else {
                            //     StatusBar.setBarStyle('dark-content')
                            // }
                        }
                    }
                }
            />


        )
    }
}



const Tab = TabNavigator(
    {
        Home: {
            screen: HomeScene,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '资讯',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/news0.png')}
                        selectedImage={require('./img/tabbar/news1.png')}
                    />
                )
            }),
        },
        Store: {
            screen: StoreScene,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '商城',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/products0.png')}
                        selectedImage={require('./img/tabbar/products1.png')}
                    />
                )
            }),
        },

        UsedStore: {
            screen: UsedStoreScene,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '二手',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/ershou0.png')}
                        selectedImage={require('./img/tabbar/ershou1.png')}
                    />
                )
            }),
        },

        Mine: {
            screen: MineScene,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '我的',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/me0.png')}
                        selectedImage={require('./img/tabbar/me1.png')}
                    />
                )
            }),
        },
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        lazy: true,
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            activeTintColor: color.mainBGColor,
            inactiveTintColor: 'white',
            style: {backgroundColor: 'rgb(43, 43, 43)'},
        },
    }

)






const Navigator = StackNavigator(
    {
        Tab: {screen: Tab},
        ProductDetail: {screen: StoreProductDetail},
        ProductCollection: {screen: StoreCollectionScene},
        VideoPlay: {screen: VideoDetailPage},
        NewsDetail: {screen: NewDetailPage},
        MineInfomation: {screen:  MineInfomationPage},




    },
    {
        navigationOptions: {
            // headerStyle: { backgroundColor: color.primary }
            headerBackTitle: null,
            headerTintColor: '#333333',
            showIcon: true,
        },
    }

)

export default RootScene



