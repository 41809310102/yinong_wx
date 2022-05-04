var app = getApp();
let timeId = null;
Page({
  data: {
    xiangguantuijie: [],
    gongluehis: [],
    hot: ['杂交水稻那个好', '水稻怎么育苗成活概率高', '农药'],
    result: [],
    showKeywords: false,
    keywords: [],
    value: '',
    showResult: false,
    yes_result: true,
  },
  cancelSearch() {
    this.setData({
      showResult: false,
      showKeywords: false,
      value: ''
    })
  },
  cart: function(e) {
    wx.navigateTo({
      url: '../details3/details3?current_goods=' + JSON.stringify(e.currentTarget.dataset.url),
    })
    console.log(e.currentTarget.dataset + "1111")
  },
  enterEvent: function(e) {
    this.setData({ //每次搜索都把使yes_result为真，待搜素不到在变为假
      yes_result: true,
    })
    var all_result = app.globalData.new_product;
    this.bint_gongluehisyHandle(e.detail.value);
    var result = [];
    var that = this;
    const db = wx.cloud.database();
    var name = e.detail.value
    db.collection("cosmetic_gonglue").where({ //模糊搜索
      name: new db.RegExp({
        regexp: name,
        options: 'i',
      })
    }).get({
      success(res) {
        that.setData({
          result: res.data
        })
        if (res.data.length == 0) {
          that.setData({
            yes_result: false
          })
        }
      }
    })  
    that.setData({
      result: result,
      showResult: true,
      showKeywords: false,
      keywords: []
    })
  },
  searchInput(e) {
    var keywords = this.data.keywords;
    var product = app.globalData.new_product;
    for (var i = 0; i < product.length; i++) {
      if (e.detail.value == product[i].name) {
        keywords = keywords.concat(product[i]);

      }
    }
    this.setData({
      keywords: keywords,
      value: e.detail.value
    })
    //console.log(this.data.value+"1454545")
    if (!e.detail.value) {
      this.setData({
        showKeywords: false
      })
    } else {
      if (!this.data.showKeywords) {
        timeId && clearTimeout(timeId);
        timeId = setTimeout(() => {
          this.setData({
            showKeywords: true
          })
        }, 1000)
      }
    }
  },
  keywordHandle(e) {
    const text = e.target.dataset.text;
    this.setData({
      value: text,
      showKeywords: false,
      showResult: true,
      result: [],
      yes_result: true
    })
    var that = this;
    var keywords = this.data.keywords;
    const db = wx.cloud.database();
    db.collection("cosmetic_gonglue").where({ //模糊搜索
      name: new db.RegExp({
        regexp: text,
        options: 'i',
      })
    }).get({
      success(res) {
        console.log(res.data)
        that.setData({
          result: res.data
        })
        if (res.data.length == 0) {
          that.setData({
            yes_result: false
          })
        }
      }
    })
    this.bint_gongluehisyHandle(text);
  },
  bint_gongluehisyHandle(value) {
    let gongluehis = this.data.gongluehis;
    const idx = gongluehis.indexOf(value);
    if (idx === -1) {
      // 搜索记录只保留8个
      if (gongluehis.length > 2) {
        gongluehis.pop();
      }
    } else {
      gongluehis.splice(idx, 1);
    }
    gongluehis.unshift(value);
    wx.setStorageSync('gongluehis', JSON.stringify(gongluehis));
    this.setData({
      gongluehis
    });
  },
  historyHandle(e) {
    var that=this;
    that.setData({
      showResult: true,
      result: [],
      yes_result: true,
    })
    const text = e.target.dataset.text
    const db = wx.cloud.database();
    db.collection("cosmetic_gonglue").where({ //模糊搜索
      name: new db.RegExp({
        regexp: text,
        options: 'i',
      })
    }).get({
      success(res) {
        that.setData({
          result: res.data
        })
        if (res.data.length == 0) {
          that.setData({
            yes_result: false
          })
        }
      }
    })
  },
  gongluehisyHandle(e) {
    var that=this;
    that.setData({
      showResult: true,
      result: [],
      yes_result: true,
    })
    const text = e.target.dataset.text
    const db = wx.cloud.database();
    db.collection("cosmetic_gonglue").where({ //模糊搜索
      name: new db.RegExp({
        regexp: text,
        options: 'i',
      })
    }).get({
      success(res) {
        that.setData({
          result: res.data
        })
        if (res.data.length == 0) {
          that.setData({
            yes_result: false
          })
        }
      }
    })
  },
  onLoad() {
    var xiangguantuijie = app.globalData.new_product
    this.setData({
      xiangguantuijie: xiangguantuijie
    })
    const gongluehis = wx.getStorageSync('gongluehis');
    console.log(gongluehis.length);
    if (gongluehis) {
      this.setData({
        gongluehis: JSON.parse(gongluehis)
      })
    }
  },
  fabu() {
    wx.navigateTo({
      url: '../gongluexianq/gongluexianq',
    })
  },

})