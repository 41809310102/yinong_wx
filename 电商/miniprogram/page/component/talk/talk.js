
const db = wx.cloud.database()
var app = getApp();
Page({
  data: {
    news: [],
    new_product: [],
    url: [],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  },
  //获得最近新品
  search:function(){
    wx.navigateTo({
      url: '../component/search/search',
    })

  },

  getnew_goods() {
    var that = this;
    const db = wx.cloud.database();
    const _=db.command;
    db.collection("news").where({
      xiajia:false,
      kucun:_.gte(1),
    }).get({
      success(res) {
        // for (var i = 0; i < res.data.length; i++) {
        //   if (res.data[i]._id = 'XsdfnjsnbdffkjsdKXrE1sqadasi00tqug') {
        //     res.data.splice(i, 1);
        //     break;
        //   }
        // }
        that.setData({
          new_product: res.data
        })
        //XsdfnjsnbdffkjsdKXrE1sqadasi00tqug

        console.log(res)
      },
      fail(res) {
        console.log(res.data)
      }
    })
  },
  onLoad: function(options) {
    var that = this;
    console.log(app._time());
    this.getnew_goods();

    db.collection('news').get().then(res=>{
      this.setData({
        news:res.data
      })
  })

  },
  cart: function(e) {
    var current_goods = e.currentTarget.dataset.url;
    var info = JSON.stringify(current_goods);
    wx.navigateTo({
      url: '../details3/details3?current_goods=' + JSON.stringify(e.currentTarget.dataset.url),
    })
  },
  details_one(e) {
    const url = e.currentTarget.dataset.item;
    const db = wx.cloud.database();
    console.log(url);
    db.collection("news").where({
      url: url
    }).get({
      success(res) {
        console.log(res.data);
        var current_goods = res.data[0];
        var info = JSON.stringify(current_goods);
        console.log(info)
        wx.navigateTo({
          url: '../details3/details3?current_goods=' + JSON.stringify(e.currentTarget.dataset.url),
        })
      }
    })
  },
  onPullDownRefresh:function(){
    this.getnew_goods();
  }
})