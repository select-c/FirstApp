var plugin = null;
// #ifdef MP
plugin = requirePlugin("WechatSI");
// #endif


const audio = wx ? wx.createInnerAudioContext({
	useWebAudioImplement: true
}) : null;
audio.autoplay = true;
audio.playbackRate = 2.5;
audio.volume = 1;
audio.onPlay(() => {
	console.log('开始播放')
})

export default {
	/** 文字转语音 */
	textToSpeech(text) {
		//let that = this;
		if (plugin == null)
			return;
		plugin.textToSpeech({
			lang: "zh_CN",
			tts: true,
			content: text,
			success: function(res) {
				audio.src = res.filename;
			},
			fail: function(res) {
				console.log("fail tts", res)
			}
		})
	}
}
