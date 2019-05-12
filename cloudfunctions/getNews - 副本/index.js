const cheerio = require('cheerio');
const request = require('superagent');

const cloud = require('wx-server-sdk')
cloud.init({
  // env: 'online-07f32f',
  env: 'sdplayer-6bad5c',
  traceUser: true,
})
const db = cloud.database()
exports.main = async(event, context) => {
  try {
    return await goGet.then(newsList => {
      newsList.forEach((ele, index) => {

        db.collection('news').doc(index + '')
          .update({
            // data 传入需要局部更新的数据
            data: ele,
            success(res) {
              console.log(res.data)
            },
            fail(err){
              console.log(err)
            }
          })
        // update
      })
    })
  } catch (e) {
    console.error(e)
  }
}
let goGet = new Promise(
  (resolve, reject) => {
    let newsList = [],
      count = 0
    // get news
    request.get(`http://www.jianbinguozi.com/`)
      .then(res => {
        const $ = cheerio.load(res.text)
        // fs.writeFileSync('page1.html', res.text)
        let tmpList = $($(".list-bd")[0]).find('li');
        tmpList.length = 15;
        tmpList.each((index, news) => {

          let str = $($(news).find('span')).text().trim() || '';
          let sTime = $($(news).find('time')).text().trim() || ''
          let href = $($(news).find('a')).attr('href').trim() || ''
          newsList.push({
            title: str,
            sTime: sTime,
            href: href
          })
        })

        newsList.forEach(element => {
          request.get(`http://www.jianbinguozi.com${element.href}`)
            .then(res => {
              console.log('获取情报OK = 》 ' + element.title)
              var $ = cheerio.load(res.text)
              $($('.new-bd__inner').find('time')).remove() || '';
              let html = $('.new-bd__inner') || '';
              var RST = '2222'
              getContent(html)
              // let $text = cheerio.load(html.replace(/\<\s{0,5}br\s{0,5}\/{0,1}\s{0,5}\>/, '\n'))
              // let text = html.replace(/\<\s{0,5}br\s{0,5}\/{0,1}\s{0,5}\>/, '\n')
              // let text = $text.text()
              console.log(RST)
              // get over
              // delete element.href
              element.content = RST
              count++
              if (count >= 15) {
                // fs.writeFileSync(__dirname + '/newsList.json', JSON.stringify(newsList))
                resolve(newsList)
              }

              // function
              function getContent(node) {
                var a = node.contents();
                if (a.length == 0) {
                  if (node.is('br')) {
                    RST += '\n';
                  } else {
                    RST += node.text().trim();
                  }
                } else {
                  node.contents().each(function(i, elem) {
                    getContent($(this));
                  });

                  if (node.is('p') || node.is('tr')) {
                    RST += '\n';
                  }
                }
              }
            })
            .catch(err => {
              reject(err)
            })
        });

      })
      .catch(err => {
        reject(err)
      })
  })