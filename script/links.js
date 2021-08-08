/** /
yander = () => {
  agent = new SocksProxyAgent("socks5://127.0.0.1:9050");
  cat = new Catbox.Catbox("");

  doGet = callback => axios({
    url: lin,
    httpsAgent: agent,
  })
    .then(response => response.data.find(x => {
        console.log("Yandere link - " + x.file_url);
        callback(x.file_url);
      }))
}
/**/
links = () => {
  event dm(u, m: "^/link", url) => {
    if (m.indexOf("@") !== -1) == true
      then cat.upload(url).then(x => drrr.dm(m.substring(m.indexOf("@", 0) + 1), ".", x));
      else
        cat.upload(url).then(x => drrr.print(".", x));
  }
}
  
room = "2sSB7AA66u" //room ID

drrr = new Bot(__this__, "cha", "kanra-2x")

drrr.login(() => {
  drrr.join(room, () => {
    drrr.save();
    links();
  })
})
