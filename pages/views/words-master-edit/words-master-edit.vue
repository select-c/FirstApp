<template>
	<view class="words-master-edit">
		<!-- 		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-item">
				<view class="title">编号:</view>
				<input class="uni-input" name="wordNo" placeholder="请输入编号" />
			</view>
			<view class="uni-item">
				<view class="title">单词:</view>
				<input class="uni-input" name="wordName" placeholder="请输入单词" />
			</view>
			<view class="uni-btn-v">
				<button class="uni-submit" form-type="submit">提交</button>
				<button class="uni-close">关闭</button>				
			</view>
		</form> -->


		<view class="w-header">单词编辑</view>
		<view>
			<uni-forms ref="form" :modelValue="formData">
				<uni-forms-item label="类别" required>
					<uni-data-select v-model="formData.ItemTypeID" :localdata="types"></uni-data-select>
				</uni-forms-item>
				<uni-forms-item label="编号" required>
					<uni-easyinput type="text" v-model="formData.WordNo" placeholder="请输入编号" />
				</uni-forms-item>
				<uni-forms-item label="单词" required>
					<uni-easyinput type="text" v-model="formData.WordName" placeholder="请输入单词" />
				</uni-forms-item>
				<uni-forms-item label="描述">
					<uni-easyinput type="textarea" v-model="formData.Remark" placeholder="请输入描述" />
				</uni-forms-item>
			</uni-forms>
			<button @click="submit">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 表单数据
				formData: {
					ID: '',
					ItemTypeID: '',
					WordNo: '',
					WordName: '',
					Remark: ''
				},
				types: [],
				eventChannel:null,
			}
		},
		onLoad(options) {
			// #ifdef APP-NVUE
			 this.eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
			// #endif
			// #ifndef APP-NVUE
			this.eventChannel = this.getOpenerEventChannel();
			// #endif

			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			this.$utils.eventChannelOn(this.eventChannel).then(res=>{
				if (res.data) {
					const {
						ID,
						WordNo,
						WordName,
						Remark
					} = res.data;
					this.formData.ID = ID?ID:"";
					this.formData.WordNo = WordNo;
					this.formData.WordName = WordName;
					this.formData.Remark = Remark;
				}
			})
			//加载类别
			this.getTypeData();
		},	
		methods: {
			//加载类别
			getTypeData() {
				this.$service.callBo("WordBO", "GetItemType").then(res => {
					if (res)
						res.forEach(o => {
							this.types.push({
								value: o.ID,
								text: o.TypeName
							});
						});
				})
			},
			submit(e) {
				this.$refs.form.validate().then(res => {
					console.log('表单数据信息：', res);
					let params={
						updateModel: this.formData.ID ? 1 : 0,
						ID: this.formData.ID,
						itemTypeID: this.formData.ItemTypeID,
						wordNo: this.formData.WordNo,
						wordName: this.formData.WordName,
						remark: this.formData.Remark?this.formData.Remark:""
					};
					this.$service.callBo("WordBO", "Post", params).then(res => {
						if (res) {
							uni.showToast({
								title: "提交成功！"
							});
							this.$utils.navigateBack(this.eventChannel,this.formData);	
							uni.navigateBack();						
						}
					});
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			}
		}
	}
</script>

<style lang="scss">
	.words-master-edit {
		padding: 13px 20px;
	}

	.w-header {
		text-align: center;
		padding: 13px 0;
	}

	.uni-item {
		display: flex;
		margin: 50rpx 30rpx;
		height: 80rpx;
		//box-shadow: 2px 3px 2px gray;
		border: 1px solid #AAA;

		.title {
			flex-basis: 20%;
			text-align: center;
			line-height: 80rpx;
			height: 80rpx;
		}

		.uni-input {
			flex: 1;
			height: 80rpx;
		}
	}

	.uni-submit,
	.uni-close {
		margin: 30rpx;
		background-color: $ant-color-geekblue-3;
	}
</style>
