/**
 * Copyright (c) 2018-present,xuelei dong
 * All rights reserved.
 */


const HostUrl = 'http://msapi.1976magic.com'

const signatureStr = '&sign=2b58478bfe440ac78504abcc97252a17&Timespan=2018-03-07 17:10:49'

const new_signtureStr = '&Timespan=2018-03-13%2022%3A18%3A05&isRefresh=true&sign=16da68159aa4fdd4c4fe3759437b898a'

export default {

    UserInfo_Url: '/api/Account/GetUserInfo?privateKey=XJL4FH&userId=29',

    //首页-新闻头部轮播
    News_xinwenGetCustomLuoboNewsList: HostUrl + '/api/News/GetCustomLuoboNewsList',
    //首页-新闻列表
    News_xinwenGetNewsList: HostUrl + '/api/News/GetNewsList?deviceId=d820356316395d864b575b0783ea88a93daa3dfb&pageSize=10&pageIndex=',



    //首页-评测头部轮播
    News_PingCeGetCustomLuoboNewsList: HostUrl + '/api/PingCe/GetCustomLuoboNewsList',
    //首页-评测列表
    News_PingCeGetNewsList: HostUrl + '/api/PingCe/GetNewsList?deviceId=d820356316395d864b575b0783ea88a93daa3dfb&pageSize=10&pageIndex=',
    //首页-视频头部轮播
    News_VideoGetCustomLuoboNewsList: HostUrl + '/api/Video/GetCustomLuoboNewsList',
    //首页-视频列表
    News_VideoGetNewsList: HostUrl + '/api/Video/GetNewsList?deviceId=d820356316395d864b575b0783ea88a93daa3dfb&pageSize=10&pageIndex=',
    //首页-视频子列表
    News_sub_VideoGetNewsList: HostUrl + '/api/Video/GetNewsList?deviceId=27926a8ff13b18f71301145d4e592778c8ccb958&pageIndex=1&pageSize=100&categoryId=',





    //商城-首页获取产品列表
    Store_GetProductListForHome: HostUrl + '/api/Product/GetProductListForHome',
    //商城-获取分类列表
    Store_GetTypes: HostUrl + '/api/Product/GetTypes?typeId=',
    //商城-列表页获取产品列表
    Store_GetProductListByTypeId: HostUrl + '/api/Product/GetProductListByTypeId?isRefresh=true'+new_signtureStr+'&typeId=',
    //商城-获取单条详细内容
    Store_GetDetailInfo: HostUrl + '/api/News/GetNewsDetail?deviceId=1&newsId=',


    //二手-获取首页列表
    UserdProduct_GetProductListForHome : HostUrl + '/api/UsedProduct/GetProductListForHome',
    //二手-获取单条详细内容
    UserdProduct_GetuedProductDetail   : HostUrl + '/api/UsedProduct/GetuedProductDetail?newsId=',
    //测试数据
    UserdProduct_GetProductListForHome_test :  '/api/UsedProduct/GetProductListForHome',


}