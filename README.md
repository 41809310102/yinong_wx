# yinong_wx
这是一个农贸电商平台的云开发项目
1.项目配置：
在导入项目的时候选择自己的openid,进入项目后修改app.js中的云开发环境配置；
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: "hujunjie-59uot",
         database: "hujunjie-59uot",//都修改为你自己的环境配置
        storage:"hujunjie-59uot",
        functions:"hujunjie-59uot"
      })
      this.openid();
    }
  },
  
  环境配置的id怎么获取？
  点击工具栏中的云开发->设置
  ![Q_EV~XD8 )`DUBZ9{9SHMNT](https://user-images.githubusercontent.com/73837592/166656097-fd172c69-a423-4355-912f-703ffb3e866f.png)
2.云数据库创建：
这里除了管理员是手动添加数据库数据，其余都是只需要创建一个表名
数据库由于时间太久，已经删除，这里教大家怎么获取数据库
首先进入每一个page页面的js代码中
例如：
![@~ A%DB X$H%K0Z~_SYEI S](https://user-images.githubusercontent.com/73837592/166658552-a00468b1-82c0-497e-bc2d-4528177fe00f.png)

![%(NBHT JXHZG_JVB`6QF`BT](https://user-images.githubusercontent.com/73837592/166658441-ee8a078d-87b3-450c-8eae-55e151d1942f.png)

有任何问题可联系wx:hjj1889136438
