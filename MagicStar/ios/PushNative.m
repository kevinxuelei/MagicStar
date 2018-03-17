//
//  PushNative.m
//  MagicStar
//
//  Created by 董学雷 on 2018/3/17.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "PushNative.h"
#import <React/RCTBridge.h>

#import "HDInvitedCodeViewController.h"
#import "AppDelegate.h"

#import <React/RCTViewManager.h>

@implementation PushNative

RCT_EXPORT_MODULE()

//RN跳转原生界面
RCT_EXPORT_METHOD(RNOpenOneVC:(NSString *)msg){
  
  NSLog(@"RN传入原生界面的数据为:%@",msg);
  //主要这里必须使用主线程发送,不然有可能失效
  dispatch_async(dispatch_get_main_queue(), ^{
    //    [[NSNotificationCenter defaultCenter]postNotificationName:@"RNOpenOneVC" object:nil];
    HDInvitedCodeViewController *vc = [[HDInvitedCodeViewController alloc]init];
    
    AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    
    [app.nav pushViewController:vc animated:YES];
  });
}

RCT_EXPORT_METHOD(RNReturnIosVC:(NSString *)msg){
  
  NSLog(@"RN传入原生界面的数据为:%@",msg);
  //主要这里必须使用主线程发送,不然有可能失效
  dispatch_async(dispatch_get_main_queue(), ^{
    [[NSNotificationCenter defaultCenter] postNotificationName:@"goback" object:nil];
  });
}

@end
