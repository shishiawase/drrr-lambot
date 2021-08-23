const got = require('got');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

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