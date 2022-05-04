// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
const _=db.command;
// 云函数入口函数
exports.main = async (event, context) => {
if(event.a==1){
  return await db.collection("shopping_shouchan").where({
    _id: _.in(event.delete_shouchan)
  }).remove()
}
if(event.a==2){
  await db.collection("shopping_shouchan").where({
    _id: _.in(event.compelete_orders)
  }).remove()
}
}