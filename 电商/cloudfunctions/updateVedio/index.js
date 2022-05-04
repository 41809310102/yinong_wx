const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  try {
    return await db.collection('video1').doc(event.id).update({
      data:{
        name:event.name,
        fenlei:event.fenlei,
        actorname:event.actorname,
        isRecommend:event.isRecommend,
        video_src:event.img_src,
        time:event.time
      }
    })
  } catch (e) {
    console.log(e)
  }
}