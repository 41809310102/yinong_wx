
const db = wx.cloud.database()
var app = getApp();
Page({
  data: {
    banner1: [],
    register: [],
    new_product: [],
    fuping_product:[],
    nongji_product:[],
    url: [],
    curIndex: 0,
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
    openid:'',
    local:'',
  },
    
   // 定位
   handelmap(e) {
    console.log(e)
    var that = this;
    var address =null
    var name =null
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        address = res.address;
        name = res.name;
        console.log(name + '   ' + address)
        wx.cloud.callFunction({
          name:'Map',
          data:{       
            address:address,
            openid:that.data.openid,
          },success(res){
                wx.showToast({
                  title: '定位成功！',
                })
                that.getmap(),//刷新获取的商品
                that.getnew_goods()
              }
            })
        that.setData({
          add:false,
          foundlocation: name,
        })
     },
      fail: function (e) {
        console.log(e)
      },
    })
  },
  //获得最近新品
  search:function(){
    wx.navigateTo({
      url: '../search/search',
    })

  },

  getmap(){
    var that = this;
    const db = wx.cloud.database();
    const _ = db.command;
    db.collection('register').where({
      _openid:app.globalData.openid,
    }).limit(1).get().then(res=>{
      this.setData({
        register:res.data,
        local:res.data[0].address,
      })
 
  })
  },
  getnew_goods() {
    var that = this;
    const db = wx.cloud.database();
    const _=db.command;
    var local=that.data.local;
    var address = local.substring(0,8);
    console.log("本地新品"+address)
    db.collection("cosmetic_ms").where({
      xiajia:false,
      kucun:_.gte(1),
      Candi: new db.RegExp({
        regexp: address,
        options: 'i',
      })
    }).get({
      success(res) {
        that.setData({
          new_product: res.data
        })
        console.log(res)
      },
      fail(res) {
        console.log(res.data)
      }
    })
  },
  /* 扶贫产品展示*/ 
  fuping_goods() {
    var that = this;
    const db = wx.cloud.database();
    const _=db.command;
    db.collection("cosmetic_ms").where({
      xiajia:false,
      kucun:_.gte(1),
      name: new db.RegExp({
        regexp: "扶贫",
        options: 'i',
      })
    }).get({
      success(res) {
        that.setData({
          fuping_product: res.data
        })
        console.log(res)
      },
      fail(res) {
        console.log(res.data)
      }
    })
  },
/* 附近农机展示*/ 
  nongji_goods() {
    var that = this;
    const db = wx.cloud.database();
    const _=db.command;
    var local=that.data.local;

    var address = local.substring(0,9);
    console.log("附近农机"+address)
    db.collection("cosmetic_ms").where({
      xiajia:false,
   
      type: new db.RegExp({
        regexp: "农业机器",
        options: 'i',
      }),

      Candi: new db.RegExp({
        regexp: address ,
        options: 'i',
      })
      
    }).get({
      success(res) {
        that.setData({
          nongji_product: res.data
        })
        console.log(res)
      },
      fail(res) {
        console.log(res.data)
      }
    })
  },
  bindTap(e) {
    var that = this;
    const index = parseInt(e.currentTarget.dataset.index);
    if (index == 1) {
  
    } else if (index == 2) {
     
    } else if (index == 0) {
      this.getnew_goods();
    }
    this.setData({
      curIndex: index
    })
  },
  
  onLoad: function(options) {
    var that = this;
    const db = wx.cloud.database()
    this.setData({
      openid:app.globalData.openid,
    })
    console.log(app._time());
    this.getnew_goods();
    this.fuping_goods();
    this.nongji_goods();
    db.collection('banner1').get().then(res=>{
      this.setData({
        banner1:res.data
      })
      db.collection('register').where({
        _openid:app.globalData.openid,
      }).limit(1).get().then(res=>{
        this.setData({
          register:res.data,
          local:res.data[0].address,
        })
   
    })
      
  })



  },
  cart: function(e) {
    var current_goods = e.currentTarget.dataset.url;
    var info = JSON.stringify(current_goods);
    wx.navigateTo({
      url: '../details/details?current_goods=' + info,
    })
  },
  details_one(e) {
    const url = e.currentTarget.dataset.item;
    const db = wx.cloud.database();
    console.log(url);
    db.collection("cosmetic_ms").where({
      url: url
    }).get({
      success(res) {
        console.log(res.data);
        var current_goods = res.data[0];
        var info = JSON.stringify(current_goods);
        console.log(info)
        wx.navigateTo({
          url: 'details/details?current_goods=' + info,
        })
      }
    })
  },
  onPullDownRefresh:function(){
    this.getnew_goods();
    this.fuping_goods();
    this.nongji_goods();
  }
})