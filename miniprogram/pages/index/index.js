const db = wx.cloud.database()

Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    gundamList: [],
    totalCount: 100,
    page: 0,
    isGet: false,
    loading: {
      b: true,
      tip: "loading"
    },
    filterShow: false
  },
  onLoad(options) {
    let _this = this;

    // 查询当前用户所有的 counters
    db.collection('sdplayer')
      .skip(_this.data.page * 20).limit(20)
      .get({
        success: res => {
          _this.setData({
            gundamList: res.data,
            isGet: false,
            page: _this.data.page + 1
          })
          isloadEnd()
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    // 先取出集合记录总数
    db.collection('sdplayer').count().then(res => {
      let total = res.total
      _this.setData({
        totalCount: total
      })
      _this.isloadEnd()
    }).catch(err => {
      _this.isloadEnd()
    })

  },

  loadNextPage: function() {
    let _this = this;
    // 判断获取一次，防止重复获取
    if (this.isloadEnd()) {
      return false;
    }
    _this.setData({
      isGet: true
    })

    db.collection('sdplayer')
      .skip(_this.data.page * 20).limit(20)
      .get({
        success: res => {
          _this.setData({
            gundamList: _this.data.gundamList.concat(res.data),
            isGet: false,
            page: _this.data.page + 1
          })
          _this.isloadEnd()
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          _this.isloadEnd()
        }
      })
  },

  isloadEnd: function() {
    if (!this.data.gundamList.length || this.data.gundamList.length >= this.data.totalCount) {
      this.setData({
        loading: {
          loading: {
            b: false,
            tip: "没有数据啦"
          }
        }
      })
      return true
    }
    if (this.data.isGet) {
      return true;
    }
  },

  goDetail: function(e) {
    // let one = JSON.stringify(e.currentTarget.dataset.one)
    // wx.navigateTo({
    //   url: `../detail/detail?gundam=${one}`
    // })
    let one = e.currentTarget.dataset.one
    // wx.setStorageSync("oneGundam", one)
    getApp().globalData.oneGundam = one;
    wx.navigateTo({
      url: `../detail/detail?gundam=${one.ID}`
    })
  },

  onSearch: function(e) {
      // 开始搜索
      let text = e.detail
      let _this = this
      // 初始化
      _this.setData({
        gundamList: [],
        loading: {
          b: true,
          tip: "loading"
        },
        page: 0
      })
      // 搜索名称，英文名称，id，tag
      // if (/\s/.test(text)) {
      //   // 带有空格的模糊搜索
      //   text = text.split(/\s+/)
      // }

      var reg = db.RegExp({
        regexp: text,
        options: 'i',
      })

      // const _ = db.command
      filter(_this, reg)
        .skip(_this.data.page * 20).limit(20)
        .get({
          success: res => {
            _this.setData({
              gundamList: res.data,
              isGet: false,
              page: _this.data.page + 1
            })
            _this.isloadEnd()
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '查询记录失败'
            })
            _this.isloadEnd()
          }
        })
    }


    ,
  showfilter: function(e) {
    this.setData({
      filterShow: !this.data.filterShow
    })
  }
})


function filter(_this, reg) {
  const _ = db.command
  return db.collection('sdplayer')
    .where(_.or([{
        Name: reg
      },
      {
        model: reg
      },
      {
        tags: reg
      },
      {
        nameEN: reg
      }
    ]))
}