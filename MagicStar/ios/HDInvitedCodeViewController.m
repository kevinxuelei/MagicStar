//
//  HDInviteCodeViewController.m
//  星魔力1976
//
//  Created by 董学雷 on 2017/9/1.
//  Copyright © 2017年 apple. All rights reserved.
//

#import "HDInvitedCodeViewController.h"
#import "Masonry.h"
#import "AppDelegate.h"
#import "HDReactViewController.h"
#define ScreenWidth [UIScreen mainScreen].bounds.size.width

#define ScreenHeight [UIScreen mainScreen].bounds.size.height

#define theApp                          ((AppDelegate *)[[UIApplication sharedApplication] delegate])
#define theWindow                       [[UIApplication sharedApplication] delegate].window
#define RGBA(r,g,b,a)                   [UIColor colorWithRed:r/255.0f green:g/255.0f blue:b/255.0f alpha:a]
#define HEXColor(colorString)           [UIColor colorWithHexString:colorString]

@interface HDInvitedCodeViewController ()
@property(nonatomic,strong) UILabel *codeLabel;
@property(nonatomic,strong) UILabel *threeLabel;


@end

@implementation HDInvitedCodeViewController

-(void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event{
  HDReactViewController *vc = [[HDReactViewController alloc]init];
  [self.navigationController pushViewController:vc animated:YES];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    [self setupNav];
    [self loadNewData];
    
    UILabel *codeLabel = [[UILabel alloc] init];
    codeLabel.text = @"我的邀请码: 100029";
    codeLabel.textAlignment = NSTextAlignmentCenter;
    codeLabel.textColor = [UIColor blackColor];
    codeLabel.font = [UIFont systemFontOfSize:17];
    [self.view addSubview:codeLabel];
    [codeLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(self.view).offset(50+64);;
        make.left.right.equalTo(self.view);
        make.height.equalTo(@21);
    }];
    self.codeLabel = codeLabel;
    
    
    UILabel *oneLabel = [[UILabel alloc] init];
    oneLabel.text = @"你可以把邀请码发送给好友";
    oneLabel.textAlignment = NSTextAlignmentCenter;
    oneLabel.textColor = [UIColor lightGrayColor];
    oneLabel.font = [UIFont systemFontOfSize:15];
    [self.view addSubview:oneLabel];
    [oneLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(codeLabel.mas_bottom).offset(60);;
        make.left.right.equalTo(self.view);
        make.height.equalTo(@21);
    }];
    
    UILabel *twoLabel = [[UILabel alloc] init];
    twoLabel.text = @"当好友使用该邀请码进行注册并消费";
    twoLabel.textAlignment = NSTextAlignmentCenter;
    twoLabel.textColor = [UIColor lightGrayColor];
    twoLabel.font = [UIFont systemFontOfSize:15];
    [self.view addSubview:twoLabel];
    [twoLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(oneLabel.mas_bottom).offset(5);;
        make.left.right.equalTo(self.view);
        make.height.equalTo(@21);
    }];
    
    UILabel *threeLabel = [[UILabel alloc] init];
    threeLabel.text = @"您将获得1%的魔豆奖励";
    threeLabel.textAlignment = NSTextAlignmentCenter;
    threeLabel.textColor = [UIColor blackColor];
    threeLabel.font = [UIFont systemFontOfSize:17];
    [self.view addSubview:threeLabel];
    [threeLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(twoLabel.mas_bottom).offset(5);;
        make.left.right.equalTo(self.view);
        make.height.equalTo(@21);
    }];
    self.threeLabel = threeLabel;
    UILabel *fourLabel = [[UILabel alloc] init];
    fourLabel.text = @"(所有奖励，永久有效)";
    fourLabel.textAlignment = NSTextAlignmentCenter;
    fourLabel.textColor = [UIColor lightGrayColor];
    fourLabel.font = [UIFont systemFontOfSize:14];
    [self.view addSubview:fourLabel];
    [fourLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(threeLabel.mas_bottom).offset(5);;
        make.left.right.equalTo(self.view);
        make.height.equalTo(@21);
    }];
    
    
    
    // Do any additional setup after loading the view.
}

-(void)loadNewData{
//    [MBProgressHUD showHUDAddedTo:self.view animated:YES];
//    NSMutableDictionary *params = [NSMutableDictionary dictionary];
//    params[@"userId"] = [USERDEFAULTS objectForKey:@"const_userid"];
//    [ARNetWorkTools getWithUrlString:API_GetUserInviteCode parameters:params success:^(id message) {
//        NSLog(@"%@",message);
//        self.codeLabel.text = [NSString stringWithFormat:@"我的邀请码:%@",message[@"Data"][@"Data"]];
//
//        [MBProgressHUD hideHUDForView:self.view animated:YES];
//    } failure:^(NSError *error) {
//        [MBProgressHUD hideHUDForView:self.view animated:YES];
//        [HDUtils makeShortToastAtBottom:[NSString stringWithFormat:@"%@",error.localizedDescription]];
//    }];
//
//    [ARNetWorkTools getWithUrlString:API_GetUserInviteBonuses parameters:params success:^(id message) {
//        NSLog(@"%@",message);
//        self.threeLabel.text = [NSString stringWithFormat:@"您将获得%@%%的魔豆奖励",message[@"Data"][@"Data"]];
////        self.codeLabel.text = [NSString stringWithFormat:@"我的邀请码:%@",message[@"Data"][@"Data"]];
//
//        [MBProgressHUD hideHUDForView:self.view animated:YES];
//    } failure:^(NSError *error) {
//        [MBProgressHUD hideHUDForView:self.view animated:YES];
//        [HDUtils makeShortToastAtBottom:[NSString stringWithFormat:@"%@",error.localizedDescription]];
//    }];
  
}

- (void)viewWillAppear:(BOOL)animated{
  AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  [app.nav setNavigationBarHidden:NO animated:animated];
  [super viewWillAppear:animated];
}

- (void)viewWillDisappear:(BOOL)animated{
  AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  [app.nav setNavigationBarHidden:YES animated:animated];
  [super viewWillDisappear:animated];
}
-(void)setupNav{
    self.title=@"iOS-UI";
    self.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"<返回" style:UIBarButtonItemStylePlain target:self action:@selector(BackAction)];
    self.navigationItem.leftBarButtonItem.tintColor=[UIColor blackColor];
    self.navigationItem.hidesBackButton = YES;
    //self.navigationController.navigationBar.barTintColor = [UIColor whiteColor];
        [self.navigationController.navigationBar setBarTintColor:[UIColor colorWithRed:255/255.f green:195/255.f blue:0.f alpha:1.0]];
    [self.view setBackgroundColor:RGBA(255, 255, 255, 1)];
}
-(void)BackAction{
    [self.navigationController popViewControllerAnimated:YES];
}
@end
