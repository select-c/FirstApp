<template>
	<view class="content">		
		<view class="my-info">
			<view class="info-left">
				<view >
					<image class="box-image" :src="userInfo.imgUrl" mode="aspectFit"></image>
					<button v-if="!isLogin" class="login-btn"  @click="login()">登陆</button>
					<text v-else>{{userInfo.nickName}}</text>
				</view>
			</view>
			<view class="info-right1">
				<view class="item-remark">已学习单词</view>
				<view>0</view>
			</view>
			<view class="info-right2">
				<view class="item-remark">学习天数</view>
				<view>0</view>
			</view>
		</view>
		<view class="other-list">
			<uni-list>
				<uni-list-item class="list-item" v-for="(item,index) in items" :title="item" link @click="onClick_Other(item)">
					{{item}}
				</uni-list-item>
			</uni-list>
		</view>

		<!-- 		<div class="my-login">
			<button class="login" @click="login()">登陆</button>
			<div>
				<text>{{userInfo.nickName}}</text>
			</div>
		</div>
		<div class="my-phone">
			<button type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber($event)">获取手机号</button>
		</div>
		<span>{{mobile}}</span> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				mobile: "***",
				userInfo: {nickName:'select',imgUrl:'../../../static/img/my.png'},
				isLogin:false,
				items: ["积分商城", "人工客服", "意见反馈", "更换头像", "修改呢称", "分享","单词"]
			}
		},
		onLoad() {

		},
		methods: {
			//登陆
			login() {
				//登陆
				if (wx) {
					let that = this;
					wx.login({
						success(res) {
							if (res.code) { //wx.login获取code.
								//授权
								wx.getSetting({
									success(res_auth) {
										if (res_auth.authSetting['scope.userInfo']) {
											//已经授权，可以直接调用getUserInfo获取头像呢称，不会弹框
											wx.getUserInfo({
												success(res_user) {
													console.log(res_user);
													that.userInfo.nickName = res_user.userInfo.nickName;
													that.userInfo.imgUrl = res_user.userInfo.avatarUrl;
													//发起网络请求					  
													let params = {
														code: res.code,
														imgUrl: res_user.userInfo.avatarUrl,
														nickName: res_user.userInfo.nickName,
														sex: res_user.userInfo.gender,
													}
													that.$service.callBo("WxLoginBO", "Get",
														params).then(ret => {
														wx.setStorageSync('sessionKey', ret
															.session_key
														); //存储sessionKey在Storage
														wx.setStorageSync('app_openid', ret
															.openid); //存储openid在Storage 
														console.log(ret);
														uni.showToast({
															title: "请求数据:" + JSON
																.stringify(ret),
															icon: 'none'
														})
													})

												}
											})
										}
									}
								})
							} else {
								this.$utils.showTotast('登录失败！' + res.errMsg)
							}
						}
					})
				} else {
					this.$utils.showTotast("wx is null");
				}

			},

			//获取手机
			getPhoneNumber(e) {
				uni.showToast({
					title: e.detail.errMsg,
					icon: 'none'
				})
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					let params = {
						encryptedData: e.detail.encryptedData,
						iv: e.detail.iv,
						session_key: wx.getStorageSync('sessionKey'),
					}
					this.$service.callBO("WxLoginBO", "getPhoneNumber", params).then(res => {
						console.log(res);
						this.mobile = res;
					});
				}
			},

			//明显跳转				
			onClick_Other(item) {
				if (item == "修改呢称"){
					uni.navigateTo({
						url: '/pages/tabbar-3-detial/tabbar-3-release/tabbar-3-release',
					});
					// uni.switchTab({
					// 	url: '/pages/tabbar/tabbar-1/tabbar-1'
					// });
					console.log(item);
				}else if(item=="单词"){
					uni.navigateTo({
						url: '/pages/views/words-master/words-master',
					});
				}
					
			},
		}
	};
</script>

<style lang="scss">
	.content {
		text-align: center;
		//height: 400upx;
		//margin-top: 200upx;
	}

	.my-info {
		height: 20vh;
		background-color: $color-primary;
		//background-color: var(--color-primary);
		color: white;
		margin: 20px;
		border-radius: 15px;
		display: flex;
		//font-weight: 600;
		font-size: 1.4rem;
		//justify-content: center;
		align-items: center;

		.info-left {
			flex: 1 1 50%;

			.box-image {
				width: 100%;
				height: $uni-img-size-lg;
			}
			.login-btn{
				width: 50%;
				font-size: 12rpx;
				background-color: lightblue;
			}
		}

		.info-right1 {
			flex: 1 1 25%;
			text-align: right;
		}

		.info-right2 {
			flex: 1 1 25%;
			text-align: right;
			padding-right: 30px;
		}

		.item-remark {
			color: #d9d9d9;
			font-size: 12px;
			padding-bottom: 10px;
		}
	}

	.other-list{
		text-align: left;		
		padding: 20px 40px;
		.list-item{
			font-size: 20px;
		}
	}

	.login {
		height: 50rpx;
		width: 200rpx;
		background-color: #007AFF;
		color: white;
	}

	.my-login {
		//height: 100px;
	}

	.my-phone {}
</style>
