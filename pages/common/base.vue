<template>
</template>

<script>
	export default {
		data() {
			return {
				eventChannel: null,
			}
		},
		methods: {
			getParam() {
				// #ifdef APP-NVUE
				this.eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
				// #endif
				// #ifndef APP-NVUE
				this.eventChannel = this.getOpenerEventChannel();
				// #endif

				// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
				return new Promise((resolve) => {
					this.eventChannel.on('acceptDataFromOpenerPage', function(res) {
						resolve(res);
					});
				});
			},
		}
	}
</script>

<style>
</style>
