const {Bot, listen} = require('./bot.js')
const { Telegraf } = require('telegraf');
const fs = require('fs')

let db = JSON.parse(fs.readFileSync("./db.json", "utf8"));
let tg = new Telegraf(db.tok);
let bot = new Bot("На приеме.", "bakyura", "en-US");

tg.command("name", (ctx) => {
    let name = ctx.message.text.replace("/name ", "");

    db.result[db.voteName] = rate();
    ctx.reply(db.voteName + " - " + db.result[db.voteName]);
    db.users = {};
    db.score = [];
    db.voteName = name;
    bot.descr("Голосуем товарищи, будь это вражеское проклятье или дружеская симпатия. Пишем для этого - !v. Статистика - !s. | Цель - " + db.voteName);
    fs.writeFileSync("./db.json", JSON.stringify(db));
});
tg.launch();

logFunc = () => {
    if (!bot.load()) {
        bot.login(() => {
            console.log("Login ok");
            bot.save();

            bot.create("Голосование.",
            "Голосуем товарищи, будь это вражеское проклятье или дружеская симпатия. Пишем для этого - !v. Статистика - !s. | Цель - " + db.voteName,
            "2",
            "ru-RU",
            false,
            false,
            true, () => {
                db.roomid = bot.room.roomId;
                fs.writeFileSync("./db.json", JSON.stringify(db));
            });
        })
    } else {
        bot.join(db.roomid, () => {
            console.log("Reload ok");
        })
    }
}

addUser = (u) => {
    db.users[u] = 0;
    fs.writeFileSync("./db.json", JSON.stringify(db));
}

addScore = (u, m, trip) => {
    if (trip) {
        if (!db.users.includes(trip)) {
            db.users.push(trip);
            db.score.push(m);
            fs.writeFileSync("./db.json", JSON.stringify(db));
            console.log("User: " + u, "\nMessage: " + m + "\n");
            bot.dm(u, "Сохранено.");
        } else {
            bot.dm(u, "Ваш голос уже засчитан.");
        }
    } else {
        if (!db.users.includes(u)) {
            db.users.push(u);
            db.score.push(m);
            fs.writeFileSync("./db.json", JSON.stringify(db));
            console.log("User: " + u, "\nMessage: " + m + "\n");
            bot.dm(u, "Сохранено.");
        } else {
            bot.dm(u, "Ваш голос уже засчитан.");
        }
    }
}

rate = () => {
    let sum = 0;

    db.score.forEach(num => sum = sum + Number(num));
    sum = sum / db.score.length;
    sum += "";
    sum = sum.substring(0, 3);
    return sum;
}

numCheck = (n) => {
    return (n ^ 0) === n;
}

logFunc();

bot.event(["msg", "dm", "me"], (u, m, url, trip) => {
    if (m.match(/\!v/gi)) {
        bot.dm(u, "Сегодня гость программы это - " + db.voteName + ".\n Все просто, пишем цифру в ЛС(только цифру) по шкале от 1 до 10, оценивая человека.");

        /*if (!trip) {
            addUser(u);
        } else {
            addUser(trip);
        }*/
    }
});

bot.event(["dm"], (u, m, url, trip) => {
    if (m.match(/\d+$/gi)) {
        if (m < 0 || m > 10) {
            bot.dm(u, "Неверное число.");
        } else if (numCheck(Number(m)) === true) {
            if (trip) {
                addScore(u, m, trip);
            } else {
                addScore(u, m);
            }
        } else {
            bot.dm(u, "Нужно целое число.");
        }
    }
});

bot.event(["msg", "dm"], (u, m) => {
    if (m.match(/^\!s/)) {
        bot.print("Текущее голосование:\n~Участник: " + db.voteName + "\n~Всего голосов: " + db.score.length + "\n~Средний балл: " + rate());
    }
});

setInterval(() => bot.dm(bot.profile.name, "keep"), 60000*10);
setInterval(() => {
    bot.getLoc(() => {
        if (bot.room.users.length > 1) {
            console.log("Kick - " + bot.room.users[1].name);
            bot.kick(bot.room.users[1].name);
        }
    })
}, 60000*5);
setInterval(() => {
    bot.getLoc(() => {
        if (bot.room.roomId !== db.roomid) {
            logFunc();
        }
    })
}, 60000*2);
bot.leave();
