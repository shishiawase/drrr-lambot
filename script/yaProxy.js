const agent = new SocksProxyAgent("socks5://127.0.0.1:9050");
const cat = new Catbox.Catbox("");

doGet = callback => axios({
    url: "https://yande.re/post.json?limit=1&page=" + Math.floor(Math.random() * 1e4),
    httpsAgent: agent,
  })
    .then(response => response.data.find(x => {
      console.log("Yandere link - " + x.preview_url);
      callback(x.preview_url);
    }))
	
doGet(link => cat.upload(link).then(x => console.log("Catbox link - " + x)));