const https = require('https');
const sharp = require('sharp');
const got = require('got');
const puppeteer = require('puppeteer');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const youtubesearchapi = require('youtube-search-api');
const PasteClient = require('pastebin-api').default;

key = JSON.parse(fs.readFileSync("./tg/toks.json", "utf8"));
cat = new Catbox.Catbox("");

globalThis.Box = (text, call) => {
	
  const client = new PasteClient(key.pb[0]);
  const urlpb = async () => {
		
		const token = await client.login(key.pb[1], key.pb[2]);
	  let data = await client.createPaste({
      code: 'Новые сообщения будут появляться сверху, следовательно самые старые будут оставаться внизу.\nРазвлекайтесь дамы и господа.~ И помните, я никого не сдам, что бы это ни было.)\n\n' + text,
      expireDate: '1D',
      name: 'Box',
      publicity: 0,
			apiUserKey: token,
    });
    return data;
  }

  urlpb().then(x => call(x)).catch(err => console.log(err));
}

globalThis.zodiac = (type, call) => {
    url = 'https://horo.mail.ru/prediction/' + type + '/today/';
    got(url)
    .then(resp => {
        let textNodes = [];
        let alltext = '';
        const dom = new JSDOM(resp.body);
        body = dom.window.document.querySelector('body');

        function recursy(element) {
            element.childNodes.forEach(node => {

                if (node.nodeName.match(/^P$/)) {
                    const obj = node.textContent;
                    textNodes.push(obj);
                } else {
                    recursy(node);
                }
            });
        }

        recursy(body);

        alltext = textNodes[0] + ' ' + textNodes[1];
        call(alltext);
    })
}

/*globalThis.zodSmile = (type, call) => {
	  url = 'http://stoboi.ru/gorodaily/horoscope.php?id=' + type;
    got(url)
    .then(resp => {
        let textNodes = [];
        let alltext = '';
        const dom = new JSDOM(resp.body);
        body = dom.window.document.querySelector('body');

        function recursy(element) {
            element.childNodes.forEach(node => {

                if (node.nodeName.match(/^P$/)) {
									console.log(node.innerText);
									console.log(node.outerText);
									console.log(node.innerHTML);
                    const obj = node.innerText;
                    textNodes.push(obj);
                } else {
                    recursy(node);
                }
            });
        }

        recursy(body);

        alltext = textNodes[2] + ' ' + textNodes[3] + ' ' + textNodes[4];
        call(alltext);
    })
}*/

globalThis.ytSearch = (na, call) => {
    youtubesearchapi.GetListByKeyword(na, false).then(x => {
			  let yt = {};
			
			  check = (num) => {
	        if (Object.keys(x.items[num]).includes("length")) {
						return x.items[num].length.simpleText;
					} else {
						return 'конченный поисковик зажал время';
					}
        }
				
				delList = () => {
					
					if (Object.keys(yt).length > 5) {
						delete yt[Object.keys(yt).length];
						delList();
					} else {
						call(yt);
					}
				}
				
				searchLen = (len) => {
				
					if (len < x.items.length) {
						len++;
					  yt[len] = [x.items[len - 1].title, check(len - 1), x.items[len - 1].id];
						searchLen(len);
					} else {
						delList();
					}
				}
				
				searchLen(0);

    })
}

/*globalThis.ytDownload = (id, call) => {
url = 'https://www.yt-download.org/file/mp3/' + id;
    got(url, {
			httpsAgent: agent, 
		})
    .then(resp => {
			  console.log(resp);
			  let dom = new JSDOM(resp.body);
        let body = dom.window.document.querySelector('body');

        let link = '';
        let re = new RegExp("^https:\/\/www.yt-download.org\/download\/" + id + "\/mp3\/320", "gi");

        function recursy (element) {
            element.childNodes.forEach(node => {
        
                if ((node.href || '').match(re)) {
                    link = node.href + '#.mp3';
                } else {
                    recursy(node);
                }
            });
        }

        recursy(body);
        call(link);
    })
}*/ //работает, но не везде//

globalThis.StickCon = (url, call) => {
	
	let file = fs.createWriteStream('file.webp');
  let request = https.get(url, (response) => {
    response.pipe(file);
		setTimeout(() => sharp('file.webp')
		  .resize({ width: 200 })
			.toFile('file.png', () => {
				sharp.cache(false);
				cat.upload('file.png').then(url => call(url)).catch(err => call("error"));
			}), 1000);
	});
	
}

globalThis.taro = (call) => {
    let scrape = async() => {

        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        await page.goto('https://astrohelper.ru/gadaniya-online/chto-on-dumaet-obo-mne-seichas/');

        // Click on card img
        await page.click('#prediction-space > div > div:nth-child(1) > div.sectem2 > img');
        await page.waitForSelector('#makadyas > h2:nth-child(1)');
        await page.click('#prediction-space > div > div:nth-child(2) > div.sectem2 > img');
        await page.waitForSelector('#makadyas > h2:nth-child(3)');
        await page.click('#prediction-space > div > div:nth-child(3) > div.sectem2 > img');
        await page.waitForSelector('#makadyas > h2:nth-child(5)');

        // Scrap logic
        const result = await page.evaluate(() => {
            urT = (num) => {
                return document.querySelector("#prediction-space > div > div:nth-child(" + num + ") > div.sectem2 > img").src
            };
            teT = (num) => {
                return document.querySelector("#makadyas > p:nth-child(" + num + ")").innerText
            };
            a = [urT(1).slice(44, urT(1).indexOf('.jpg')), urT(2).slice(44, urT(2).indexOf('.jpg')), urT(3).slice(44, urT(3).indexOf('.jpg'))];
            b = [teT(2), teT(4), teT(6)];
            let data = {};
            data["Мысли"] = [a[0], b[0]];
            data["Эмоции"] = [a[1], b[1]];
            data["Подсознательное"] = [a[2], b[2]];

            return data;
        })

        await browser.close();
        return result;
				
    }

    scrape().then(x => call(x)).catch(console.log);
};
