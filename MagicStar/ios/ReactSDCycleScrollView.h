//
//  ReactSDCycleScrollView.h
//  MagicStar
//
//  Created by 董学雷 on 2018/3/16.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTComponent.h>
#import <React/UIView+React.h>
#import "SDCycleScrollView.h"

@interface ReactSDCycleScrollView : SDCycleScrollView

@property (nonatomic, copy) RCTBubblingEventBlock onClickBanner;

@end
