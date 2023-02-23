<script>
export default {
	onLaunch: function() {
		console.log('App Launch');

		setTimeout(() => {
			uni.setTabBarBadge({
				index: 1,
				text: '31'
			});
			uni.showTabBarRedDot({
				index: 3
			});
		}, 1000);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
	/* @import url("@/static/iconfont/font/iconfont.css"); */
	@import url("https://at.alicdn.com/t/c/font_1675303_f2vqlk6vqlc.css");
/*每个页面公共css */ 
.uni-body{
	background-color: #f5f5f5 !important;
}
uni-page-body{
	height: 100%;
}
</style>
