//app.js
import moment from '/lib/moment'
const initApp = (_this) => {
  const time = wx.getStorageSync('date');
  if (time && moment().isAfter(moment(time), 'day')) {
    _this.globalData.date = moment()
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
    _this.globalData.DBcount = tmp.data
  }
  // 设置时间
  if (!time) {
    _this.globalData.date = moment()
    wx.setStorage({
      key: 'date',
      data: _this.globalData.date
    })
  }
}
App({
  onLaunch: function() {
    let _this = this
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: 'online-07f32f',
      })
    }
    // 定义全局变量
    this.globalData = {
      DBcount: {
        ReadCount: 0,
        WriteCount: 0
      }
    }

    // 读取本地配置
    wx.getStorage({
      key: 'DBcount',
      success(res) {
        _this.globalData.DBcount = res.data
        initApp(_this)
      }
    })
  }
})