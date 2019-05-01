// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'online-07f32f',
  traceUser: true,
})
const db = cloud.database()
const _ = db.command
exports.main = async(event, context) => {
  let docID = event.docID || ''
  try {
    return await db.collection('comments').doc(docID).update({
      data: {
        zan: _.inc(1)
      }
    })
  } catch (e) {
    console.error(e)
  }
}