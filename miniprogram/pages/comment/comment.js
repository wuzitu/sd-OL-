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
    g_ID: 1123581321,
    g_Name: '敢达',
    g_rate: 0,
    g_Name_EN: 'GUNDAM',
    popupShow: false,
    rateChecked: true,
    rateEnable: true,
    formRate: 0,
    commentsList: [],
    page: 0,
    commentReq: false,
    needUpdateComment: false,
    comment_id: '',
    postData: {},
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (!options || !options.g_ID) {
      Notify('读取数据错误！')
    } else {
      this.setData({
        g_ID: options.g_ID,
        g_Name: options.g_Name,
        g_rate: options.g_rate,
        g_Name_EN: options.g_Name_EN
      })
    }
    getDBPage(this, '')
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
  // 顶部navbar点击事件
  onClickLeft() {
    wx.switchTab({
      url: '/pages/index/index'
    })
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
    console.log(this.data.page)
    if (isloadEnd(this)) {
      return false;
    }
    getDBPage(this, 'isNextPage')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: `【精选评论】${this.data.g_Name}`,
      path: `/pages/comment/comment?g_ID=${this.data.g_ID}$g_Name=${this.data.g_Name}&g_rate=${this.data.g_rate}&g_Name_EN=${this.data.g_Name_EN}`
    }
  },
  switchpopup: function(e) {

    this.setData({
      popupShow: !this.data.popupShow,
    })
  },
  showPopup: function(e) {
    let _this = this
    this.setData({
      popupShow: !this.data.popupShow,
      commentReq: false,
      needUpdateComment: false
    })
    let collection = db.collection('comments')
    collection
      .where({
        ID: _this.data.g_ID,
        openid: app.globalData.openid
      })
      .get()
      .then(res => {
        if (res.data[0]) {
          _this.setData({
            formRate: res.data[0].rate,
            rateEnable: res.data[0].rateEnable,
            formContent: res.data[0].content,
            commentReq: true,
            needUpdateComment: true,
            comment_id: res.data[0]._id,
            postData: res.data[0]
          })
        } else {
          _this.setData({
            commentReq: true,
            needUpdateComment: false
          })
          return false
        }
      })
      .catch(err => {
        Notify('网络错误，请重新打开')
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
      formRate: e.detail,
      rateEnable: true
    })
  },
  bindFormSubmit: function(e) {
    let _this = this
    console.log(e.detail)
    let val = e.detail.value
    // 判断填写合法
    if (!val.content) {
      Notify('评论内容还没有填写哦，评价一下机体吧！');
      wx.showToast({
        title: '请填写内容',
        icon: 'none'
      })
      return false
    }
    if (val.content.match(/\n{15,}/)) {
      Notify('换行也太多了吧！重新排版一下吧！');
      return false
    }
    let postData = {
      // user
      Avatar: app.globalData.userInfo.avatarUrl,
      Name: app.globalData.userInfo.nickName,
      openid: app.globalData.openid,
      // form
      ID: _this.data.g_ID,
      rateEnable: val.rateEnable,
      rate: val.rate,
      content: val.content,
      day: moment().format('YYYY-MM-DD')
    }
    // 关闭弹层
    _this.switchpopup()
    // 判断更新 or 新增
    if (_this.data.needUpdateComment) {
      db.collection('comments').doc(_this.data.comment_id).update({
          data: postData
        })
        .then(res => {
          postSuccess(_this, postData)
        })
        .catch(err => {
          Notify('网络错误，提交失败了 T.T')
        })
    } else {
      postData.zan = 0
      db.collection('comments').add({
          // data 字段表示需新增的 JSON 数据
          data: postData
        })
        .then(res => {
          postSuccess(_this, postData)
        })
        .catch(err => {
          Notify('网络错误，提交失败了 T.T')
        })
    }
    
  }
})

function postSuccess(_this, postData) {
  wx.showToast({
    title: '提交成功！',
  })
  _this.setData({
    postData: postData
  })
}

function getDBPage(_this, opt) {
  let collection = db.collection('comments').where({
    ID: _this.data.g_ID
  })

  collection
    .orderBy('zan', 'desc')
    .orderBy('day', 'desc')
    .skip(_this.data.page * 7).limit(7)
    .get()
    .then(res => {
      _this.setData({
        commentsList: _this.data.commentsList.concat(res.data),
        isGet: false,
        page: _this.data.page + 1
      })
      isloadEnd(_this)
    })

  if (opt == 'isNextPage') {
    console.log(_this.data.page)
    // 防抖
    _this.setData({
      isGet: true
    })
  }
  // 计数
  else {
    // 读取总条数
    collection.count().then(res => {
      let total = res.total
      _this.setData({
        totalCount: total
      })
      isloadEnd(_this)
    }).catch(err => {
      isloadEnd(_this)
    })
  }
}

function isloadEnd(_this) {
  let totalCount = _this.data.totalCount || 0
  if (_this.data.commentsList.length >= totalCount) {
    _this.setData({
      loading: false
    })
    return true
  }
  if (_this.data.isGet) {
    return true;
  }
}

function initForm(_this) {

}