//app.js
import moment from '/lib/moment'

const ald = require('./utils/ald-stat.js')
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
        // env: 'sdplayer-6bad5c',
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

    wx.getStorage({
      key: 'openid',
      success(res) {
        _this.globalData.openid = res.data || ''
      }
    })
    // 获取用户登录情况
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              wx.getStorage({
                key: 'userInfo',
                success(res) {
                  _this.globalData.userInfo = res.data || {}
                }
              })
            },
            fail: res => {
              onFailed(_this)
            }
          })
        }
        // 未授权，需要登录！
        else {
          onFailed(_this)
        }
      },
      fail: res => {
        onFailed(_this)
      }
    })
    // 获取广告显示情况
    // wx.getStorage({
    //   key: 'ad_detail_banner',
    //   success: function(res) {
    //     _this.globalData.ad_detail_banner = res.data || '2019-01-01'
    //   },
    // })
  }
})



function onFailed(_this) {
  wx.hideLoading()
  _this.globalData.userInfo = {}
  _this.globalData.openid = ""
}