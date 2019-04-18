import Notify from '../../lib/vant-weapp/notify/notify';
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
      "ID": "1123581321",
      "landType": "万能",
      "fightType": "近距离",
      "skill": [{
        "skill_name": "防御力上升",
        "skill_detail": "防御力上升机体防御力上升/ 防御力提升约10% ",
        "id": "10"
      }, {
        "skill_name": "新人类的觉醒B",
        "skill_detail": "新人类的觉醒BHP50%以下时机动力上升+持续推进时间小幅上升+雷达显示敌军+锁敌距离增加/ 推进使用时间约50%上升 ",
        "id": "10"
      }, {
        "skill_name": "乱舞型必杀",
        "skill_detail": "乱舞型必杀向前推进一定距离后攻击一个敌人的近战型必杀/ 必杀伤害:5500 ",
        "id": "10"
      }],
      "story": "本机就是初代高达，是V计划里RX-78系列的二号机，也是GUNDAM史上第一次MS战的参与者，被吉恩军驾驶员称为“白色恶魔”；然而本机得以称为“最强”的最大原因，却是驾驶员阿姆罗·雷的NT能力在战场上的充分运用。本机在阿·巴瓦·库会战中与夏亚所驾驶的MSN-02吉恩号交战时双双被毁。",
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
        "img": "3",
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
        "img": "3",
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
        "img": "3",
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
      "12": "地图炮型"
    },
    activeName: ['roboData'],
    skillShow: [false, false, false]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let tmp = JSON.parse(options.gundam)
    // let tmp = wx.getStorageSync("oneGundam")
    let _this = this;
    // share情况下，读取数据库加载页面
    if (options.shareID) {
      wx.showLoading({
        title: '加载中',
      })
      db.collection('SD_DB').where({
          ID: options.shareID
        })
        .get({
          success(res) {
            if (res.data.length) {
              _this.setData({
                gundam: res.data[0]
              })
              wx.hideLoading()
            } else {
              handleErr('err')
            }
          }
        })

      return;
    }

    let tmp = getApp().globalData.oneGundam
    if (tmp) {
      this.setData({
        gundam: tmp
      })
      updateFever(tmp)
    }
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
  onReachBottom: function (res) {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
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
    Notify({
      text: `${one.name}：${one.Level}`,
      duration: 1000,
      selector: '#van-notify',
      backgroundColor: '#1989fa'
    });
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
  // db.collection('todos').doc('todo-identifiant-aleatoire').update({
  //   // data 传入需要局部更新的数据
  //   data: {
  //     // 表示将 done 字段置为 true
  //     fever: true
  //   },
  //   success(res) {
  //     console.log(res.data)
  //   }
  // })
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