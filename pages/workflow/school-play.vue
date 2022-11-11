<template>
	<div class="school-play">
		<view class="progress-box">
			<progress :percent="percentData" activeColor="#10AEFF" stroke-width="3" />
		</view>
		<div class="school-content">
			<div>{{indexPage}}/{{pages}}</div>
			<div class="study-word">
				{{currentItem.WordName}}
			</div>
			<div class="start-icon">
				<button class="icon-circle" @click="speack()"><i class="iconfont icon-shengyin"></i></button>
			</div>
		</div>
		<div class="school-footer"><button @click="itemClick_Next()">下一个</button></div>
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
				currentItem: {WordName:null},
				eventChannel: null,
				percentData: 0,
				pages:0,
				indexPage:1,
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
						this.items = res;
						this.currentItem = res[0];
						this.pages=res.length;
					}
				})
			},
			//下一个
			itemClick_Next() {
				let index = this.items.indexOf(this.currentItem);
				this.percentData = index / this.items.length * 100;
				this.indexPage++;
				if (index <= this.items.length - 2)
					this.currentItem = this.items[index + 1];
				else {
					this.$utils.showTotast("已全部学习！");
				}
			},
			//播放
			speack() {
				WSI.textToSpeech(this.currentItem.WordName);
			}
		}

	}
</script>

<style scoped lang="scss">
	.school-play {
		//height: 100%;
		//display: flex;
		//flex-flow: column;
		background-color: $ant-color-gray-3;

		.school-content {
			padding: 20px;
			//width: 100%;
			height: 50vh;
			text-align: center;
			background-color: white;
			border-bottom-left-radius: 25px;
			border-bottom-right-radius: 25px;

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
		}

		.school-footer {
			position: absolute;
			width: 150px;
			height: 60px;
			font-size: 14px;
			left: 50%;
			bottom: 20px;
			transform: translateX(-50%);

			uni-button {
				//background-color: light $ant-color-geekblue-2;
				background-image: linear-gradient(to right, $ant-color-geekblue-6, $ant-color-geekblue-4);
				color: white;
			}
		}
	}
</style>
