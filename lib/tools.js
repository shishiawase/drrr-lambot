const yts = require('yt-search');
const fs = require('fs');
const cmd = require('node-cmd');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

let timesId = {};
// Youtube Music
exports.ytMusic = async (title, call) => {
    // Получаем информацию о видео (title, duration, id ...)
    const res = await yts(title);
    // Записываем 5 первых найденных видео
    const videos = res.videos.slice(0,5);
    console.log(videos);

    if (videos[0].seconds > 600) {
        // Если видео больше 10 минут, возвращаем метку об этом
        call('duration');

    } else {
        // Запускаем скачку и конвертер в mp3 через cmd
        cmd.run("yt-dlp -f \"ba\" -x --audio-format mp3 --ffmpeg-location " + ffmpegPath + " https://www.youtube.com/watch?v=" + videos[0].videoId + " -o \"./music/%(id)s.mp3\"", (err, data, stderr) => {
            if (!err) {
                // Путь сохранения файла
				let pathSong = './music/' + videos[0].videoId + '.mp3';
                // Упаковываем название и ссылку на файл
                let yt = {
                    title: videos[0].title,
                    link: 'http://2f83-46-191-138-212.ngrok.io/' + videos[0].videoId + '.mp3'
                };

                if (!Object.keys(timesId).includes(videos[0].videoId)) {
                    // Устанавливаем отсчет для удаления исходя из продолжительности видео
                    timesId[videos[0].videoId] = setTimeout(() => {

                        fs.unlink(pathSong, (error) => {
                            if (!error) {
                                console.log(videos[0].title + ' deleted');
                            } else {
                                console.error(error);
                            }
                        });

                    }, videos[0].seconds*1000);
                    // Возвращаем название и ссылку на песню
                    call(yt);

                } else {
                    // Если песня поставлена повторно, то удаляем отсчет и ставим заново
                    clearTimeout(timesId[videos[0].videoId]);

                    timesId[videos[0].videoId] = setTimeout(() => {

                        fs.unlink(pathSong, (error) => {
                            if (!error) {
                                console.log(videos[0].title + ' deleted');
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
