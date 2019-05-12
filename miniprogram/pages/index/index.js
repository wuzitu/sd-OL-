import utils from '../../utils/utils'
import cfg from '../../utils/cfg'
import Notify from '../../lib/vant-weapp/notify/notify';
const app = getApp()
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
    rankColor: {
      S: "#FB3F51",
      SS: "#F60018",
      SR: "#F60018",
      A: "#7F44D6",
      AS: "#4F10AD",
      AR: "#4F10AD",
      B: "#00AA72",
      BS: "#00AA72",
      BR: "#006E4A",
      BU: "#006E4A",
      C: "#FF8500",
      CS: "#FF8500",
      CR: "#A65600",
      CU: "#A65600",
    },

  },
  onLoad(options) {
    let _this = this;
    initFilterData(_this);
    goFilter(_this);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.loadNextPage()
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
    goFilter(_this, 'isNextPage')
  },

  isloadEnd: function() {
    if (this.data.gundamList.length >= this.data.totalCount) {
      this.setData({
        loading: false
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
      var odb = wx.cloud.database()
      // 搜索名称，英文名称，id，tag
      var reg = odb.RegExp({
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
      filterskill: '',
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
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: `SD敢达OL`,
      imageUrl: 'https://go.sdplayer.club/img/logo/logo.png'
    }
  },
  Capsule: function(e) {
    let _id = Math.floor(Math.random() * 768 + 1)
    wx.navigateTo({
      url: `../detail/detail?_id=${_id}`,
    })
  }
})


function goFilter(_this, opt) {
  // 限制查询次数
  if (!utils.checkCount()) {
    wx.showToast({
      title: '超过200次查询啦',
    })
    Notify('今天超过200次查询啦,明天再查吧！');
    _this.setData({
      loading: false,
      isGet: false
    })
    return false
  }
  // 定义DB
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
    modelType: _this.data.filterspecial || null,
    landType: _this.data.filterlandType || null,
    from: _this.data.filterisfrom || null,
    pilot: _this.data.filterpilot || null,
    force: _this.data.filterforce || null,
    weapon_e: _this.data.filterweapon_e || null
  };
  for (const key in eqTmp) {
    if (eqTmp.hasOwnProperty(key)) {
      const element = eqTmp[key];
      if (element == null) {
        delete eqTmp[key]
      }
    }
  }

  let collection = db.collection('SD_DB')
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
  // skill
  let skillTmp = _this.data.filterskill || null
  if (skillTmp) {
    let o = new RegExp(skillTmp, "i")
    let x = [{
      'skill.0.skill_name': o
    }, {
      'skill.1.skill_name': o
    }, {
      'skill.2.skill_name': o
    }, {
      'skill.3.skill_name': o
    }]
    collection = collection.where(_.or(x))
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
  // 计数
  if (opt != 'isNextPage') {
    collection.count().then(res => {
      let total = res.total
      _this.setData({
        totalCount: total
      })
      _this.isloadEnd()
    }).catch(err => {
      _this.isloadEnd()
    })
  }

  collection.skip(_this.data.page * 20).limit(20)
    .get({
      success: res => {
        _this.setData({
          gundamList: _this.data.gundamList.concat(res.data),
          isGet: false,
          page: _this.data.page + 1
        })
        _this.isloadEnd()
        utils.mkCount('read')
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '抱歉，查询记录失败'
        })
        _this.isloadEnd()
        utils.mkCount('read')
      }
    })
  // 埋点统计查询次数
  app.aldstat.sendEvent('机体列表查询', {
    "用户ID": app.globalData.openid || '未登录',
  })
}


function initFilterData(_this) {
  let f = cfg.filterMap
  _this.setData({
    Machine: f.Machine,
    fightType: f.fightType,
    special: f.special,
    landType: f.landType,
    isfrom: f.isfrom,
    pilot: f.pilot,
    force: f.force,
    weapon_e: f.weapon_e,
    sortBy_cn: f.sortBy_cn,
    skill: f.skillList
  })
}