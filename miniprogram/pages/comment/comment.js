// miniprogram/pages/comment/comment.js
import Notify from '../../lib/vant-weapp/notify/notify';
import moment from '../../lib/moment'

const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: 'cloud://online-07f32f.6f6e-online-07f32f/custom/my-image.jpg',
    g_ID: 10001,
    g_Name: '敢达',
    g_Name_EN: 'GUNDAM RX78',
    popupShow: false,
    rateChecked: true,
    rateEnable: true,
    form_rate: 3,
    commentsList: [],
    page: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let collection = db.collection('comments')
    collection
      .where({
        ID: _this.data.g_ID
      })
      .skip(_this.data.page * 20).limit(20)
      .get()
      .then(res => {
        _this.setData({
          commentsList: _this.data.commentsList.concat(res.data),
          isGet: false,
          page: _this.data.page + 1
        })
        _this.setData({
          commentsList: res.data
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  switchpopup: function (e) {

    this.setData({
      popupShow: !this.data.popupShow,
    })
  },
  onSwitchChange: function (e) {
    this.setData({
      rateChecked: !this.data.rateChecked,
      rateEnable: !this.data.rateEnable
    })
  },
  onRateChange: function (e) {
    this.setData({
      form_rate: e.detail
    })
  },
  bindFormSubmit: function (e) {
    let _this = this
    console.log(e.detail)
    let val = e.detail.value
    db.collection('comments').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          // user
          Avatar: app.globalData.userInfo.avatarUrl,
          Name: app.globalData.userInfo.nickName,
          openid: app.globalData.openid,
          // form
          ID: _this.data.g_ID,
          rate: val.rate,
          content: val.content,
          zan: 0,
          day: moment().format('YYYY-MM-DD')
        }
      })
      .then(res => {
        console.log(res)
      })
  }
})