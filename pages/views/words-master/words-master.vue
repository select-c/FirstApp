<template>
	<view class="words-master">
		<view class="search-bar">
			<uni-search-bar v-model="searchValue" @input="change" cancelButton="none">
			</uni-search-bar>
			<button class="type-btn" type="default" plain="true" @click="type">
				类别
			</button>
			<button class="add-btn" type="default" plain="true" @click="add">
				<i class="iconfont icon-add"></i>
			</button>
		</view>

		<view>
			<uni-segmented-control :current="itemStatus" :values="itemStatusList" @clickItem="search($event)"
				styleType="button" activeColor="blue"></uni-segmented-control>
		</view>
		<view class="word-content">
			<view class="word-left">
				<button v-for="(type,index) in types" class="type-btn" :class="{active:type.Selected}"
					@click="typeClick(type)">
					{{type.TypeName}}
				</button>
			</view>
			<view class="word-right">
				<scroll-view scroll-y @scrolltolower="scroll" class="right-content">
					<view v-if="!dataIsEmpty">
						<!-- 	<view class="word-list" v-for="(item,index) in items">
							<button @click="itemClick(item)">{{item.WordName}}</button>
						</view> -->
						<uni-list>
							<uni-list-item :title="item.WordName" clickable @click="itemClick(item)"
								v-for="(item,index) in items">
							</uni-list-item>
						</uni-list>
					</view>
					<view class="empty-content" v-else>
						没有相关的资料
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemStatusList: ["启用", "禁用", "全部"],
				items: [],
				types: [],
				currentActive: null,
				itemStatus: 0,
				pageSize: 20,
				pageIndex: 1,
				isMore: true,
				dataIsEmpty: false,
				searchValue: ""
			}
		},
		onPullDownRefresh() {
			uni.showToast({
				title: "下拉刷新!"
			})
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad() {
			//获取类别
			this.getTypeData();
			//获取资料			
			this.loadData();
		},
		activated(){
			this.getTypeData();
		},
		methods: {
			change(res) {
				this.pageIndex = 1;
				this.items = [];
				this.loadData();
			},
			search(e) {
				if (this.itemStatus != e.currentIndex) {
					this.itemStatus = e.currentIndex;
				}
				this.pageIndex = 1;
				this.items = [];
				this.loadData();
			},
			//加载类别
			getTypeData() {
				this.$service.callBo("WordBO", "GetItemType").then(res => {
					if (res)
						this.types = res;
					if (this.types.length) {
						this.types.forEach(o => {
							this.$set(o, "Selected", false);
						});
						this.types.unshift({
							ID: "",
							TypeNo: "999",
							TypeName: "全部",
							Selected: true,
						});
						this.currentActive = this.types.find(o => o.TypeName == "全部");
					}
				})
			},
			//加载数据
			loadData() {
				let itemStatus = 0;
				if (this.itemStatus == 0)
					itemStatus = 1;
				else if (this.itemStatus == 1)
					itemStatus = 0;
				else
					itemStatus = 2;
				let params = {
					itemStatus: itemStatus,
					itemTypeID: this.currentActive ? this.currentActive.ID : "",
					searchValue: this.searchValue,
					pageSize: this.pageSize,
					pageIndex: this.pageIndex
				};
				this.$service.callBo("WordBO", "Get", params).then(res => {
					if (res) {
						res.forEach(o => this.items.push(o));
						this.isMore = res.length == this.pageSize;
						this.dataIsEmpty = this.items.length == 0;
						this.pageIndex++
					}
					this.isLoading = false;
				})
			},
			add() {
				// uni.navigateTo({
				// 	url: '/pages/views/words-master-edit/words-master-edit',
				// })
				this.$utils.navigateTo('/pages/views/words-master-edit/words-master-edit', {}).then(res => {					
					if (res && res.data) {
						this.items.push(res.data);		
					}
				});
			},
			type() {
				let path = '/pages/views/wordtype-master/wordtype-master';
				this.$utils.navigateTo(path, {}).then(res => {
					this.getTypeData();
				});
			},
			typeClick(type) {
				//type.Selected = false;				
				//type.TypeName=type.TypeName+"1";
				if (this.currentActive.TypeName != type.TypeName) {
					type.Selected = true;
					this.currentActive.Selected = false;
					this.currentActive = type;
				}
				this.pageIndex = 1;
				this.items = [];
				this.loadData();
			},
			itemClick(item) {
				this.$utils.navigateTo('/pages/views/words-master-edit/words-master-edit', item).then(res => {
					console.log(res);
					if (res && res.data) {
						const {
							ID,
							WordNo,
							WordName
						} = res.data;
						let item = this.items.find(o => o.ID == ID);
						if (item) {
							item.WordNo = WordNo;
							item.WordName = WordName;
						}
					}
				});
				// let data = JSON.stringify(item);
				// uni.navigateTo({
				// 	url: '/pages/views/words-master-edit/words-master-edit?data=' + data,
				// })
			},
			scroll() {
				if (this.isMore && !this.isLoading) {
					this.isLoading = true;
					this.loadData();
				}
				//uni.startPullDownRefresh();	
			}
		}
	}
</script>

<style lang="scss" scoped>
	.words-master {
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

		.word-content {
			display: flex;
			//padding: 13px 0;
			height: 100%;
		}

		.word-left {
			width: 100px;
			background: #eee;

			.active {
				border-left: 2px solid orangered;
				background: white;
			}

			.type-btn {
				border-radius: unset !important;
			}

			.type-btn:after {
				border-radius: unset !important;
				border-right: unset !important;
				border-bottom: unset !important;
				border-left: unset !important;
			}
		}

		.word-right {
			flex: 1;
			padding-left: 20px;
			padding-bottom: 50px;

			.right-content {
				position: relative;
				height: 100%;
				//overflow-y: scroll;
			}

			.word-list {
				padding: 13px 8px;
			}

			.empty-content {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}
</style>
