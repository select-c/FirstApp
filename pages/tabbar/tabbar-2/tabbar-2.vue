<template>
	<view class="count">
		<view class="count-header">
			<image src="../../../static/img/user.png"></image>
			<view>select</view>
		</view>
		<view class="count-content">
			<view class="content-left">
				<view>0</view>
				<view>好友排名</view>
			</view>
			<view class="content-right">
				<view>较远</view>
				<view>全球排名</view>
			</view>
		</view>
		<view class="count-footer">
			<button>我要开房</button>
			<button>扫码进房</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.count {
		text-align: center;
		height: 400upx;
		margin-top: 100upx;
		.count-header{
			image{
				width:200upx;
				height: 200upx;
			}
			view{
				margin-top:20upx;
			}
		} 
		.count-content{
			padding:50upx;
			display: flex;
			flex-flow: row;
			.content-left{
				flex:1;
			}
			.content-right{
				flex:1;
				border-left:1px solid gray;
			}
		}
		.count-footer{
			button{
				margin:20upx;
				border:1px solid rgb(229,116,58);
				color:rgb(229,116,58);
			}
			button:first-child {
				background-color: rgb(229,116,58);
				color:white;
			}
		}
	}	
</style>
