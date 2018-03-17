//
//  ReactSDCycleScrollViewManager.m
//  MagicStar
//
//  Created by 董学雷 on 2018/3/16.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "ReactSDCycleScrollViewManager.h"
#import "ReactSDCycleScrollView.h"

#import <React/RCTBridge.h>           //进行通信的头文件
#import <React/RCTEventDispatcher.h>  //事件派发，不导入会引起Xcode警告

@interface ReactSDCycleScrollViewManager() <SDCycleScrollViewDelegate>

@end

@implementation ReactSDCycleScrollViewManager

RCT_EXPORT_MODULE()
RCT_EXPORT_VIEW_PROPERTY(autoScrollTimeInterval, CGFloat);
RCT_EXPORT_VIEW_PROPERTY(imageURLStringsGroup, NSArray);
RCT_EXPORT_VIEW_PROPERTY(autoScroll, BOOL);
RCT_EXPORT_VIEW_PROPERTY(pageControlAliment, NSInteger);
RCT_EXPORT_VIEW_PROPERTY(onClickBanner, RCTBubblingEventBlock)

- (UIView *)view{
  ReactSDCycleScrollView *testScrollView = [ReactSDCycleScrollView cycleScrollViewWithFrame:CGRectZero delegate:self placeholderImage:nil];
  testScrollView.pageControlStyle = SDCycleScrollViewPageContolStyleClassic;
  testScrollView.pageControlAliment = SDCycleScrollViewPageContolAlimentCenter;
  return testScrollView;
}

/**
 *  当事件导出用到 sendInputEventWithName 的方式时，会用到
 - (NSArray *) customDirectEventTypes {
 return @[@"onClickBanner"];
 }
 */

#pragma mark SDCycleScrollViewDelegate
/**
 *  banner点击
 */
- (void)cycleScrollView:(ReactSDCycleScrollView *)cycleScrollView didSelectItemAtIndex:(NSInteger)index
{

  if (!cycleScrollView.onClickBanner) {
    return;
  }
  
  NSLog(@"oc did click %li", [cycleScrollView.reactTag integerValue]);
  
  //  导出事件
  cycleScrollView.onClickBanner(@{@"target": cycleScrollView.reactTag,
                                  @"value": [NSNumber numberWithInteger:index+1]});
}

// 导出枚举常量，给js定义样式用
- (NSDictionary *)constantsToExport
{
  return @{
           @"SDCycleScrollViewPageContolAliment": @{
               @"right": @(SDCycleScrollViewPageContolAlimentRight),
               @"center": @(SDCycleScrollViewPageContolAlimentCenter)
               }
           };
}

//  因为这个类继承RCTViewManager，实现RCTBridgeModule，因此可以使用原生模块所有特性
//  这个方法暂时没用到
RCT_EXPORT_METHOD(testResetTime:(RCTResponseSenderBlock)callback) {
  callback(@[@(234)]);
}

@end
