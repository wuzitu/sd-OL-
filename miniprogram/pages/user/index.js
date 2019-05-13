// 在页面中定义激励视频广告
let videoAd = null
let interstitialAd = null
const app = getApp()
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    diagNick: '',
    avatarIndex: 0,
    customAvatar: ['cloud://sdplayer-6bad5c.7364-sdplayer-6bad5c/my-image.jpg', 'cloud://online-07f32f.6f6e-online-07f32f/custom/3.jpg', 'cloud://online-07f32f.6f6e-online-07f32f/custom/my-image.jpg', 'cloud://online-07f32f.6f6e-online-07f32f/custom/1.jpg', 'cloud://online-07f32f.6f6e-online-07f32f/custom/2.jpg', 'cloud://online-07f32f.6f6e-online-07f32f/custom/4.jpg', 'cloud://online-07f32f.6f6e-online-07f32f/custom/5.png'],
    userInfo: {},
    logged: false,
    loading: false,
    popupShow: false,
    diagShow: false,
  },

  onLoad: function() {

    let _this = this
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
              // 记录原头像
              res.userInfo.wxAvatar = res.userInfo.avatarUrl
              // 读取本机缓存的openid，userInfo
              app.globalData.openid = wx.getStorageSync("openid") || ""
              if (!app.globalData.openid) {
                return;
              }
              let localUserInfo = wx.getStorageSync("userInfo") || {}
              if (localUserInfo.nickName) {
                localUserInfo.wxAvatar = res.userInfo.avatarUrl
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

              app.globalData.userInfo = this.data.userInfo
              // 初始化弹窗头像
              initDiag(this)
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

    setTimeout(() => { // 在页面onLoad回调事件中创建插屏广告实例
      if (wx.createInterstitialAd) {
        interstitialAd = wx.createInterstitialAd({
          adUnitId: 'adunit-2aef497222e8ac9d'
        })
        interstitialAd.onLoad(() => {})
        interstitialAd.onError((err) => {})
        interstitialAd.onClose(() => {})
      }
      // 在页面onLoad回调事件中创建激励视频广告实例
      if (wx.createRewardedVideoAd) {
        videoAd = wx.createRewardedVideoAd({
          adUnitId: 'adunit-41debc9af2440e2f'
        })
        videoAd.onLoad(() => {})
        videoAd.onError((err) => {})
        videoAd.onClose((res) => {})
      }
    }, 700)
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
          e.detail.userInfo.wxAvatar = e.detail.userInfo.avatarUrl
          app.globalData.openid = res.result.openid
          app.globalData.userInfo = e.detail.userInfo
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
          initDiag(_this)
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

  onShow: function() {

  },

  // 捐助
  donate: () => {
    wx.previewImage({
      urls: ['http://cdn.sdplayer.club/zanshang.jpg'],
    });
    // 埋点统计次数
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
    if (interstitialAd && this.data.popuptype == 'ad') {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
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
    // 验证必填
    if (!this.data.diagNick.trim()) {
      wx.showToast({
        title: '昵称为空',
        icon: 'loading'
      })
      return false
    }
    let userInfo = _this.data.userInfo
    userInfo.avatarUrl = _this.data.customAvatar[_this.data.avatarIndex] || _this.data.userInfo.avatarUrl
    userInfo.nickName = _this.data.diagNick
    _this.setData({
      userInfo: userInfo,
      diagShow: false
    })
    // 设置全局变量
    app.globalData.userInfo = userInfo
    // IO读写/异步
    wx.setStorage({
      key: 'userInfo',
      data: userInfo
    })

  },
  onCloseDiag(event) {
    this.setData({
      diagShow: false
    });
  },
  openDlg(e) {
    initDiag(this)
    this.setData({
      diagShow: true
    })
  },
  onWatchAD(e) {
    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            console.log('激励视频 广告显示失败')
          })
      })
    }
  }
})


function initDiag(_this) {
  let tmp = _this.data.customAvatar || []
  tmp[0] = _this.data.userInfo.wxAvatar
  // for wuzitu
  if (app.globalData.openid == 'oEH945BhJPrW9EKv7YWWFpqhn04A') {
    tmp[7] = 'cloud://online-07f32f.6f6e-online-07f32f/custom/wuzitu.jpg'
  }
  // xixi
  _this.setData({
    customAvatar: tmp,
    diagNick: _this.data.userInfo.nickName
  })
  tmp.forEach((ele, index) => {
    if (ele == _this.data.userInfo.avatarUrl) {
      _this.setData({
        avatarIndex: index
      })
    }
  });
}

function onFailed(_this) {
  wx.hideLoading()
  app.globalData.userInfo = {}
  app.globalData.openid = ""
  wx.showToast({
    title: '请重新登录！',
    icon: 'none'
  })
}