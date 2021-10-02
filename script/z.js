const https = require('https');
const sharp = require('sharp');
const got = require('got');
const puppeteer = require('puppeteer');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const youtubesearchapi = require('youtube-search-api');

cat = new Catbox.Catbox("");

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
