const { SocksProxyAgent } = require('socks-proxy-agent');
const got = require('got');
const puppeteer = require('puppeteer');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const youtubesearchapi = require('youtube-search-api');

const agent = new SocksProxyAgent('socks5://127.0.0.1:9050');

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
				
				searchLen = (len) => {
				
					if (len < x.items.length) {
						len++;
					  yt[len] = [x.items[len - 1].title, check(len - 1), x.items[len - 1].id];
						searchLen(len);
					} else {
						call(yt);
					}
				}
				
				searchLen(0);

    })
}

/*globalThis.ytDownload = (ytID, rKey, call) => {
	var options = {
        method: 'GET',
        url: 'https://youtube-mp36.p.rapidapi.com/dl',
        params: {id: ytID},
        headers: {
            'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com',
            'x-rapidapi-key': rKey 
        }
    };

    axios.request(options).then(function (response) {
			console.log(response.data.link);
	    call(response.data);
    }).catch(function (error) {
	    console.error(error);
    });
}*/

/*globalThis.ytDownload = (id, call) => {
    let scrape = async() => {

        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        await page.goto('https://www.yt-download.org/api/button/mp3/' + id, {
					  waitUntil: 'networkidle0',
				});

        const result = await page.evaluate(() => {
            
						let data = document.querySelector("body > div > div > div > div > a:nth-child(1)").href;

            return data;
        })

        await browser.close();
        return result;
				
    }

    scrape().then(x => call(x)).catch(console.log);
};*/

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
