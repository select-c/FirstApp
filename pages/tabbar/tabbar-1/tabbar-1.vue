<template>
	<view class="content">
		<view class="home-header">
			<!-- <image class="card-img" src='../../../static/img/dog.jpeg' mode="scaleToFill"></image> -->
			<img class="card-img" src='../../../static/img/dog.jpeg' />
			<button type="primary" class="start-btn" @click="goto()">开始学习单词</button>
		</view>
		<view class="school-grade">
			<view class="grade-title">
				<text>各个年级的单词表</text>
			</view>
			<view class="grade-list">
				<uni-button class="grade-button" v-for="(item,index) in data" @click="itemClick(item)">
					{{item.GradeName}}
				</uni-button>
			</view>
		</view>
	</view>
</template>

<script>
	//import {callBo} from '../../service/service.js';
	export default {
		data() {
			return {
				title: 'Hello',
				data: [],
			};
		},
		onLoad() {
			//获取年级数据
			this.$service.callBo("GradeBO", "Get", {}).then(res => {
				console.log(res);
				this.data = res;
			})
		},
		methods: {
			itemClick(item) {
				this.$utils.showTotast(item.GradeName)
				this.$utils.showPage(this, "/school-play", "schoolplay", {})
					.then(value => {
						console.log("跳转成功");
					});

			},
			goto() {
				uni.navigateTo({
					url: '/pages/views/study-words/study-words'
					//url:'/pages/tabbar-3-detial/tabbar-3-qa/tabbar-3-qa'
				})
			}

		}
	};
</script>

<style lang="scss">
	.content {
		//background-color: $ant-color-gray-3;
		text-align: center;
		// height: 400upx;
		// margin-top:30upx;

		.home-header {
			width: 100%;
			max-height: 50vh;
			position: relative;

			image {
				//top: 0;
				//left: 0;
				//position: absolute;
				width: 100%;
				height: 100%;
			}

			.card-img {
				//position: absolute;
				width: 100%;
				height: 100%;
				border-radius: 10px;
			}

			.card-img {
				display: block; // 解决img放在div内下边留空问题
				object-fit: cover; // 不变形，超出部分会被裁掉
			}

			.start-btn {
				position: absolute;
				top: 60rpx;
				left: 100rpx;
				border-radius: 25px;
				font-size: 12px;
			}

		}

		.school-grade {

			.grade-title {
				text-align: left !important;
				padding-top: 20px;
				padding-left: 30px;
				color: gray;
			}

			.grade-list {
				padding: 20px;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;

				.grade-button {
					margin: 10px 0;
					flex-basis: 30%;
					font-size: 12px;
					background-color: $ant-color-geekblue-2;
				}
			}
		}
	}
</style>
