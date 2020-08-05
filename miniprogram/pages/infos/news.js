const db = wx.cloud.database()
const app = getApp()
import utils from '../../utils/utils'
import moment from '../../lib/moment'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    sTime: "",
    content: "",
    showAD_banner: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this
    // 检测广告显示
    utils.showAD_banner(_this)
    // 查询news
    let id = options.id
    let collection = db.collection('news')
    collection
      .doc(id)
      .get()
      .then(res => {
        res.data.sTime = moment(res.data.sTime).format('YYYY-MM-DD HH:mm:ss')
        this.setData({
          title: res.data.title,
          sTime: res.data.sTime,
          content: res.data.content.replace(/\\n/g, "\n")
        })
      })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

  }
})