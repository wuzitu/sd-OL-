// 云函数入口文件
var request = require("request");
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'online-07f32f',
  // env: 'sdplayer-6bad5c',
  traceUser: true,
})
const db = cloud.database()
const _ = db.command
exports.main = async(event, context) => {
  let docID = event.docID || ''
  try {
    const wxContext = cloud.getWXContext()
    voteWebZan(wxContext.OPENID, docID)
    return await db.collection('comments').doc(docID).update({
      data: {
        zan: _.inc(1)
      }
    })
  } catch (e) {
    console.error(e)
  }
}

function voteWebZan(openid, docID) {


  var options = {
    method: 'POST',
    url: 'https://test.sdplayer.club:3002/getGundam/votezan',
    headers: {
      Accept: '*/*',
      'User-Agent': 'PostmanRuntime/7.15.2',
      'Content-Type': 'application/json'
    },
    body: {
      _id: docID,
      openid: openid
    },
    json: true
  };

  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });

}