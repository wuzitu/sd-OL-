import moment from '../lib/moment'

const userDBconfig = {
  ReadCount: 3,
  WriteCount: 3
}
let app = getApp();

const mkCount = (opt) => {
  switch (opt) {
    case 'read':
      try {
        app.globalData.DBcount.ReadCount++
          wx.setStorage({
            key: 'DBcount',
            data: {
              ReadCount: app.globalData.DBcount.ReadCount || 0,
              WriteCount: app.globalData.DBcount.WriteCount || 0
            }
          })
      } catch (e) {
        console.log(e)
      }
      break;
    case 'write':
      try {
        app.globalData.DBcount.WriteCount++
          wx.setStorage({
            key: 'DBcount',
            data: {
              ReadCount: app.globalData.DBcount.ReadCount || 0,
              WriteCount: app.globalData.DBcount.WriteCount || 0
            }
          })
      } catch (e) {
        console.log(e)
      }
      break;
  }

  return true;
}

const checkCount = (opt) => {
  if (moment().isAfter(moment(app.globalData.date), 'minute')) {
    wx.setStorage({
      key: 'date',
      data: _this.globalData.date
    })
    let tmp = {
      key: 'DBcount',
      data: {
        ReadCount: 0,
        WriteCount: 0
      }
    }
    wx.setStorage(tmp)
    app.globalData.DBcount = tmp.data
    return true
  }
  if (app.globalData.DBcount.ReadCount >= userDBconfig.ReadCount || app.globalData.DBcount.WriteCount >= userDBconfig.WriteCount) {
    return false;
  }

  return true;
}

module.exports = {
  mkCount: mkCount,
  checkCount: checkCount
}