const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    return await db.collection('news').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        description: 'learn cloud database',
        due: new Date('2018-09-01'),
        tags: [
          'cloud',
          'database'
        ],
        // 位置（113°E，23°N）
        location: new db.Geo.Point(113, 23),
        done: false
      }
    })
  } catch (e) {
    console.error(e)
  }
}