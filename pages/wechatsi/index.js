var plugin = requirePlugin("WechatSI");
  /** 文字转语音 */
  function textToSpeech() {
    plugin.textToSpeech({
      lang: "zh_CN",
      tts: true,
      content: "一个常见的需求",
      success: function(res) {
        speech(res.filename)
      },
      fail: function(res) {
        console.log("fail tts", res)
      }
    })
  }
  function speech(url: string) {
    const audio = Taro.createInnerAudioContext()
    audio.autoplay = true
    audio.src = url
    audio.volume = 1
    audio.onPlay(() => {
      console.log('开始播放')
    })
  }