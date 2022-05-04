const util = require('../util.js');
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    actorname:'',
    classify:'',
    detail:'',
    stock:'',
    isRecommend:'',
    fileID:'',
    recommendObject:[{name:'是',checked:false},
                     {name:'否',checked:false}],
    classifyObject:[{name:'农业政策',checked:false},
                    {name:'种植攻略',checked:false},
                    {name:'批发发布',checked:false},
                    {name:'预约信息',checked:false},
                    {name:'视频发布',checked:false},
                    {name:'我的吐槽',checked:false},
                ],
    now:'',
    array:[]
  },

  _time(i) {
    var date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute +':'+ second;
    var time1= hour + ""+minute +""+ second;
    if(i==1){
      return time
    }
    else{
      return time1
    }
  },
  getName(res){
    this.setData({
      name:res.detail.value
    })
  },
  getClassify(res){
    this.setData({
      classify:res.detail.value
    })
  },
  getactorname(res){
    this.setData({
      actorname:res.detail.value
    })
  },
  getDetail(res){
    this.setData({
      detail:res.detail.value
    })
  },
  getStock(res){
    this.setData({
      stock:res.detail.value
    })
  },
  isRecommend(res){
    this.setData({
      isRecommend:res.detail.value
    })
  },
  getPicture(res){
    var that = this;
    var num = Math.floor(Math.random()*10000);
    var time = Date.parse(new Date());
    wx.chooseImage({
      count: 1,
      success(res){
        console.log(res);
        wx.showToast({
          title: '图片上传成功',
        })
        wx.cloud.uploadFile({
          cloudPath:'shop/' + time + '-' + num,
          filePath:res.tempFilePaths[0],
          success(res){
            console.log("上传成功",res);
            that.setData({
              fileID:res.fileID
            })
            wx.hideLoading({
              success: (res) => {},
            })
          },
          fail(res){
            console.log("上传失败",res);
          }
        })
      }
    })
  },
  submit(res){
    var time = this._time(2);//全局变量获得时间戳
    var time1=this._time(1);
    var that = this;
    console.log(that.data.name,that.data.classify,that.data.actorname,that.data.detail,that.data.fileID);
    if(that.data.name == '' || that.data.classify == '' || that.data.actorname == '' || that.data.detail == '' ){
      wx.showToast({
        title: '请完整填写信息',
      })
    }else{
      if(that.data.now == '修改'){
        wx.cloud.callFunction({
          cloudPath:time,
          name:'updateProduct',
          data:{
            id:that.data.array._id,
            name:that.data.name,
            fenlei:that.data.classify,
            actorname:that.data.actorname,
            detail:that.data.detail,
            time:time1,
            isRecommend:that.data.isRecommend,
            fileID:that.data.fileID
          },
          success(res){
            console.log("信息修改成功");
            wx.redirectTo({
              url: '../../component/talk/talk',
              success(res){
                wx.showToast({
                  title: '修改成功',
                  duration:3000
                })
              }
            })
          },
          fail(res){
            console.log("信息修改失败",res);
          }
        })
      }else{
        db.collection('news').add({
          data:{
            detail:that.data.detail,
            fenlei:that.data.classify,
            img_src:that.data.fileID,
            name:that.data.name,
            time:time1,
            actorname:that.data.actorname,
            pinglun:[],
            isRecommend:that.data.isRecommend
          },
          success(res){
            console.log("发布成功");
            wx.showToast({
              title: '恭喜你，发布成功！',
              duration:3000,
              success(res){
                wx.redirectTo({
                  url: '../../component/talk/talk',
                })
              }
            })
          }
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var classifyObject = that.data.classifyObject;
    var recommendObject = that.data.recommendObject;
    console.log(options.data);
    if(options.data == undefined){

    }else{
      var array = JSON.parse(options.data);
      console.log(array);
      for(var i = 0; i < classifyObject.length; i++){
        if(classifyObject[i].name == array.fenlei){
          classifyObject[i].checked = true;
        }
      }
      for(var j = 0; j < recommendObject.length; j++){
        if(recommendObject[j].name == array.isRecommend){
          recommendObject[j].checked = true;
        }
      }
      that.setData({
        classifyObject:classifyObject,
        recommendObject:recommendObject,
        classify:array.fenlei,
        isRecommend:array.isRecommend,
        now:'修改',
        name:array.name,
        actorname:array.actorname,
        detail:array.detail,
        fileID:array.img_src,
        array:array
      })
    }
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