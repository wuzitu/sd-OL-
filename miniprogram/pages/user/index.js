//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    diagNick: '',
    avatarIndex: 0,
    customAvatar: ['cloud://sdplayer-6bad5c.7364-sdplayer-6bad5c/my-image.jpg', 'cloud://sdplayer-6bad5c.7364-sdplayer-6bad5c/my-image.jpg', 'cloud://sdplayer-6bad5c.7364-sdplayer-6bad5c/my-image.jpg', 'cloud://sdplayer-6bad5c.7364-sdplayer-6bad5c/my-image.jpg', 'cloud://sdplayer-6bad5c.7364-sdplayer-6bad5c/my-image.jpg', 'cloud://sdplayer-6bad5c.7364-sdplayer-6bad5c/my-image.jpg', 'cloud://sdplayer-6bad5c.7364-sdplayer-6bad5c/my-image.jpg'],
    userInfo: {},
    logged: false,
    loading: false,
    popupShow: false,
    diagShow: true,
  },

  onLoad: function() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 页面加载时获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              wx.hideLoading()
              console.log(res)
              // 读取本机缓存的openid，userInfo
              app.globalData.openid = wx.getStorageSync("openid") || ""
              if (!app.globalData.openid) {
                return;
              }
              let localUserInfo = wx.getStorageSync("userInfo") || ""
              if (localUserInfo.nickName) {
                this.setData({
                  avatarUrl: localUserInfo.avatarUrl,
                  userInfo: localUserInfo,
                  logged: true
                })
              } else {
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  userInfo: res.userInfo,
                  logged: true
                })
              }
              // 初始化弹窗头像
              initDiag(this)
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
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
          wx.setStorage({
            key: 'userInfo',
            data: e.detail.userInfo,
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
    // 埋点统计查询次数
    app.aldstat.sendEvent('点击捐赠按钮', {
      "用户ID": app.globalData.openid || '未登录',
    })
  },

  switchpopup: function(e) {
    // let tmp = ""
    // if (e.currentTarget.dataset) {
    let tmp = e.currentTarget.dataset.type || ""
    // }
    this.setData({
      popupShow: !this.data.popupShow,
      popuptype: tmp
    })
  },
  onSelectAvatar: function(e) {
    let index = e.currentTarget.dataset.index;
    // console.log('每个index',index)
    this.setData({
      avatarIndex: index
    })
  },
  nickChange: function(e) {
    this.setData({
      diagNick: e.detail
    })
  },
  onChangeInfo: function(e) {
    // 设置名称和头像，存入全局变量，存入本机缓存。
    let _this = this
    let userInfo = _this.data.userInfo
    userInfo.avatarUrl = _this.data.customAvatar[_this.data.avatarIndex] || _this.data.userInfo.avatarUrl
    userInfo.nickName = _this.data.diagNick
    _this.setData({
      userInfo: userInfo,
      diagShow: false
    })
  },
  onCloseDiag(event) {
    this.setData({
      diagShow: false
    });
  }
})


function initDiag(_this) {
  let tmp = _this.data.customAvatar
  tmp[0] = _this.data.userInfo.avatarUrl
  _this.setData({
    customAvatar: tmp,
    diagNick: _this.data.userInfo.nickName
  })

}