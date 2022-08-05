<template>
	<view class="wordtype-master">
		<view class="search-bar">
			<uni-search-bar v-model="searchValue" @input="change" cancelButton="none">
			</uni-search-bar>
			<button class="add-btn" type="default" plain="true" @click="add">
				<i class="iconfont icon-add"></i>
			</button>
		</view>

		<view class="master-content">
			<view class="item-row item-header">
				<view class="col-3">编号</view>
				<view class="col-9">名称</view>
			</view>
			<view class="item-row" v-for="(item,index) in items" @click="itemClick(item)">
				<view class="col-3">{{item.TypeNo}}</view>
				<view class="col-9">{{item.TypeName}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [],
				dataIsEmpty: false,
				searchValue: ""
			}
		},
		onLoad() {
			//获取资料			
			this.loadData();
		},
		methods: {
			search(e) {
				this.items = [];
				this.loadData();
			},
			//加载数据
			loadData() {
				this.$service.callBo("WordTypeBO", "GetList", {}).then(res => {
					this.items = res;
					this.isLoading = false;
				});
			},
			add() {
				// uni.navigateTo({
				// 	url: '/pages/views/wordtype-master-edit/wordtype-master-edit',
				// })
				this.$utils.navigateTo('/pages/views/wordtype-master-edit/wordtype-master-edit', {}).then(res => {
					if (res && res.data) {
						this.items.push(res.data);		
					}
				});
			},
			itemClick(item) {
				this.$utils.navigateTo('/pages/views/wordtype-master-edit/wordtype-master-edit', item).then(res => {
					console.log(res);
					if (res && res.data) {
						const {
							ID,
							TypeNo,
							TypeName
						} = res.data;
						let item = this.items.find(o => o.ID == ID);
						if (item) {
							item.TypeNo = TypeNo;
							item.TypeName = TypeName;
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wordtype-master {
		//padding: 10px 0px;
		background: white;
		height: 100%;
		overflow: hidden;

		.search-bar {
			padding: 0px 13px;
			display: flex;
			justify-content: center;
			align-items: center;

			.uni-searchbar {
				flex: 1;
			}

			.type-btn {
				font-size: 1rem;
				color: #387ef5;
				border: unset !important;
			}

			.add-btn {
				border: unset !important;
			}

			.iconfont {
				font-size: 1.2rem;
			}
		}
		
		.master-content{
			.item-header{
				background: #eee;
			}			
			.item-row{
				display: flex;
				justify-content: center;
				padding: 13px 8px;
				margin: 0px 20px;
				border-bottom: 1px solid #eee;
				.col-3{
					flex-basis: 25%;
				}
				.col-9{
					flex-basis: 75%;
				}
			}
		}

	}
</style>
