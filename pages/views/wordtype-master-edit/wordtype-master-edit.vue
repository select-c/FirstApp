<template>
	<view class="wordtype-master-edit">
		<view class="w-header">类别编辑</view>
		<view>
			<uni-forms ref="form" :modelValue="formData">				
				<uni-forms-item label="编号" required>
					<uni-easyinput type="text" v-model="formData.TypeNo" placeholder="请输入编号" />
				</uni-forms-item>
				<uni-forms-item label="名称" required>
					<uni-easyinput type="text" v-model="formData.TypeName" placeholder="请输入名称" />
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
					TypeNo: '',
					TypeName: '',
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
						TypeNo,
						TypeName,
						Remark
					} = res.data;
					this.formData.ID = ID?ID:"";
					this.formData.TypeNo = TypeNo;
					this.formData.TypeName = TypeName;
					this.formData.Remark = Remark;
				}
			})
		},
		methods: {
			submit(e) {
				this.$refs.form.validate().then(res => {
					console.log('表单数据信息：', res);
					let params={
						updateModel: this.formData.ID ? 1 : 0,
						ID: this.formData.ID,						
						typeNo: this.formData.TypeNo,
						typeName: this.formData.TypeName,
						remark: this.formData.Remark?this.formData.Remark:""
					};
					this.$service.callBo("WordTypeBO", "Post", params).then(res => {
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
	.wordtype-master-edit {
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
