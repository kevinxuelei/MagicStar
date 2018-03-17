//
//  HDReactViewController.m
//  MagicStar
//
//  Created by 董学雷 on 2018/3/17.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "HDReactViewController.h"
#import <React/RCTRootView.h>
#import <React/RCTBundleURLProvider.h>
@interface HDReactViewController ()

@end

@implementation HDReactViewController

- (void)viewDidLoad {
    [super viewDidLoad];
  self.view.backgroundColor = [UIColor redColor];
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(goBack) name:@"goback" object:nil];
  
  self.navigationItem.title = @"我是ReactNative页面呦~";
  
  
  
  NSURL *jsCodeLocation;
  
  // 另外一种可以获得RN的类方法
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:[NSString stringWithFormat:@"./src/scene/mine/MineInvitation"] fallbackResource:nil];
  
//  NSString * strUrl = @"http://localhost:8081/index.ios.bundle?platform=ios&dev=true";
  
//  jsCodeLocation = [NSURL URLWithString:strUrl];
//
//    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"MineInvitation" fallbackResource:nil];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"MineInvitation"
                                               initialProperties:@{
                                                                   
                                                                   @"launchOptions":@{
                                                                       @"componentName":@"MineInvitation"
                                                                       }
                                                                   }
                                                   launchOptions:nil];
  self.view = rootView;
    // Do any additional setup after loading the view.
}


-(void)goBack{
  [self.navigationController popViewControllerAnimated:YES];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
