// pages/place_order/place_order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkbox_list:[{'name':'快车',"value":'快车'},
    {'name':'专车',"value":'专车'},
    {'name':'顺风车',"value":'顺风车'},
    {'name':'代驾',"value":'代驾'},
    {'name':'货车',"value":'货车'}]

  },
  // 随机字符串
  randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        var pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
},
  formtap(e){
    var date= new  Date;
    var Y = date.getFullYear();  
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);  
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();  
    //时  
    var h = date.getHours();  
    //分  
    var m = date.getMinutes();  
    
    console.log("当前时间：" +Y+M+D+" "+h+":"+m); 
    var timestamp = Y+M+D+" "+h+":"+m
    console.log(e.detail.value)
    var  order_ID=this.randomWord(false, 16)
    if((e.detail.value.name!='') & (e.detail.value.checked!='') & (e.detail.value.radio!='')& (e.detail.value.foundlocation!='')& (e.detail.value.founddetail!='')& (e.detail.value.foundphone!='')){
      wx.showLoading({
        title: '下单中...',
        mask:true
      })
    wx.cloud.callFunction({
      name:'toplan',
      
      data:{
        name:e.detail.value.name,
        checked:e.detail.value.checked,
        radio:e.detail.value.radio,
        foundlocation:e.detail.value.foundlocation,
        founddetail:e.detail.value.founddetail,
        foundphone:e.detail.value.foundphone,
        order_ID:order_ID,
       

      },
      success(res){
        console.log(res)
      },
      complete: res => {
        console.log('callFunction test result: ', res)
       }
    }) 
    setTimeout(function () {
      wx.hideLoading()
     
      wx.navigateBack({
        delta: 1,
      })
    }, 2000)
  
 
  }
  else{
   wx.showToast({
     title: '请输入相关信息，不能为空',
     icon:'none'
   }) 
  }
  },
  handel_checkbox(e){
    console.log(e)
    var lit=e.detail.value

  },
   // 出发地定位
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
       
        that.setData({
          add:false,
          foundlocation: address
        })
     },
      fail: function (e) {
        console.log(e)
      },
    })
    
  },
// 目的地定位
  handelmap0(e) {
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
       
        that.setData({
          add:false,
          founddetail: address
        })
     },
      fail: function (e) {
        console.log(e)
      },
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let pages = getCurrentPages();
    // 2 数组中 索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1];
    console.log(currentPage)
    // 3 获取url上的type参数
    const {
      type
    } = currentPage.options;
    console.log(currentPage.options.name)

    wx.setNavigationBarTitle({
      title: currentPage.options.name
    })
    this.setData({
      foundlocation:options.address,
      founddetail:options.address0,

    })

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