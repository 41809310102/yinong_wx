
var app = getApp();
Page({
  data: {
    shouchan: [], // 购物车列表
    totalPrice: 0, // 总价，初始为0
    selectAllStatus: false, // 全选状态，默认全选
    obj: {
      name: "hello"
    },
    crats_value: [],
    goods_norms: [], //选择规格
    showseleted_norms: false,
    windosHeight: '',
    manage: false,
    seleted_norms:'',
    xiugaiseleted_norms: '',
    openid:'',
    sale:'',
    shouchan_null:false,
  },
  //获取选择的规格
  seleted_norms: function (e) {
    this.setData({
      xiugaiseleted_norms: e.currentTarget.dataset.seleted_norms,
    })
  },
  //管理购物车
  cart_mg() {
    var manage = this.data.manage;
    var shouchan = this.data.shouchan;
    for (var i = 0; i < shouchan.length; i++) { //每点击一次把购物车中所有seleted变为false
      shouchan[i].selected = false;
    }
    manage = !manage;
    this.setData({
      manage: manage,
      shouchan: shouchan,
      totalPrice: 0,
      index:'',
    })
  },
  //获得传过来的的url路径里面数据库记录
   getgoods_norms() {
     var current_goods = this.data.current_goods;
     var that = this;
     const db = wx.cloud.database();
     db.collection("cosmetic_norms").where({
      url: current_goods.url
     }).get({
       success(res) {
         that.setData({
          goods_norms: res.data
         })
      },
        complete(res) {
         console.log(res.data)
      }
     })
  },
  //获得加入购物车里面的缓存
   getshouchan() {
     var image_url;
     var totalNum;
     var that = this;
     var crats_value = that.data.crats_value
     var flag = false; //判断购物车里面是否已经存在该物品
     var shouchan = that.data.shouchan;
   image_url = crats_value.image_url
     totalNum = crats_value.total
    console.log(res.data);
     for (var i = 0; i < shouchan.length; i++) {
       if (image_url == shouchan[i].image) {
         shouchan[i].num += totalNum;
         flag = true;
      }
     }
     //把购物车里面没有的加入shouchan
   /*if (flag == false && crats_value.length != 0) {
      var crat = {
       id: image_url,
       title: '美白养颜组合',
        image: image_url,
     num: totalNum,
        price: 212,
       selected: false
      }
      shouchan = shouchan.concat(crat);
    }*/
     that.setData({
      shouchan: shouchan
    })
  wx.getStorage({
     key: 'shouchan',
    success: function (res) {

     },
   })
   console.log(image_url + totalNum);
  wx.clearStorage();
  },
  //显示“修改购物车商品的参数”
  xiugai_ms(e) {
    console.log(e.currentTarget.dataset.index)
    console.log(e.currentTarget.dataset.value)
    this.setData({
      showseleted_norms: true,
      seleted_norms:e.currentTarget.dataset.value,
      index: e.currentTarget.dataset.index//设置index 用addshouchan()来修改购物车里面的商品规格
    })
  },
  //修改完后点击完成
  addshouchan() {
    var shouchan=this.data.shouchan;
    var that=this;
    var index=this.data.index;
    shouchan[index].seleted_norms = this.data.xiugaiseleted_norms;
    const db=wx.cloud.database();
    db.collection("shopping_shouchan").doc(shouchan[index]._id).update({
      data:{
        seleted_norms: shouchan[index].seleted_norms
      },
      success(res){
        that.setData({
          showseleted_norms: false,
          shouchan: shouchan,
        })
      }
    }) 
  },
  cha() {
    this.setData({
      showseleted_norms: false,
    })
  },
  //数据库中获得购物车里面所有商品
  get_shouchan() {
    var that = this;
    var shouchan_url=[];//获得个人购物车里面所有的url作为条件获得sale
    var getsale=[];//获得折扣
    const db = wx.cloud.database();
    const _=db.command;
    db.collection("shopping_shouchan").where({
      login(){
        let page = this;
        wx.cloud.callFunction({
          name:'getOpenid',
          complete:res=>{
            console.log('openid--',res.result)
            var openid = res.result.openid
            page.setData({
              openid:openid
            })
          }
        })
      },
    }).get({
      success(res) {
        var shouchan = res.data
        if(res.data.length==0){
            that.setData({
              shouchan_null: true,
              shouchan: res.data,
            })
        }
        else{
          for (var i = 0; i < shouchan.length; i++) {
            shouchan_url = shouchan_url.concat(shouchan[i].url)
          }
          db.collection("cosmetic_ms").where({
            url: _.in(shouchan_url)
          }).get({
            success(res) {
              getsale = res.data;
              for (var i = 0; i < getsale.length; i++) {
                for (var j = 0; j < shouchan.length; j++) {
                  if (getsale[i].url == shouchan[j].url) {
                    shouchan[j].sale = getsale[i].sale//想shouchan字段添加sale，二维数组中的某一行末尾新增一个字段。做法直接命名并赋值。
                  }
                }
              }
              that.setData({
                shouchan: shouchan,
                shouchan_null:false
              })
            },

          })
        }
       
      }
    })
  },

  //购物车跳转到详情页面
  details:function(e){
    var current_goods = e.currentTarget.dataset.url;
    var info = JSON.stringify(current_goods);
    wx.navigateTo({
      url: '../details3/details3?current_goods=' + info,
    })
  },
  //获得每件商品的折扣渲染到购物车中的价格
  getsale() {
    const db = wx.cloud.database();
    var that = this;
    var shouchan = that.data.catrs;
    db.collection("cosmetic_ms").where({
      url: current_goods.url
    }).get({
      success(res) {
        that.setData({
          sale: res.data[0].sale
        })
      }
    })
  },
  onLoad: function(options) {
    this.setData({
      crats_value: app.globalData.crats_value,
      windosHeight: app.getWidth_height(),
      openid:app.globalData.openid
    })
    app.globalData.crats_value = "";
    //this.get_shouchan();
    //this.getgoods_norms();
    this.cha();
  },
  onShow() {
    var that = this;
    // var deleteCart = app.globalData.selected_crats1;
    // console.log(deleteCart.length);
    // var shouchan = this.data.shouchan;
    // for (var i = 0; i < shouchan.length; i++) {
    //   for (var j = 0; j < deleteCart.length; j++) {
    //     if (deleteCart[j].image == shouchan[i].image) shouchan.splice(i--, 1);
    //   }
    // }
    //console.log(app.globalData.crats_value);
    
    this.setData({
      crats_value: app.globalData.crats_value,
      windosHeight: app.getWidth_height(),
      selectAllStatus:false,
      shouchan_null:false,
    });
    //this.getshouchan()
    app.globalData.selected_crats1 = [];
    app.globalData.crats_value = "";
    this.getTotalPrice();
    this.get_shouchan();
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let shouchan = this.data.shouchan;
    var num = 0;
    const selected = shouchan[index].selected;
    shouchan[index].selected = !selected;
    for (var i = 0; i < shouchan.length; i++) {
      if (shouchan[i].selected) num++;
    }
    if (num == shouchan.length) {
      this.setData({
        selectAllStatus: true
      })
    } else {
      this.setData({
        selectAllStatus: false
      })
    }
    this.setData({
      shouchan: shouchan,
    });
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList() {
    //const index = e.currentTarget.dataset.index;
    let shouchan = this.data.shouchan;
    let num = 0;
    var that = this;
    let flag = false;
    var delete_shouchan = [];
    const db = wx.cloud.database();
    //console.log(shouchan[index]);
    for (var i = 0; i < shouchan.length; i++) {
      if (shouchan[i].selected) {
        num++;
        flag = true;
        delete_shouchan = delete_shouchan.concat(shouchan[i]._id);
      }
    }
    console.log(delete_shouchan)
    if (!flag) {
      wx.showToast({
        title: '请选择需要删除收藏信息',
        mask: true,
        icon: 'none'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '确认要删除这' + num + '个收藏吗?',
        success: function(res) {
          if (res.confirm) {
            wx.cloud.callFunction({
                name: 'delete_shouchan',
                data: {
                  a: 1,
                  delete_shouchan: delete_shouchan
                }
              })
              .then(console.log)
              .catch(console.error)
            for (var i = 0; i < shouchan.length; i++) {
              if (shouchan[i].selected) {
                shouchan.splice(i--, 1);
              }
            }
            if(shouchan.length==0){
              that.setData({shouchan_null:true})
            }
            that.setData({
              shouchan: shouchan,
              selectAllStatus:false
            });
          }
        }
      })
    }
      that.getTotalPrice();
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    if(this.data.shouchan.length==0){
      wx.showToast({
        title: '购物车是空的喔！',
        mask:true,
        icon:'none'
      })
    }
    else{
      selectAllStatus = !selectAllStatus;
      let shouchan = this.data.shouchan;
      for (let i = 0; i < shouchan.length; i++) {
        shouchan[i].selected = selectAllStatus;
      }
      this.setData({
        selectAllStatus: selectAllStatus,
        shouchan: shouchan
      });
      this.getTotalPrice();
    }
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let shouchan = this.data.shouchan;
    var that=this;
    let num = shouchan[index].total;
      const db = wx.cloud.database();
      db.collection("shopping_shouchan").doc(shouchan[index]._id).update({
        data: {
          total: num+1
        },
        success(res){
          shouchan[index].total = num+1;
          that.setData({
            shouchan: shouchan
          });
          that.getTotalPrice();
        }
      })  
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let shouchan = this.data.shouchan;
    var that=this;
    let num = shouchan[index].total;
    if (num -1<= 1) {
      return false;
    }
    const db = wx.cloud.database();
    db.collection("shopping_shouchan").doc(shouchan[index]._id).update({
      data: {
        total: num-1
      },
      success(res){
        shouchan[index].total = num - 1;
        that.setData({
          shouchan: shouchan
        });
        that.getTotalPrice();
      }
    })
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let shouchan = this.data.shouchan; // 获取购物车列表
    let total = 0;
    for (let i = 0; i < shouchan.length; i++) { // 循环列表得到每个数据
      if (shouchan[i].selected) { // 判断选中才会计算价格
        total += shouchan[i].total * shouchan[i].ago_price * shouchan[i].sale; // 所有价格加起来
      }
    }
    this.setData({ // 最后赋值到data中渲染到页面
      shouchan: shouchan,
      totalPrice: total.toFixed(2)
    });
  },
  accounts() {
    var shouchan = this.data.shouchan;
    var selected = [];
    var totalPrice = this.data.totalPrice;
    for (var i = 0; i < shouchan.length; i++) {
      if (shouchan[i].selected == true) {
        selected = selected.concat(shouchan[i]);
      }
    }
    app.globalData.selected_crats = selected;
    //console.log(selected);
    if (selected.length != 0) {
      wx.navigateTo({
        // url: '../orders/orders?totalPrice=' + totalPrice + '&selected=' + JSON.stringify(selected),
        url: '../orders/orders?totalPrice=' + totalPrice
      })
    } else {
      wx.showToast({
        title: '请选择需要购买的商品',
        mask: true,
        icon: 'none'
      })
    }
  }

})