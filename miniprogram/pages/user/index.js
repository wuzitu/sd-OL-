//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    loading: false
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              app.globalData.openid = wx.getStorageSync("openid") || ""
              if (!app.globalData.openid) {
                return;
              }
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                logged: true
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function (e) {
    let _this = this;

    if (!this.logged && e.detail.userInfo) {
      _this.setData({
        loading: true
      })
      // 调用云函数
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          // console.log('[云函数] [login] user openid: ', res.result.openid)
          app.globalData.openid = res.result.openid
          wx.setStorage({
            key: 'openid',
            data: res.result.openid,
          })
          _this.setData({
            logged: true,
            avatarUrl: e.detail.userInfo.avatarUrl,
            userInfo: e.detail.userInfo
          })
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
          wx.navigateTo({
            url: '../deployFunctions/deployFunctions',
          })
        },
        complete: res => {
          _this.setData({
            loading: true
          })
        }
      })


    }
  },

  // 捐助
  donate: () => {
    wx.previewImage({
      urls: ['http://cdn.sdplayer.club/zanshang.jpg'],
    });
  }

})