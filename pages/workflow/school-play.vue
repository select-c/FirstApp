<template>
	<div class="school-play">
		<view class="progress-box">
			<progress :percent="percentData" activeColor="#10AEFF" stroke-width="3" />
		</view>
		<div class="school-content">
			<div>{{indexPage}}/{{pages}}				
				<button class="btn-init icon-circle" @click="itemClick_Init()"><i class="iconfont icon-zhongzhi"></i></button>
			</div>
			<div class="study-word">
				{{currentItem.WordName}}
			</div>
			<div class="box">
				<div class="wifi-symbol" @click="speack()">
					<div class="wifi-circle first"></div>
					<div class="wifi-circle second" :class="{'animation2':isAction}"></div>
					<div class="wifi-circle third" :class="{'animation3':isAction}"></div>
				</div>
			</div>
			<!-- 		<div class="start-icon">
				<button class="icon-circle" @click="speack()"><i class="iconfont icon-shengyin"></i></button>
			</div> -->
		</div>
		<div class="school-footer">
			<div class="btn"><button @click="itemClick_Back()">上一个</button></div>
			<div class="btn"><button @click="itemClick_Next()">下一个</button></div>
		</div>

	</div>
</template>

<script>
	import WSI from '../service/WechatSI'
	import base from '@/pages/common/base'
	export default {
		data() {
			return {
				data: [],
				items: [],
				currentItem: {
					WordName: null
				},
				eventChannel: null,
				percentData: 0,
				pages: 0,
				indexPage: 1,
				isAction: false,
			}
		},
		mixins: [base],
		onLoad(options) {
			this.getParam().then(res => {
				if (res.data) {
					this.data = res.data.item;
					//加载数据
					this.getData();
				}
			})
		},
		methods: {
			//获取数据
			getData() {
				let params = {
					itemStatus: 1,
					itemTypeID: this.data.ID,
					searchValue: "",
					pageSize: 0,
					pageIndex: 1
				}
				this.$service.callBo("WordBO", "Get", params).then(res => {
					if (res) {
						let wordName = uni.getStorageSync('current_WordName');
						this.items = res;
						if (wordName) {
							let item = this.items.find(o => o.WordName == wordName);
							if (item) {
								this.currentItem = item;
								let index = this.items.indexOf(this.currentItem);
								this.percentData = index / this.items.length * 100;
								this.indexPage = index + 1;
							} else
								this.currentItem = res[0];
						} else
							this.currentItem = res[0];
						this.pages = res.length;
					}
				})
			},
			//下一个
			itemClick_Next() {
				let index = this.items.indexOf(this.currentItem);
				this.percentData = index / this.items.length * 100;
				this.indexPage++;
				if (index <= this.items.length - 2) {
					this.currentItem = this.items[index + 1];
					uni.setStorage({
						key: 'current_WordName',
						data: this.currentItem.WordName,
					});
				} else {
					this.$utils.showTotast("已全部学习！");
				}
			},
			//上一个
			itemClick_Back() {
				let index = this.items.indexOf(this.currentItem);
				if (index == 0)
					this.$utils.showTotast("已经是第一个单词了！");
				this.currentItem = this.items[index - 1];
				this.percentData = (index + 1) / this.items.length * 100;
				this.indexPage--;
				uni.setStorage({
					key: 'current_WordName',
					data: this.currentItem.WordName,
				});
			},
			//重置
			itemClick_Init() {
				this.indexPage = 1;
				if (this.items.length > 0)
					this.currentItem = this.items[0];
				this.percentData = 1 / this.items.length * 100;
			},

			//播放
			speack() {
				this.isAction = true;
				WSI.textToSpeech(this.currentItem.WordName);
				setTimeout(() => {
					this.isAction = false;
				}, 3000)
			},

		}
	}
</script>

<style scoped lang="scss">
	.school-play {
		height: 100%;
		//display: flex;
		//flex-flow: column;
		//background-color: $ant-color-gray-3;
		background-color: white;

		.school-content {
			padding: 20px;
			//width: 100%;
			height: 75vh;
			//flex:1;
			flex-basis: 90%;
			text-align: center;
			background-color: white;
			border-bottom-left-radius: 25px;
			border-bottom-right-radius: 25px;

			.btn-init {
				display: inline-block;
				float: right;
				color:  $ant-color-geekblue-6;
			}

			.study-word {
				padding-top: 50px;
				font-size: 80px;
				height: 50%;
			}

			.start-icon {
				display: flex;
				justify-content: center;

				.icon-circle {
					width: 80px;
					height: 80px;
					border-radius: 50%;
					background-color: $ant-color-geekblue-6;
				}

				i {
					font-size: 36px;
					line-height: 80px;
					color: white;
				}
			}

			.box {
				width: 1px;
				height: 120px;
				box-sizing: border-box;
				position: relative;
				margin: 50px auto;
			}

			.wifi-symbol {
				width: 50px;
				height: 50px;
				box-sizing: border-box;
				overflow: hidden;
				transform: rotate(135deg);
			}

			.wifi-circle {
				border: 5px solid #999999;
				border-radius: 50%;
				position: absolute;
			}

			.first {
				width: 5px;
				height: 5px;
				background: #cccccc;
				top: 45px;
				left: 45px;
			}

			.second {
				width: 25px;
				height: 25px;
				top: 35px;
				left: 35px;
				// animation: fadeInOut 1s infinite 0.2s;
			}

			.third {
				width: 40px;
				height: 40px;
				top: 25px;
				left: 25px;
				// animation: fadeInOut 1s infinite 0.4s;
			}

			.animation2 {
				animation: fadeInOut 1s infinite 0.2s;
			}

			.animation3 {
				animation: fadeInOut 1s infinite 0.4s;
			}

			@keyframes fadeInOut {
				0% {
					opacity: 0;
				}

				100% {
					opacity: 1;
				}
			}
		}

		.school-footer {
			flex-basis: 10%;
			//position: relative;
			width: 100%;
			height: 80px;

			.btn {
				// position: absolute;
				// width: 150px;
				// height: 60px;
				// font-size: 14px;
				// left: 50%;
				// bottom: 20px;
				// transform: translateX(-50%);
				display: inline-block;
				width: calc(50% - 40px);
				padding: 20px;

				uni-button {
					background-color: $ant-color-geekblue-6;
					//background-color: light $ant-color-geekblue-2;					
					//background-image: linear-gradient(to right, #1890ff,#69c0ff);
					color: white;
				}
			}
		}
	}
</style>
