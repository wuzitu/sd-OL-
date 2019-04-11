const db = wx.cloud.database()

Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    gundamList: [],
    totalCount: 100,
    page: 0,
    isGet: false,
    loading: true,
    filterShow: false,
    rankFilter: [],
    Machine: [],
    fightType: [],
    special: [],
    landType: [],
    filterMachine: '',
    filterfightType: '',
    filterspecial: '',
    filterlandType: '',
    searchVal: '',
    filtersortBy_cn: '自动(默认)',
    endLine: false
  },
  onLoad(options) {
    let _this = this;
    initFilterData(_this);
    goFilter(_this);
    // // 查询当前用户所有的 counters
    // db.collection('sdplayer')
    //   .skip(_this.data.page * 20).limit(20)
    //   .orderBy('birth_date', 'desc')
    //   .get({
    //     success: res => {
    //       _this.setData({
    //         gundamList: res.data,
    //         isGet: false,
    //         page: _this.data.page + 1
    //       })
    //       isloadEnd()
    //     },
    //     fail: err => {
    //       wx.showToast({
    //         icon: 'none',
    //         title: '查询记录失败'
    //       })
    //       console.error('[数据库] [查询记录] 失败：', err)
    //     }
    //   })
    // // 先取出集合记录总数
    // db.collection('sdplayer').count().then(res => {
    //   let total = res.total
    //   _this.setData({
    //     totalCount: total
    //   })
    //   _this.isloadEnd()
    // }).catch(err => {
    //   _this.isloadEnd()
    // })

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
    goFilter(_this)
    // db.collection('sdplayer')
    //   .skip(_this.data.page * 20).limit(20)
    //   .orderBy('birth_date', 'desc')
    //   .get({
    //     success: res => {
    //       _this.setData({
    //         gundamList: _this.data.gundamList.concat(res.data),
    //         isGet: false,
    //         page: _this.data.page + 1
    //       })
    //       _this.isloadEnd()
    //     },
    //     fail: err => {
    //       wx.showToast({
    //         icon: 'none',
    //         title: '查询记录失败'
    //       })
    //       _this.isloadEnd()
    //     }
    //   })
  },

  isloadEnd: function() {
    if (this.data.gundamList.length >= this.data.totalCount) {
      this.setData({
        loading: false,
        endLine: true
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
  searchInput(e) {
    this.setData({
      searchVal: e.detail
    })
  },
  onSearch: function(e) {
      // 关闭filter层
      this.setData({
        filterShow: false,
        loading: true
      })
      // 开始搜索
      let text = this.data.searchVal
      let _this = this
      // 初始化
      _this.setData({
        gundamList: [],
        loading: true,
        page: 0
      })

      // 搜索名称，英文名称，id，tag
      var reg = db.RegExp({
        regexp: text,
        options: 'i',
      })
      // 带有空格的模糊搜索
      if (/\s/.test(text)) {
        text = text.split(/\s+/)
        reg = new RegExp(text.join("|"), "i")
      }
      _this.setData({
        searchReg: reg
      })

      // const _ = db.command
      goFilter(_this)
    }


    ,
  showfilter: function(e) {
    this.setData({
      filterShow: !this.data.filterShow
    })
  },

  filterClear() {
    let _this = this;
    _this.setData({
      rankFilter: [],
      filterMachine: [],
      filterfightType: '',
      filterspecial: '',
      filterlandType: '',
      filterisfrom: '',
      filterpilot: '',
      filterforce: '',
      filterweapon_e: '',
      filterweapon_p: '',
      filtersortBy_cn: '自动(默认)',
    })
  },
  onRankChange(event) {
    this.setData({
      rankFilter: event.detail
    });
    console.log(this.data.rankFilter)
  },

  bindPickerChange(e) {
    let _this = this;
    let id = e.target.id
    let value = _this.data[id][e.detail.value];
    let tmp = {}
    tmp['filter' + id] = value
    _this.setData(tmp)
  }
})


function goFilter(_this) {
  const _ = db.command

  let nameReg = _this.data.searchReg || ''
  let orArr = [{
      Name: nameReg
    },
    {
      model: nameReg
    },
    {
      tags: nameReg
    },
    {
      nameEN: nameReg
    }
  ];
  let rankArr = _this.data.rankFilter
  let eqTmp = {
    Machine: _this.data.filterMachine && _this.data.filterMachine.length ? _this.data.filterMachine : null,
    fightType: _this.data.filterfightType || null,
    special: _this.data.filterspecial || null,
    landType: _this.data.filterlandType || null,
    from: _this.data.filterisfrom || null,
    pilot: _this.data.filterpilot || null,
    force: _this.data.filterforce || null,
    weapon_e: _this.data.filterweapon_e || null,
    weapon_p: _this.data.filterweapon_p || null,
  };
  for (const key in eqTmp) {
    if (eqTmp.hasOwnProperty(key)) {
      const element = eqTmp[key];
      if (element == null) {
        delete eqTmp[key]
      }
    }
  }

  let collection = db.collection('sdplayer')
  // name
  if (nameReg) {
    collection = collection.where(_.or(orArr))
  }
  // eqTmp
  var eqA = Object.keys(eqTmp);
  if (eqA.length != 0) {
    collection = collection.where(eqTmp)
  }
  if (rankArr.length) {
    // rank
    collection = collection.where({
      rank: _.in(rankArr)
    })
  }
  // orderBy
  if (_this.data.filtersortBy_cn) {
    switch (_this.data.filtersortBy_cn) {
      case '自动(默认)':
        collection = collection
          .orderBy('birth_date', 'desc')
          .orderBy('fever', 'desc')
        break;
      case '登场日期':
        collection = collection
          .orderBy('birth_date', 'desc')
        break;
      case '热度':
        collection = collection
          .orderBy('fever', 'desc')
        break;
      case '漫猫评分':
        collection = collection.orderBy('rating', 'desc')
        break;
      default:
        collection = collection
          .orderBy('birth_date', 'desc')
          .orderBy('fever', 'desc')
    }
  }

  let countResult = collection.count().then(res => {
    let total = res.total
    _this.setData({
      totalCount: total
    })
    _this.isloadEnd()
  }).catch(err => {
    _this.isloadEnd()
  })
  let total = countResult.total
  collection.skip(_this.data.page * 20).limit(20)
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
          title: '抱歉，查询记录失败'
        })
        _this.isloadEnd()
      }
    })
}


function initFilterData(_this) {
  let g_data = getApp().globalData;
  g_data.filterMap.Machine
  _this.setData({
    Machine: g_data.filterMap.Machine,
    fightType: g_data.filterMap.fightType,
    special: g_data.filterMap.special,
    landType: g_data.filterMap.landType,
    isfrom: g_data.filterMap.isfrom,
    pilot: g_data.filterMap.pilot,
    force: g_data.filterMap.force,
    weapon_e: g_data.filterMap.weapon_e,
    weapon_p: g_data.filterMap.weapon_p,
    sortBy_cn: g_data.filterMap.sortBy_cn,
  })
}