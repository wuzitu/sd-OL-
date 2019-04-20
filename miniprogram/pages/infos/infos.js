// miniprogram/pages/infos/infos.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgs: [
      '../../static/images/img1.png',
      '../../static/images/img2.png',
      '../../static/images/img3.png',
      '../../static/images/img3.png',
      '../../static/images/img3.png',
    ],
    newsList: [
      {
        title: '武磊没得头发',
        articleId: 'toufa'
      },
      {
        title: '武磊真的没有头发',
        articleId: 666
      },
      {
        title: '别问了，再问就是没有。。。。。。。。。。。。。。。。。。。。。。。。。。',
        articleId: 3
      },
    ],
    tiebaList: [
      {
        title: '武磊没得头发',
        articleUrl: 'http://www.sdplayer.club'
      },
      {
        title: '武磊真的没有头发',
        articleUrl: 'http://www.sdplayer.club'
      },
      {
        title: '别问了，再问就是没有。。。。。。。。。。。。。。。。。。。。。。。。。。',
        articleUrl: 'http://www.sdplayer.club'
      },
    ],
    ad: {
      url: '../../static/images/ad.png'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  bannerTapHandler: function(e) {
    let _id = parseInt(e.currentTarget.id);
    switch (_id){
      case 0:
        console.log('武磊没得头发');
        break;
      case 2:
        console.log('下辈子也么有');
        break;
      default:
        console.log('胖胖说得对');
    }
  },
  newsTapHandler: function (e) {
    let _atcId = e.currentTarget.id;
    console.log(_atcId);
  },
  tiebaTapHandler: function(e) {
    let _id = e.currentTarget.id
    let _url = this.data.tiebaList[_id].articleUrl;
    console.log(_id, _url)
  }
})