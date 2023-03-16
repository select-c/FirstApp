<template>
	<view class="content">
		图片展示
		<button @click="postData()"></button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			postData() {
				let params = {
					methodName: "insert",
					data: [{
							RoomNo: "101",
							RoomName: "101房"
						},
						{
							RoomNo: "101",
							RoomName: "101房"
						},
						{
							RoomNo: "101",
							RoomName: "101房"
						},
						{
							RoomNo: "101",
							RoomName: "101房"
						},
						{
							RoomNo: "101",
							RoomName: "101房"
						}
					]
				}
				this.$service.callBO("WxLoginBO", "getPhoneNumber", params).then(res => {
					console.log(res);
					//this.mobile = res;
				});
			},
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}
</style>
