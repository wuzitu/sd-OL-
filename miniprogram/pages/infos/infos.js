// miniprogram/pages/infos/infos.js
const db = wx.cloud.database()
const app = getApp()
import moment from '../../lib/moment'
import Dialog from '../../lib/vant-weapp/dialog/dialog'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentsList: [],
    newsList: [],
    backgroundList: [
      "https://hbimg.huabanimg.com/b4e6504b42622a99ef283002cc386b52b6ad04622fed2-RQKtS4_fw658",
      "https://hbimg.huabanimg.com/d772a0e61c4b7e24b70f6104952c601adf84ec1b23ead-lc0zMK_fw658",
      "https://hbimg.huabanimg.com/9989a4a46c4519350f645d4e06a92bdb909900722f836-YH8z3U_fw658",
      "https://hbimg.huabanimg.com/fb3ee7f9c0a038b596318ab806c4d9d9196ee4bbe26e-fERGeR_fw658",
      "https://hbimg.huabanimg.com/a2a17648ac2ae8cb30da64a39c71ae1b1251777018a5a-6FE5VG_fw658"
    ],
    loading: true,
    announcement: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initPageContent()
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
      .skip(0 * 20).limit(20)
      .get()
      .then(res => {
        _this.setData({
          commentsList: _this.data.commentsList.concat(res.data),
          loading: false
        })
      })
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
  modalcnt1: function () {

    wx.startPullDownRefresh()
  }
})

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