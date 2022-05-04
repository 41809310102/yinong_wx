
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
      url: '../search/search',
    })

  },

  getnew_goods() {
    var that = this;
    const db = wx.cloud.database();
    const _=db.command;
     db.collection("news").orderBy('reader', 'desc').where({
       fenlei :"我的吐槽",
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
   // 跳转商品详情页
   goToProduct(res){
    var that = this;
    const db = wx.cloud.database();
    const _=db.command;
    var id = res.currentTarget.dataset.id;
    db.collection('news').where({
      _id:id,
    }).update({
      data:{
          reader:_.inc(1),
          },
          success(res) {
            wx.navigateTo({
              url: '../talkdes/talkdes?id='+id,
            })
          }
    })
  },
  
  onPullDownRefresh:function(){
    this.getnew_goods();
  }
})