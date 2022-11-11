<template>
	<view class="study-words">
		<view class="words-content">
			<view class="words-count">
				<span>{{qty}}/{{sumQty}}题</span>
			</view>
			<view class="words-title1" @click="textToSpeech()">
				<image src="../../../static/img/voice.png" mode="heightFix"></image>
			</view>
			<!-- 			<view class="words-title2">{{itemSelect.WordName}}</view> -->
			<view class="words-items">
				<button v-for="(item,index) in items" :key="index" @click="onSelected(item)"><span>
						<span v-if="index==0">A.</span>
						<span v-if="index==1">B.</span>
						<span v-if="index==2">C.</span>
						<span v-if="index==3">D.</span>
						{{item.WordName}}</span></button>
			</view>
			<button class="words-close" type="primary" @click="close()">
				<div>退出</div>
			</button>
		</view>
		<!-- 		学习单词
		<button type="default" @click="textToSpeech()">播放</button>
		<button></button> -->
	</view>
</template>

<script>
	import WSI from '../../service/WechatSI'
	export default {
		data() {
			return {
				title: 'Hello',
				data: [],
				items: [],
				itemSelect: null,
				sumQty: 20,
				qty: 1,
				tUrl: "",
				fUrl: "",
			}
		},
		onLoad() {
			this.$service.callBo("WordBO", "GetList", {}).then(res => {
				if (res) {
					this.data = res;
					this.getItems();
				}
			});
			//this.textToSpeech();

			setTimeout(() => {
				//生成答对了和答错了语音地址
				let that = this;
				plugin.textToSpeech({
					lang: "zh_CN",
					tts: true,
					content: "好棒",
					success: function(res) {
						this.fUrl = res.filename;
					},
					fail: function(res) {
						console.log("fail tts", res)
					}
				});
				plugin.textToSpeech({
					lang: "zh_CN",
					tts: true,
					content: "错了",
					success: function(res) {
						this.fUrl = res.filename;
					},
					fail: function(res) {
						console.log("fail tts", res)
					}
				}), 10000
			})

		},
		methods: {
			//生成随机单词
			getItems() {
				if (this.qty >= this.sumQty) {
					uni.showModal({
						title: '提示',
						content: '学习一完成，是否继续？',
					}).then(res => {
						//console.log(res);
						if (res[1].confirm) {
							this.qty = 1;
							this.getItems();
						} else if (res[1].cancel) {
							uni.navigateBack({
								delta: 1,
							})
						}
					});
				}

				this.items = [];
				this.itemSelect = null;
				let n = this.data.length;
				let number = 4;
				while (number) {
					let i = Math.floor(Math.random() * n);
					if (!this.items.some(item => item.WordName == this.data[i].WordName)) {
						this.items.push(this.data[i]);
						if (!this.itemSelect)
							this.itemSelect = this.data[i];
						number--;
					}

				}
				this.items.forEach(o => o.IsCheck = false);
				this.items = this.items.sort(() => 0.5 - Math.random());
				WSI.textToSpeech(this.itemSelect.WordName);
			},
			//选择单词触发
			onSelected(item) {
				item.IsCheck = true;
				if (item.WordName == this.itemSelect.WordName) {
					uni.showToast({
						title: "回答正确！",
					});
					//产生下一题单词
					++this.qty;
					setTimeout(() => {
						this.getItems();
					}, 500)

				} else {
					uni.showToast({
						title: "回答错误！",
						icon: "error",
					})
				}
			},
			//退出
			close() {
				uni.navigateBack({
					delta: 1,
				})
			}
		}
	}
</script>

<style lang="scss">
	.study-words {
		//width: 100%;
		//height: 100%;

		.words-content {
			height: 80vh;
			margin: 50px;
			border: 5px solid $ant-color-geekblue-2;
			border-radius: 15px;
			position: relative;

			.words-count {
				background-color: $ant-color-geekblue-2;
				width: 150rpx;
				height: 30rpx;
				font-size: 12rpx;
				line-height: 30rpx;
				border-bottom-right-radius: 45rpx;

				span {
					padding-left: 10rpx;
				}
			}

			.words-title1 {
				text-align: center;
				font-size: 26rpx;
				padding: 20rpx;

				image {
					height: 100rpx;
				}
			}

			.words-title2 {
				text-align: center;
				color: gray;
			}

			.words-items {
				padding: 40rpx;
				display: flex;
				flex-flow: column;

				button {
					margin: 20rpx;
					height: 100rpx;
					text-align: left;
					line-height: 100rpx;
					box-shadow: 10rpx 10rpx 5rpx #EDEDED;
				}
			}

			.words-close {
				width: 50%;
				height: 180rpx;
				position: absolute;
				left: 50%;
				bottom: 0px;
				transform: translate(-50%, 50%);
				border-radius: 100rpx;
				font-size: 22px;
				background-image: linear-gradient(to right, $ant-color-gold-6, $ant-color-gold-8);

				div {
					//padding: 5rpx;
					line-height: 180rpx;
				}
			}
		}
	}
</style>
