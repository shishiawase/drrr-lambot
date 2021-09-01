const got = require('got');
const puppeteer = require('puppeteer');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const youtubesearchapi = require('youtube-search-api');

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
			
			  check = (num) => {
	        if (Object.keys(x.items[num]).includes("length")) {
						return x.items[num].length.simpleText;
					} else {
						return 'конченный конвертер зажал время';
					}
        }
				
        let yt = {
            1: [x.items[0].title, check(0), x.items[0].id],
            2: [x.items[1].title, check(1), x.items[1].id],
            3: [x.items[2].title, check(2), x.items[2].id],
            4: [x.items[3].title, check(3), x.items[3].id],
            5: [x.items[4].title, check(4), x.items[4].id]
        };

        call(yt);

    })
}

globalThis.taro = (call) => {
    let scrape = async() => {
			try {
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
			} catch (err) {
				console.log(err);
			}

        await browser.close();
        return result;
				
    }

    scrape().then(x => call(x));
};
