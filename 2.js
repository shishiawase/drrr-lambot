const yts = require('yt-search');
const fs = require('fs');
const cmd = require('node-cmd');

let timesId = {};

globalThis.ytSearch = async (title, call) => {
  const res = await yts(title);
	let yt = {};
  let count = 0;
  const videos = res.videos.slice(0,5);

	if (videos[0].seconds > 600) {
		call('duration');
	} else {
		cmd.run('yt-dlp -f \'ba\' -x --audio-format mp3 --ffmpeg-location \'./node_modules/@ffmpeg-installer/win32-x64/\' https://www.youtube.com/watch?v=' + videos[0].videoId + ' -o \'./music/%(id)s.mp3\'', (err, data, stderr) => {
			if (!err) {
				let pathSong = './music/' + videos[0].videoId + '.mp3';

				yt.title = videos[0].title;
				yt.link = 'http://c177-129-159-247-225.ngrok.io/' + videos[0].videoId + '.mp3';

				if (!Object.keys(timesId).includes(videos[0].videoId)) {
					timesId[videos[0].videoId] = setTimeout(() => {
					  fs.unlink(pathSong, (error) => {
						  if (!error) {
							  console.log('delete ok');
						  } else {
							  console.error(error);
						  }
					  });
				  }, videos[0].seconds*1000);

					call(yt);
				} else {
					clearTimeout(timesId[videos[0].videoId]);

					timesId[videos[0].videoId] = setTimeout(() => {
					  fs.unlink(pathSong, (error) => {
						  if (!error) {
							  console.log('delete ok');
						  } else {
							  console.error(error);
						  }
					  });
				  }, videos[0].seconds*1000);

					call(yt);
				}
			}
		});
	}
}
