<template>
	<view class="login">
		<view class="title">登陆</view>
		<view class="title-remark">欢迎来到我的小程序</view>
		<view class="mobile">
			<input type="number" v-model="mobile" placeholder="手机号码" />
		</view>
		<view class="password">
			<input type="text" v-mode="password" placeholder="密码" />
		</view>
		<view class="submit">
			<button>登陆</button>
		</view>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile:"123456789",
				password:"",
			};
		},
		methods:{
			sumbmit(){
				
			}
		}
	}
</script>

<style lang="scss">
	
</style>
