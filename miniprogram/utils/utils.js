import moment from '../lib/moment'
const crypto = requirePlugin("crypto");

const userDBconfig = {
  ReadCount: 1000,
  WriteCount: 1000
}
let app = getApp();

const mkCount = (opt) => {
  switch (opt) {
    case 'read':
      try {
        app.globalData.DBcount.ReadCount++
          wx.setStorage({
            key: 'DBcount',
            data: {
              ReadCount: app.globalData.DBcount.ReadCount || 0,
              WriteCount: app.globalData.DBcount.WriteCount || 0
            }
          })
      } catch (e) {
        console.log(e)
      }
      break;
    case 'write':
      try {
        app.globalData.DBcount.WriteCount++
          wx.setStorage({
            key: 'DBcount',
            data: {
              ReadCount: app.globalData.DBcount.ReadCount || 0,
              WriteCount: app.globalData.DBcount.WriteCount || 0
            }
          })
      } catch (e) {
        console.log(e)
      }
      break;
  }

  return true;
}

const checkCount = (opt) => {
  // 以“day”为单位进行判断。
  if (moment().isAfter(moment(app.globalData.date), 'day')) {
    wx.setStorage({
      key: 'date',
      data: moment()
    })
    let tmp = {
      key: 'DBcount',
      data: {
        ReadCount: 0,
        WriteCount: 0
      }
    }
    wx.setStorage(tmp)
    app.globalData.DBcount = tmp.data
    app.globalData.date = moment()
    return true
  }
  if (app.globalData.DBcount.ReadCount >= userDBconfig.ReadCount || app.globalData.DBcount.WriteCount >= userDBconfig.WriteCount) {
    return false;
  }

  return true;
}

const hideAD_banner = (_this) => {
  app.globalData.ad_detail_banner = moment().format('YYYY-MM-DD');
  wx.setStorage({
    key: 'ad_detail_banner',
    data: moment().format('YYYY-MM-DD'),
  })
  _this.setData({
    showAD_banner: false
  })
}

const showAD_banner = (_this) => {
  _this.setData({
    showAD_banner: true
  })
  return true;
  // 想要控制关闭banner广告，但是审核不过。
  app.globalData.ad_detail_banner = app.globalData.ad_detail_banner || "2019-01-01"
  if (moment().isAfter(moment(app.globalData.ad_detail_banner), 'day')) {
    _this.setData({
      showAD_banner: true
    })
  } else {
    _this.setData({
      showAD_banner: false
    })
  }
}

const decrypt = (mi) => {
  const key = crypto.Utf8.parse("1234123412ABCDEF"); //十六位十六进制数作为秘钥
  const iv = crypto.Utf8.parse('ABCDEF1234123412'); //十六位十六进制数作为秘钥偏移量
  let encryptedHexStr = crypto.Hex.parse(mi);
  mi = crypto.Base64.stringify(encryptedHexStr);
  const v = new crypto.AES().decrypt(mi.toString(), key, {
    iv: iv,
    mode: crypto.Mode.CBC,
    padding: crypto.Padding.Pkcs7
  });
  var res = v.toString(crypto.Utf8) ? JSON.parse(v.toString(crypto.Utf8).toString()) : {}
  return res
}

const encrypt = (word) => {
  const key = crypto.Utf8.parse("1234123412ABCDEF"); //十六位十六进制数作为秘钥
  const iv = crypto.Utf8.parse('ABCDEF1234123412'); //十六位十六进制数作为秘钥偏移量
  let srcs = crypto.Utf8.parse(word);
  let encrypted = new crypto.AES().encrypt(srcs, key, {
    iv: iv,
    mode: crypto.Mode.CBC,
    padding: crypto.Padding.Pkcs7
  });
  return encrypted.ciphertext.toString().toUpperCase();
}

module.exports = {
  mkCount: mkCount,
  checkCount: checkCount,
  hideAD_banner: hideAD_banner,
  showAD_banner: showAD_banner,
  decrypt: decrypt,
  encrypt: encrypt
}