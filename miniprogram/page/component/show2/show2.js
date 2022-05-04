// page/component/show2/show2.js
const db = wx.cloud.database()
var app = getApp(
Page({

  /**
   * 页面的初始数据
   */
  data: {
    des:'7月2日，国新办召开国务院政策例行吹风会，介绍深入推进“互联网+农业”促进农村一二三产业融合发展的有关情况。农业农村部副部长屈冬玉、农业农村部市场与经济信息司司长唐珂、农产品加工局局长宗锦耀出席会议，并回答记者提问.\n屈冬玉介绍，下一步，农业农村部将推进“互联网+”农产品出村工程，深入实施信息进村入户工程，组织全国农民手机应用技能培训，继续办好“双新双创”博览会，推动大众创业、万众创新在农村向深度发展，扩大农业物联网区域试验规模、范围和内容，建设重要农产品全产业链大数据，做好农业信息监测预警工作，促进农村一二三产业融合发展。'
  },
  copy(e) {
    wx.setClipboardData({
          data: e.currentTarget.dataset.copy,
          success: res => {
                wx.showToast({
                      title: '复制' + e.currentTarget.dataset.name + '成功',
                      icon: 'success',
                      duration: 1000,
                })
          }
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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