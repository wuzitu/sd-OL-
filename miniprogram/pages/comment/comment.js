// miniprogram/pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: 'cloud://online-07f32f.6f6e-online-07f32f/custom/my-image.jpg',
    g_ID: 1123581321,
    g_Name: '敢达',
    g_Name_EN: 'GUNDAM RX78',
    popupShow: false,
    rateChecked: true,
    rateEnable: true,
    form_rate: 3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },
  switchpopup: function(e) {

    this.setData({
      popupShow: !this.data.popupShow,
    })
  },
  onSwitchChange: function(e) {
    this.setData({
      rateChecked: !this.data.rateChecked,
      rateEnable: !this.data.rateEnable
    })
  },
  onRateChange: function(e) {
    this.setData({
      form_rate: e.detail
    })
  }
})