import Notify from '../../lib/vant-weapp/notify/notify';
import Dialog from '../../lib/vant-weapp/dialog/dialog';
import utils from '../../utils/utils'
import moment from '../../lib/moment'
const app = getApp()

const db = wx.cloud.database()
// miniprogram/pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gundam: {
      "model": "高达",
      "rank": "",
      "rating": 0,
      "ID": "",
      "landType": "万能",
      "fightType": "近距离",
      "skill": [{
        "skill_name": "防御力上升",
        "skill_detail": "防御力上升机体防御力上升/ 防御力提升约10% ",
        "id": ""
      }, {
        "skill_name": "新人类的觉醒B",
        "skill_detail": "新人类的觉醒BHP50%以下时机动力上升+持续推进时间小幅上升+雷达显示敌军+锁敌距离增加/ 推进使用时间约50%上升 ",
        "id": ""
      }, {
        "skill_name": "乱舞型必杀",
        "skill_detail": "乱舞型必杀向前推进一定距离后攻击一个敌人的近战型必杀/ 必杀伤害:5500 ",
        "id": ""
      }],
      "story": "11",
      "Machine": ["2", "47"],
      "force": "地球联邦(U.C.0079)",
      "feature": "特色:一台值得纪念的机体",
      "from": "机动战士高达",
      "pilot": "阿姆罗",
      "makeNeed": [],
      "makeNeed_CN": [],
      "tags": ["高达", "RX78", "RX-78-2", "高达"],
      "_id": 733,
      "nameCN_G": "",
      "fever": 1332,
      "MID": 373,
      "RID": "B_10",
      "get_way": "扭蛋",
      "newState": "",
      "birth_date": "2018-11-30",
      "MB_sale": "",
      "GB_sale": "",
      "map_sale": "",
      "Name": "敢达",
      "rare": "",
      "strength": "",
      "coding": "11 27",
      "nameEN": "GUNDAM",
      "R": "不可变形",
      "para": {
        "move": "12",
        "fly": "64",
        "boost": "100",
        "boost_back": "33",
        "boost_usage": "20"
      },
      "arm1_1": {
        "img": "",
        "name": "",
        "effact": [],
        "biuNum": "",
        "pd": "近",
        "des": "800",
        "power": "1000",
        "gongsu": "1.3",
        "ping": "0"
      },
      "arm1_2": {
        "img": "",
        "name": "",
        "effact": [],
        "biuNum": "",
        "pd": "中",
        "des": "2800",
        "power": "1100",
        "gongsu": "1.3",
        "ping": "30"
      },
      "arm1_3": {
        "img": "",
        "name": "",
        "effact": [],
        "biuNum": "*5",
        "pd": "中",
        "des": "1200",
        "power": "180",
        "gongsu": "1.3",
        "ping": "5"
      },
      "sp1": "10",
      "shield1": {
        "life": "1000",
        "def": "50%"
      },
      "arm2_1": {
        "img": "",
        "name": "",
        "effact": [],
        "biuNum": "",
        "pd": "",
        "des": "",
        "power": "",
        "gongsu": "",
        "ping": ""
      },
      "arm2_2": {
        "img": "",
        "name": "",
        "effact": [],
        "biuNum": "",
        "pd": "",
        "des": "",
        "power": "",
        "gongsu": "",
        "ping": ""
      },
      "arm2_3": {
        "img": "",
        "name": "",
        "effact": [],
        "biuNum": "",
        "pd": "",
        "des": "",
        "power": "",
        "gongsu": "",
        "ping": ""
      },
      "sp2": "",
      "shield2": {
        "life": "",
        "def": ""
      },
      "weaponSource": "zj",
      "weapon_e": [],
      "modelType": [],
      "ManMaoVal": {
        "att": "108",
        "def": "98",
        "fly": "70",
        "ctl": "78",
        "D4sum": "354",
        "D3sum": "276"
      }
    },
    spMap: {
      "10": "乱舞型",
      "11": "全弹发射型",
      "12": "地图炮型",
      "239": "突进型"
    },
    activeName: ['roboData'],
    skillShow: [false, false, false],

    showAD_banner: true,
    showAvatar: false,
    commentsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // let tmp = JSON.parse(options.gundam)
    // let tmp = wx.getStorageSync("oneGundam")
    let _this = this;
    let req = {
      ID: ""
    }
    // 广告显示
    utils.showAD_banner(_this)
    // share情况下，读取数据库加载页面
    if (options.shareID || options._id) {
      _this.data.gundam.ID = options.shareID || options._id
      _this.setData({
        gundam: _this.data.gundam
      })
      // options.shareID = "10001"
      wx.showLoading({
        title: '加载中',
      })
      let collection = db.collection('SD_DB')
      // 扭蛋
      if (options.shareID) {
        collection = collection.where({
          ID: options.shareID
        })
        req.ID = options.shareID
      } else {
        // Notify('抽扭蛋吗？希望能得到你想要的机体!')
        Notify({
          text: `祝贺你，获得新机体！`,
          // selector: '#van-notify',
          backgroundColor: '#D17BBC'
        })
        // collection = collection.where({
        //   _id: Number(options._id)
        // })
        req.ID = Number(options._id)
      }

      req = utils.encrypt(JSON.stringify(req)).toString();
      wx.request({
        url: 'https://test.sdplayer.club:3002/getGundam/findOne', //仅为示例，并非真实的接口地址
        data: {
          text: req
        },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          let resData = utils.decrypt(res.data);
          console.log(resData)
          // 错误处理
          if (!resData.body) {
            return
          }
          // get成功
          _this.setData({
            gundam: resData.body
          })
          wx.hideLoading()
          // 读取评论
          load_comment(_this)
        }
      })

      // collection.get({
      //   success(res) {
      //     if (res.data.length) {
      //       if (res.data[0].skill[2] && res.data[0].skill[2].skill_name.match("型必杀")) {
      //         res.data[0].skill.length = 2
      //       }
      //       _this.setData({
      //         gundam: res.data[0]
      //       })
      //       wx.hideLoading()
      //       // 读取评论
      //       load_comment(_this)
      //     } else {
      //       handleErr('err')
      //     }
      //   },
      //   fail(err) {
      //     console.log(err)
      //   }
      // })
      return;
    }

    let tmp = getApp().globalData.oneGundam
    if (tmp) {
      if (tmp.skill[2] && tmp.skill[2].skill_name.match("型必杀")) {
        tmp.skill.length = 2
      }
      this.setData({
        gundam: tmp
      })
      // 读取评论
      load_comment(_this)
    }
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
  onReachBottom: function(res) {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: this.data.gundam.Name || this.data.gundam.model,
      path: `/pages/detail/detail?shareID=${this.data.gundam.ID}`
    }
  },

  onCollapseChange(event) {
    this.setData({
      activeName: event.detail
    });
  },
  noticeSubGundam(e) {
    let one = e.currentTarget.dataset.one

    Dialog.confirm({
      // title: '标题',
      message: `${one.name}：${one.Level}`,
      confirmButtonText: '查看机体',
      closeOnClickOverlay: true
    }).then(() => {
      // on confirm
      wx.navigateTo({
        url: `/pages/detail/detail?shareID=${one.id}`
      })
    }).catch(() => {
      // on cancel
    });

    // Notify({
    //   text: `${one.name}：${one.Level}`,
    //   duration: 1700,
    //   selector: '#van-notify',
    //   backgroundColor: '#1989fa'
    // });
  },
  toggleSkillShow(e) {
    let idx = e.currentTarget.dataset.idx
    let aTmp = this.data.skillShow
    aTmp[idx] = !this.data.skillShow[idx]
    this.setData({
      skillShow: aTmp
    })
  },
  // 顶部navbar点击事件
  onClickLeft() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  tapAD(e) {
    // 埋点统计查询次数
    app.aldstat.sendEvent('点击阿拉丁广告', {
      "用户ID": app.globalData.openid || '未登录',
    })
  },
  onImgLoadend(e) {
    this.setData({
      showAvatar: true
    })
  },
  goFilterGD(e) {
    let _this = this
    let type = e.currentTarget.dataset.type
    let d = e.currentTarget.dataset.d
    let tmp = {
      find: true
    }
    tmp[`filter${type}`] = d
    app.globalData.gdFilter = (tmp)
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})

function handleErr(err) {
  wx.showToast({
    title: '抱歉，读取错误',
    duration: 2000
  })
}

function updateFever(gundam) {
  let _id = gundam._id
  const _ = db.command
  db.collection('SD_DB').doc(_id).get({
    success(res) {
      // res.data 包含该记录的数据
      console.log(res.data)
    }
  })
  db.collection('SD_DB').doc(_id).update({
    data: {
      fever: _.inc(10)
    },
    success(res) {
      console.log(res.data)
    },
    faile(err) {
      console.log(err)
    }
  })
}

// load 评论
function load_comment(_this) {
  // setTimeout(() => {
  //   let collection = db.collection('comments')
  //   collection
  //     .where({
  //       ID: _this.data.gundam.ID
  //     })
  //     .orderBy('zan', 'desc')
  //     .orderBy('day', 'desc')
  //     .skip(0 * 3).limit(3)
  //     .get()
  //     .then(res => {
  //       _this.setData({
  //         commentsList: _this.data.commentsList.concat(res.data),
  //         loading: false
  //       })
  //     })
  // }, 1000)

  // server 版本
  setTimeout(() => {
    let req = utils.encrypt(JSON.stringify({
      ID: _this.data.gundam.ID,
      page: 1,
      pagesize: 3,
      top: 3
    })).toString();
    wx.request({
      url: 'https://test.sdplayer.club:3002/getGundam/TopComment',
      data: {
        text: req
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let resData = utils.decrypt(res.data);
        console.log(resData)
        // 错误处理
        if (!resData.body) {
          return
        }
        // get成功
        _this.setData({
          commentsList: _this.data.commentsList.concat(resData.body),
          loading: false
        })
      }
    })
  }, 1000)
}