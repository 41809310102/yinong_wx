const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  try {
    return await db.collection('news').doc(event.id).update({
      data:{
        name:event.name,
        fenlei:event.fenlei,
        actorname:event.actorname,
        detail:event.detail,
        isRecommend:event.isRecommend,
        img_src:event.fileID,
        time:event.time
      }
    })
  } catch (e) {
    console.log(e)
  }
}