import Notify from '../../lib/vant-weapp/notify/notify';
const db = wx.cloud.database()
const app = getApp()
import moment from '../../lib/moment'
import utils from '../../utils/utils'
import Dialog from '../../lib/vant-weapp/dialog/dialog'

// 在页面中定义激励视频广告
let videoAd = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentsList: [],
    newsList: [],
    H24List: [],
    backgroundList: [
      // "https://hbimg.huabanimg.com/b4e6504b42622a99ef283002cc386b52b6ad04622fed2-RQKtS4_fw658",
      "https://hbimg.huabanimg.com/d772a0e61c4b7e24b70f6104952c601adf84ec1b23ead-lc0zMK_fw658",
      "https://hbimg.huabanimg.com/9989a4a46c4519350f645d4e06a92bdb909900722f836-YH8z3U_fw658",
      // "https://hbimg.huabanimg.com/fb3ee7f9c0a038b596318ab806c4d9d9196ee4bbe26e-fERGeR_fw658",
      // "https://hbimg.huabanimg.com/a2a17648ac2ae8cb30da64a39c71ae1b1251777018a5a-6FE5VG_fw658"
    ],
    loading: true,
    announcement: "",
    showAD_banner: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this
    this.initPageContent()

    // 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-41debc9af2440e2f'
      })
      videoAd.onLoad(() => {})
      videoAd.onError((err) => {})
      videoAd.onClose((res) => {
        // 用户点击了【关闭广告】按钮
        if (res && res.isEnded) {
          // 正常播放结束，可以下发游戏奖励
          gotoRank()
          // banner隐藏
          utils.hideAD_banner(_this)
        } else {
          // 播放中途退出，不下发游戏奖励
          Notify('播放中途退出，跳转失败。')
        }
      })
    }
    // 广告显示
    utils.showAD_banner(_this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  initPageContent: function() {
    let _this = this
    let collection = db.collection('comments')
    collection
      .orderBy('day', 'desc')
      // .orderBy('zan', 'desc')
      .skip(0 * 15).limit(15)
      .get()
      .then(res => {
        _this.setData({
          commentsList: _this.data.commentsList.concat(res.data),
          loading: false
        })
      })
    getHot(_this)
    getNews(_this)
    getAnnunce(_this)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading()
    this.setData({
      commentsList: [],
      newsList: [],
      loading: true,
      announcement: ""
    })
    this.initPageContent()
    wx.showToast({
      title: 'loading....',
      icon: 'loading'
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  longTap: function(e) {
    Dialog.confirm({
      title: '举报不当言论',
      message: '遇到不友善的言论，就点击举报吧！功能开发中。别增加作者无谓的工作量了，请友善讨论，嘴上积德~',
      confirmButtonText: '举报！',
      closeOnClickOverlay: true
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
    return false;
  },
  modalcnt1: function() {
    wx.startPullDownRefresh()
  },
  clickVideo: function() {
    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            wx.showToast({
              title: '读取视频失败了...',
            })
            gotoRank()
          })
      })
    }
  }
})

function gotoRank() {
  wx.navigateTo({
    url: '/pages/infos/rank',
  })
}

function getNews(_this) {
  let collection = db.collection('news')
  collection
    // .orderBy('_id','asc')
    // .orderBy('zan', 'desc')
    .field({
      title: true,
      sTime: true
    })
    .orderBy('sTime', 'desc')
    .skip(0 * 10).limit(10)
    // .orderBy('sMoment', 'desc')
    .get()
    .then(res => {
      if (res.data.length) {
        // 日期格式化
        res.data.forEach(ele => {
          ele.sTime = moment(ele.sTime).format('MM-DD HH:mm')
          // ele.sTime = moment(ele.sTime).format('MM-DD HH:mm')
        })

      }
      _this.setData({
        newsList: res.data
      })
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    })
}

function getAnnunce(_this) {
  let collection = db.collection('announcement')
  collection
    .get()
    .then(res => {
      // 公告板
      _this.setData({
        announcement: res.data[0] ? res.data[0].content : ""
      })
    })
}

function getHot(_this) {


  wx.request({
    url: 'https://test.sdplayer.club:3002/getGundam/h24List', //仅为示例，并非真实的接口地址
    data: {
      x: '',
      y: ''
    },
    method: 'POST',
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      var data = utils.decrypt(res.data)
      console.log(data)
      // 错误处理
      if (!data.body) {
        return
      }
      _this.setData({
        H24List: data.body.slice(0, 10)
      })

    }
  })

}

function decrypt(mi) {
  const key = crypto.Utf8.parse("1234123412ABCDEF"); //十六位十六进制数作为秘钥
  const iv = crypto.Utf8.parse('ABCDEF1234123412'); //十六位十六进制数作为秘钥偏移量
  let encryptedHexStr = crypto.Hex.parse(mi);
  mi = crypto.Base64.stringify(encryptedHexStr);
  const v = new crypto.AES().decrypt(mi.toString(), key, {
    iv: iv,
    mode: crypto.Mode.CBC,
    padding: crypto.Padding.Pkcs7
  });
  var res = v.toString(crypto.Utf8) ? JSON.parse(v.toString(crypto.Utf8).toString()) : {}
  return res
}