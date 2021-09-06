var axios = require("axios");

globalThis.ggg = (call) => {
var options = {
  method: 'GET',
  url: 'https://youtube-mp36.p.rapidapi.com/dl',
  params: {id: 'C8fkSFIf3hY'},
  headers: {
    'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com',
    'x-rapidapi-key': '9fe6f22586msh294d1b87e05bfa1p188795jsn3ddfe3dd9656'
  }
};

axios.request(options).then(function (response) {
	call(response.data.link);
}).catch(function (error) {
	console.error(error);
});
}