// miniprogram/pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gundam: {
      "model": "高达",
      "rank": "B",
      "rating": 8,
      "ID": "10001",
      "landType": "万能",
      "fightType": "近距离",
      "skill": [{
        "skill_name": "防御力上升",
        "skill_detail": "防御力上升机体防御力上升/ 防御力提升约10% ",
        "id": "4"
      }, {
        "skill_name": "新人类的觉醒B",
        "skill_detail": "新人类的觉醒BHP50%以下时机动力上升+持续推进时间小幅上升+雷达显示敌军+锁敌距离增加/ 推进使用时间约50%上升 ",
        "id": "55"
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
      "makeNeed": [{
        "role": "key",
        "Level": "Lv.7",
        "rank": "C",
        "id": "13004",
        "name": "吉姆II (提坦斯式样)"
      }, {
        "role": "mat",
        "Level": "Lv.1",
        "rank": "C",
        "id": "11007",
        "name": "魔蟹"
      }, {
        "role": "mat",
        "Level": "Lv.1",
        "rank": "C",
        "id": "13003",
        "name": "高扎古"
      }, {
        "role": "mat",
        "Level": "Lv.1",
        "rank": "C",
        "id": "10005",
        "name": "吉姆狙击特装型"
      }, {
        "role": "mat",
        "Level": "Lv.1",
        "rank": "C",
        "id": "10008",
        "name": "钢坦克"
      }],
      "toMake": [{
        "role": "as-ke",
        "Level": "Lv.7",
        "rank": "BS",
        "id": "10020",
        "name": "高达(流星锤装备)"
      }, {
        "role": "as-ke",
        "Level": "Lv.7",
        "rank": "A",
        "id": "10018",
        "name": "高达试作3号机"
      }, {
        "role": "as-ke",
        "Level": "Lv.7",
        "rank": "BS",
        "id": "20004",
        "name": "灵格斯BWS"
      }, {
        "role": "as-ke",
        "Level": "Lv.7",
        "rank": "A",
        "id": "15003",
        "name": "强袭高达"
      }, {
        "role": "as-ke",
        "Level": "Lv.7",
        "rank": "A",
        "id": "10014",
        "name": "G-3高达"
      }, {
        "role": "as-ke",
        "Level": "Lv.7",
        "rank": "A",
        "id": "10044",
        "name": "V高达"
      }, {
        "role": "as-ma",
        "Level": "Lv.6",
        "rank": "BS",
        "id": "22089",
        "name": "O高达(实战型)"
      }, {
        "role": "as-ma",
        "Level": "Lv.2",
        "rank": "AS",
        "id": "12022",
        "name": "强化型ZZ高达"
      }, {
        "role": "as-ma",
        "Level": "Lv.2",
        "rank": "AS",
        "id": "10048",
        "name": "V-Dash高达"
      }, {
        "role": "as-ma",
        "Level": "Lv.1",
        "rank": "S",
        "id": "20008",
        "name": "ν 高达"
      }, {
        "role": "as-ma",
        "Level": "Lv.1",
        "rank": "S",
        "id": "10055",
        "name": "V2 BUSTER 高达"
      }, {
        "role": "as-ma",
        "Level": "Lv.1",
        "rank": "S",
        "id": "10049",
        "name": "高达F91"
      }, {
        "role": "as-ma",
        "Level": "Lv.1",
        "rank": "S",
        "id": "23002",
        "name": "高达DX"
      }, {
        "role": "as-ma",
        "Level": "Lv.7",
        "rank": "SS",
        "id": "20012",
        "name": "ν 高达 HWS"
      }, {
        "role": "as-ma",
        "Level": "Lv.1",
        "rank": "S",
        "id": "22048",
        "name": "OO 高达"
      }, {
        "role": "as-ma",
        "Level": "Lv.1",
        "rank": "S",
        "id": "24205",
        "name": "Turn X高达"
      }, {
        "role": "as-ma",
        "Level": "Lv.1",
        "rank": "S",
        "id": "24411",
        "name": "高达AGE-3标准型"
      }, {
        "role": "as-ma",
        "Level": "Lv.1",
        "rank": "S",
        "id": "10227",
        "name": "V2 高达"
      }],
      "makeNeed_CN": [],
      "tags": ["高达", "RX78", "", "78", "", "78", "", "始祖", "", "j8", "", "RX78", "", "元祖", "", "78", "", "元祖", "", "鋼彈", "", "钢弹", "", "78", "", "元祖高达", "", "初代高达", "", "高達", "", "始祖高达", "", "刚大木", "", "RX-78-2", "", "RX-78-2", "", "肛蛋", "高达"],
      "_id": 733,
      "nameCN_G": "鋼彈(RX-78-2)",
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
        "name": "光束軍刀",
        "effact": [],
        "biuNum": "",
        "pd": "近",
        "des": "800",
        "power": "1000",
        "gongsu": "1.3",
        "ping": "0"
      },
      "arm1_2": {
        "img": "32",
        "name": "光束步槍",
        "effact": [],
        "biuNum": "",
        "pd": "中",
        "des": "2800",
        "power": "1100",
        "gongsu": "1.3",
        "ping": "30"
      },
      "arm1_3": {
        "img": "22",
        "name": "火神砲",
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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let tmp = JSON.parse(options.gundam)
    // let tmp = wx.getStorageSync("oneGundam")
    let tmp = getApp().globalData.oneGundam
    this.setData({
      gundam: tmp
    })
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

  }
})