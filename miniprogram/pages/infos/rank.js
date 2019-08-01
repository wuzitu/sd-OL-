Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    rankMap: {},
    topColor:{
      '1': 'red',
      '2': 'blue',
      '3': 'green',
      '4': 'mauve',
      '5': 'cyan',
      '6': 'brown'
    },
    gridCol: 3,
    skin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this
    wx.request({
      url: 'https://api.sdplayer.club:3001/getGundam/winRank',
      data: {},
      method: "POST",
      success(res) {
        // console.log(res.data)
        _this.setData({
          rankMap: res.data
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
  goHome() {
    wx.switchTab({
      url: '/pages/infos/infos'
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