export default {
	showTotast(message) {
		uni.showToast({
			title: message,
			icon: 'none',
			duration: 2000
		});
	},

	 showPage(Vuepath, path, name, params){
		return new Promise((resolve) => {
			const onDidDismiss = function(value) {
				resolve(value);
			}
			params["pageOnDisDismiss"] = onDidDismiss;
			Router.push({
				path: path,
				name: name,
				params: params
			});
		})
		// {path:'/incomeedit',name:'incomeedit',params:{item:row,addItem:this.addItem}}
		// return new Promise<any>(resolve => {
		//     let onDidDismiss = function (value) {
		//         resolve(value);
		//     };
		//     params["pageOnDidDismiss"] = onDidDismiss;
		//     this.app.getRootNav().push(page, params, { animate: false, id: page });
		// });

		// this.$router.push({path:opt.path,name:opt.name,params:opt.params});
	},
	
	navigateTo(path,params){
		return new Promise((resolve)=>{
			uni.navigateTo({
			  url: path,
			  events: {
			    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
			    acceptDataFromOpenedPage: function(data) {
			      resolve(data);
				  console.log(data);
			    },
			    someEvent: function(data) {
			      console.log(data)
			    }
			  },
			  success: function(res) {
			    // 通过eventChannel向被打开页面传送数据
			    res.eventChannel.emit('acceptDataFromOpenerPage', { data: params})
			  }
			})
		});
	},
	
	navigateBack(eventChannel,data){
		eventChannel.emit('acceptDataFromOpenedPage', {
			data: data
		});
	},
	
	eventChannelOn(eventChannel){
		return new Promise((resolve)=>{
			eventChannel.on('acceptDataFromOpenerPage', function(res) {
				resolve(res);
			});
		});
	},
	
}
