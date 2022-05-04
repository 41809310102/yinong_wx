// page/component/show1/show1.js
const db = wx.cloud.database()
var app = getApp(
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video:[],
  _index: ""

  },
  
  getnew_goods() {
    var that = this;
    const db = wx.cloud.database();
    const _=db.command;
     db.collection("video1").orderBy('reader', 'desc').get({
      success(res) {
    
        that.setData({
          video: res.data
        })

        console.log(res)
      },
      fail(res) {
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  videoPlay: function(e) {
    var _index = e.currentTarget.dataset.id
    this.setData({
      _index: _index
    })
    //停止正在播放的视频
    var videoContextPrev = wx.createVideoContext(_index + "")
    videoContextPrev.stop();

    setTimeout(function() {
      //将点击视频进行播放
      var videoContext = wx.createVideoContext(_index + "")
      videoContext.play();
    }, 500)

  },

   // 跳转视频详情页
   goToProduct(res){
    var that = this;
    const db = wx.cloud.database();
    const _=db.command;
    var id = res.currentTarget.dataset.id;
    db.collection('video1').where({
      _id:id,
    }).update({
      data:{
          reader:_.inc(1),
          },
          success(res) {
            wx.navigateTo({
              url: '../vediodes/talkdes?id='+id,
            })
          }
    })
  },


  onLoad: function(options) {
    var that = this;
    console.log(app._time());
    this.getnew_goods();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})
)