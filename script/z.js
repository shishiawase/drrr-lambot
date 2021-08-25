const got = require('got');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const youtubesearchapi = require('youtube-search-api');

globalThis.zodiac = (type, call) => {
	url = 'https://horo.mail.ru/prediction/' + type + '/today/';
	got(url)
  .then(resp => {
    let textNodes = [];
		let alltext = '';
    const dom = new JSDOM(resp.body);
    body = dom.window.document.querySelector('body');

    function recursy (element) {
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

globalThis.ytSearch = (name, call) => {
	youtubesearchapi.GetListByKeyword(name, false).then(x => {
    let yt = {
			1: [x.items[0].title, x.items[0].length.simpleText, x.items[0].id],
			2: [x.items[1].title, x.items[1].length.simpleText, x.items[1].id],
			3: [x.items[2].title, x.items[2].length.simpleText, x.items[2].id],
			4: [x.items[3].title, x.items[3].length.simpleText, x.items[3].id],
			5: [x.items[4].title, x.items[4].length.simpleText, x.items[4].id]
		};
		
		call(yt);
  })
}