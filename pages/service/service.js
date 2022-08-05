import {server,servicePath} from './baseUrl'
let failTimes=0
 
export default{
	callBo(boName, methodName, params){
		   
		   const request = (method, data) => {
		       return new Promise((resolve, reject) => {
		           let url = "";
		           let path = "/" + method;
		           // let q = query || "";
		           // if (q) {
		           //     path += "?" + q;
		           // }
		           let header = {
		               //'Access-Control-Allow-Origin': '*',
		               'content-type': 'application/x-www-form-urlencoded',
		           }     
		   		url = server + servicePath + path;
		           let that = this;
				   console.log(url);
				   uni.showLoading();
		           wx.request({
		               url: url,
		               method: "POST",
		               data: data,
		               header: header,
		               success(res) {
		                   //that.failTimes = 0;
		                   uni.hideLoading();			
		                   let r = res.data;
		                   if (r.ErrCode == 0) {
		                       if (typeof (r.Data) == "string") {
		                           if (r.Data && (r.Data[0] == "[" || r.Data[0] == "{"))
		                               resolve(JSON.parse(r.Data));
		                           else
		                               resolve(r.Data);
		                       }
		                       else
		                           resolve(r.Data);
		   
		                   } else {
		                       //其他异常
		                       uni.showToast({
		                           title: "请求数据异常:" + res.data.ErrMsg,
		                           icon: 'none'
		                       })
		                       reject({ ErrCode: r.ErrCode, ErrMsg: r.ErrMsg });
		                   }
		               },
		               fail(err) {
		                   //that.failTimes++;
		                   //2次连续失败，重置isCheckedProxy
		                   // if (that.failTimes > 2) {
		                   //     //that.isCheckedProxy = false;
		                   //     //that.failTimes = 0;
		                   // }
		                   uni.hideLoading()
		                   //请求失败
		                   uni.showToast({
		                      title: '无法连接到服务器',
		                      icon: 'none'
		                   })
		                   reject(err);
		               }
		           })
		   
		       })
		   }
		   
		   const  getCallBoParamStr = (boName, methodName, params)  => {
		       let nameValueList = [];
		       if (params) {
		           let arr = [];
		           if (Array.isArray(params))
		               arr = params;
		           else
		               arr.push(params);
		           arr.forEach(item => {
		               Object.keys(item).forEach(name => {
		                   nameValueList.push({ Name: name, Value: JSON.stringify(item[name]) });
		               })
		           })
		       }
		       var p = {
		           BoName: boName, MethodName: methodName, ParamList: nameValueList
		       };
			   console.log(JSON.stringify(p));
		       return JSON.stringify(p);
		   }
		   
	     return new Promise((resolve, reject) => {
	       request("CallBo", getCallBoParamStr(boName, methodName, params)).then((res) => {
	           resolve(res);
	       }, (err) => {
	           reject(err);
	       });
	     });			
	 }
	
}

// export default {
// 	callBo
// }