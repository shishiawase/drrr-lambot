// Массивы
const tg = JSON.parse(fs.readFileSync("./tg/toks.json", "utf8"));
const bot = new Telegraf(tg.bot);
let usersDB = JSON.parse(fs.readFileSync("./saves/usersDB.json", "utf8"));
let room = JSON.parse(fs.readFileSync("./saves/room.json", "utf8"));
let ytList = {};
const reChar = new RegExp("_|\\*|\\[|`", "gi");
const chars = {
  "_": "\\_",
  "*": "\\*",
  "[": "\\[",
  "`": "\\`"
};
let eggId = {
  interval: {},
  timeout: {}
};
// keep
keeper = (num) => {
  if (num !== 5) then {
    num++;
    if (drrr.room.roomId) then {
      drrr.dm(drrr.profile.name, "keep");
    }
    else {
      later 5000 keeper(num);
    }
  }
  else {
    going ReloadBot;
  }
}

timer 60000*10 keeper(0);
// Обновление названия румы с отображением текущих животных
titleUpdate = () => {
  let titleName = ["✨"];

  drrr.getLoc(() => {
    drrr.users.forEach((x) => {
      if (x.name !== drrr.profile.name) then {
        if (x.tripcode) then {
          titleName.push(usersDB[x.tripcode].Type);
        }
        else {
          titleName.push(usersDB[x.name].Type);
        }
      }
    });

    drrr.title(titleName.join(""));
  })
}
// Музыка
yt = (req, call) => {
  axios("http://astro-tyan.ejemplo.me/ytsearch?title=" + req)
    .then((res) => {
      if (res.data.searchlist) then {
        for (i = 0; i < Object.keys(res.data.searchlist).length; ++i) {
          ytList[i + 1] = {
            title: res.data.searchlist[i + 1].title,
            time: res.data.searchlist[i + 1].time,
            id: res.data.searchlist[i + 1].id
          }
        }
        call(res.data);
      }
      else {
        call(res.data);
      }
    }).catch((err) => {
      console.log("MUSIC REQUEST ERROR: ", err);
      drrr.print("Произошла ошибка.");
    })
}
// Ранд музыка
ytRand = (call) => {
  axios("http://astro-tyan.ejemplo.me/rand")
    .then((res) => {
      call(res.data);
    }).catch((err) => {
      console.log("MUSIC REQUEST ERROR: ", err);
      drrr.print("Произошла ошибка.");
    })
}
// Длинные сообщения
chunkString = (size, str) => {
  pos = 0;
  chunks = []while pos < str.length {
    len = str.substr(pos, size).lastIndexOf(" ")
      len = (if len > size - 30 then len else size)
      chunks.push(str.substr(pos, len))
      pos += len
  }
  return chunks
}

batch_print = (type, name, msg) => {
  delimiter = ".";
  buffer = "";
  msgs = []
  msg.split(delimiter).forEach(ctx => {
    if ctx.length then
    chunkString(135, ctx + delimiter).forEach(chk => {
      if (buffer.length + chk.length) > 135 then {
        msgs.push(buffer);
        buffer = chk
      }
      else {
        buffer = buffer + chk;
      }
    })
  })
  if (buffer.length) then {
    msgs.push(buffer);
  }

  msgs.reverse();
  if (type === "print") then {
    msgs.forEach(m => drrr.print(m));
  }
  else {
    msgs.forEach(m => drrr.dm(name, m));
  }
}
// Очистка таймеров яйца
clearEgg = (id) => {
  clearInterval(eggId.interval[id]);
  clearTimeout(eggId.timeout[id]);
  delete eggId.interval[id];
  delete eggId.timeout[id];
}
// Время инкубации яйца и превращение в другое животное
eggTrans = (id, name) => {
  eggId.interval[id] = setInterval(() => {
    if (chanceDrop(0.9, 0.1) === 1) then {
      drrr.print("/meПользователь " + name + " оказался мертвым внутри. F");

      usersDB[id] = charZoo["💀"];
      fs.writeFile("./saves/usersDB.json", JSON.stringify(usersDB), () => console.log("Смерть занесена в реестр."));
      titleUpdate();
      clearEgg(id);
    }
}, 60000*60*3);

  eggId.timeout[id] = setTimeout(() => {
    usersDB[id] = charZoo[Object.keys(charZoo)[Math.floor(Math.random() * Object.keys(charZoo).length)]];
    fs.writeFile("./saves/usersDB.json", JSON.stringify(usersDB), () => console.log("Новое животное сохранено."));
    drrr.print("/meСкорлупа сознания трескается... Кто-то обрел себя.");

    drrr.getLoc(() => {
      drrr.users.find((x) => {
        if (x.tripcode === id) then {
          drrr.print("@" + name + ", поздравляю! Твой истинный облик - " + usersDB[id].Name + usersDB[id].Type + "! А может и не поздравляю..");
        }
        else if (x.name === id) then {
          drrr.print("@" + name + ", поздравляю! Твой истинный облик - " + usersDB[id].Name + usersDB[id].Type + "! А может и не поздравляю..");
        }
      });
    })

    titleUpdate();
    clearEgg(id);
  }, 60000*60*24);
}

log2mkd = (type, e, roomLog) => {

  e.user = e.user.replace(reChar, m => chars[m]);
	e.text = e.text.replace(reChar, m => chars[m]);

  if (type === "msg")
    then "*" + e.user + "*" + (if e.trip then ("`#" + e.trip + "`: ") else ": ") + e.text + (if e.url then " [URL](" + e.url + ")" else "");
  else if (type === "me")
    then "Действие | " + "*" + e.user + "*" + (if e.trip then ("`#" + e.trip + "`: _") else ": _") + e.text + "_" + (if e.url then " [URL](" + e.url + ")" else "");
  else if (type === "dm")
    then "ЛС | " + "*" + e.user + "*" + (if e.trip then ("`#" + e.trip + "`: ") else ": ") + e.text + (if e.url then " [URL](" + e.url + ")" else "");
  else if (type === "join")
    then "*" + e.user + "*" + (if e.trip then ("`#" + e.trip + "` в чате.") else " в чате.");
  else if (type === "leave")
    then "*" + e.user + "*" + (if e.trip then ("`#" + e.trip + "` покинул(а) чат.") else " покинул(а) чат.");
  else if (type === "new-host")
    then "*" + e.user + "*" + (if e.trip then ("`#" + e.trip + "` стал(a) новым хостом.") else " стал(a) новым хостом.");
  else if (type === "room-profile")
    then "Название комнаты изменено на *" + roomLog.name + "*.";
  else if (type === "new-description")
    then "Описание комнаты изменено на *" + roomLog.desc + "*.";
  else if (type === "music")
    then ("*" + e.user + "*" + (if e.trip then ("`#" + e.trip + "` поделился музыкой --- " + roomLog.music.name + " [URL](" + roomLog.music.url + ")") else " поделился музыкой --- " + roomLog.music.name + " [URL](" + roomLog.music.url + ")."));

}

sendTg = (token, chat_id, type, e, roomLog) => {
	axios({
		"method": "POST",
		"url": "https://api.telegram.org/bot" + token + "/sendMessage",
		"headers": {
			"dataType": "json",
		},
		"data": {
			"chat_id": chat_id,
			"text": log2mkd(type, e, roomLog),
			"parse_mode": "Markdown",
			"disable_web_page_preview": false,
		}
	}).catch(err => {
		console.log("failed:", err.response.data);
	})
}

bot.start((ctx) => {
    ctx.reply("Бот запущен.");
})

bot.command("dm", ctx => {
  if (JSON.stringify(ctx.message.chat.id).match(tg.chat)) then {
    name = ctx.message.text.substring(ctx.message.text.indexOf("(") + 1, ctx.message.text.indexOf(")"));
    link = ctx.message.text.substring(ctx.message.text.search("http|https"));
    msg = ctx.message.text.substring(ctx.message.text.indexOf(")") + 2);
    console.log(name);

    drrr.dm(name, (if !msg.replace(link, "") then msg else msg.replace(link, "")), (if link.match("http|https") then link else ""));
  }
})

bot.command("kick", ctx => {
  if (JSON.stringify(ctx.message.chat.id).match(tg.chat)) then {
    name = ctx.message.text.substring(ctx.message.text.indexOf("(") + 1, ctx.message.text.indexOf(")"));
    drrr.kick(name);
    ctx.telegram.sendMessage(tg.chat, name + " идет нах.");
  }
})

bot.command("ban", ctx => {
  if (JSON.stringify(ctx.message.chat.id).match(tg.chat)) then {
    name = ctx.message.text.substring(ctx.message.text.indexOf("(") + 1, ctx.message.text.indexOf(")"));
    drrr.ban(name);
    ctx.telegram.sendMessage(tg.chat, name + " идет в далекую писдень.");
  }
})

bot.command("unban", ctx => {
  if (JSON.stringify(ctx.message.chat.id).match(tg.chat)) then {
    name = ctx.message.text.substring(ctx.message.text.indexOf("(") + 1, ctx.message.text.indexOf(")"));
    drrr.unban(name);
    ctx.telegram.sendMessage(tg.chat, name + " оправдан.");
  }
})

bot.on("text", ctx => {
  if (JSON.stringify(ctx.message.chat.id).match(tg.chat)) then {
    link = ctx.message.text.substring(ctx.message.text.search("http|https"));
    msg = ctx.message.text;

    drrr.print((if !msg.replace(link, "") then msg else msg.replace(link, "")), (if link.match("http|https") then link else ""));
  }
})

bot.on("sticker", ctx => {
  if (JSON.stringify(ctx.message.chat.id).match(tg.chat)) then {

    ctx.reply("Отправка...");
    file_id = ctx.message.sticker.file_id;
    ctx.telegram.getFileLink(file_id).then(x => {
      StickCon(x.href, link => {
        if (link !== "error") then {
          drrr.print("Стикер:", link, () => {
            ctx.reply("Стикер отправлен.");
          });
        }
        else ctx.reply("Ошибка отправки.");
      })
    });
  }
})

bot.launch();

state StartBot {
  // Отправка в тг
  event [msg, dm, me, join, leave, new-host, room-profile, new-description, music] (u, m, url, trip, eventObject) => {
    reEv = new RegExp("msg|me|dm", "gi");

    if (u !== drrr.profile.name) then {
      drrr.getRoom(() => {
        roomInf = {
          name: drrr.room.name,
          desc: drrr.room.description,
          music: {
            name: drrr.room.np.name,
            url: drrr.room.np.url
          }
        };

        sendTg(tg.bot, tg.chat, eventObject.type, eventObject, roomInf);
      })
  	}
    else if (!eventObject.type.match(reEv)) then {
      drrr.getRoom(() => {
        roomInf = {
          name: drrr.room.name,
          desc: drrr.room.description,
          music: {
            name: drrr.room.np.name,
            url: drrr.room.np.url
          }
        };

        sendTg(tg.bot, tg.chat, eventObject.type, eventObject, roomInf);
      })
    }
  }
  // Присваивание яичка, отправка в таймер, изменение названия
  event join (u, m, url, trip) => {
    if (u !== drrr.profile.name) then {
      if (trip) then {
        if (!Object.keys(usersDB).includes(trip)) then {
          drrr.print("/meНачался анализ...");
          usersDB[trip] = charZoo["🥚"];
          fs.writeFile("./saves/usersDB.json", JSON.stringify(usersDB), () => console.log("Новый пользователь сохранен."));
          titleUpdate();

          drrr.dm(u, "Твой истинный облик появится через 24 часа, но есть шанс, что у тебя его не будет и ты мертв внутри. Удачи с:");
          eggTrans(trip, u);
        }
        else {
          titleUpdate();
        }
      }
      else {
        if (!Object.keys(usersDB).includes(u)) then {
          drrr.print("/meНачался анализ...");
          usersDB[u] = charZoo["🥚"];
          fs.writeFile("./saves/usersDB.json", JSON.stringify(usersDB), () => console.log("Новый пользователь сохранен."));
          titleUpdate();

          drrr.dm(u, "Твой истинный облик появится через 24 часа, но есть шанс, что у тебя его не будет и ты мертв внутри. Удачи с:");
          eggTrans(u, u);
        }
        else {
          titleUpdate();
        }
      }
    }
  }
// Приветствие
  event join (u, m, url, trip) => {
    if (usersDB[u].Type !== "🥚") then {
      drrr.print("@" + u + ", добро пожаловать " + usersDB[u].Name + usersDB[u].Type + "~");
    }
  }
// help
  event [msg, dm] (u, m: "^!h", url, trip, evObj) => {
    if (evObj.type === "msg") then {
      drrr.print("!y [название] - музыка.\n!list - 5 найденных песен по последнему поиску(!list [цифра] - выбрать из списка).\n!all - все облики.\n!say - сказать за бота.");
    }
    else if (evObj.type === "dm") then {
      drrr.dm(u, "!y [название] - музыка.\n!list - 5 найденных песен по последнему поиску(!list [цифра] - выбрать из списка).\n!all - все облики.\n!say - сказать за бота.");
    }
  }
// Меняем название при выходе
  event [leave, kick, ban] (u) => {
    titleUpdate();
  }
// Музыка
  event [msg, dm] (u, m: "!y") => {
    reY = new RegExp("^!y\\s|\\s!y$", "gi");

    if (m.match(reY)) then {
      yt(m.replace(reY, ""), (y) => {
        drrr.music(y.title, y.link);
      });
    }
  }
// Ранд музыка
  event [msg, dm] (u, m: "^!ry") => {
    ytRand((y) => drrr.music(y.title, y.link));
  }
// Music list
  event [msg, dm] (u, m: "!list", url, trip, evObj) => {
    text = "Список по последнему поиску:";
    num = m.substring(6);

    if (Object.keys(ytList).length) then {
      if (m.match("^!list$")) then {
        for (i = 0; i < Object.keys(ytList).length; ++i) {
          text = text + "\n⤷ " + (i + 1) + ". " + ytList[i + 1].title + " " + ytList[i + 1].time;
        }

        if (evObj.type === "msg") then {
          batch_print("print", u, text);
        }
        else if (evObj.type === "dm") then {
          batch_print("dm", u, text);
        }
      }
      else {
        if (num > Object.keys(ytList).length || num < 1) then {
          if (evObj.type === "msg") then {
            drrr.print("Такого числа нет в списке.");
          }
          else if (evObj.type === "dm") then {
            drrr.dm(u, "Такого числа нет в списке.");
          }
        }
        else {
          yt("https://www.youtube.com/watch?v=" + ytList[num].id, (y) => {
            drrr.music(y.title, y.link);
          });
        }
      }
    }
    else {
      if (evObj.type === "msg") then {
        drrr.print("Список пуст.");
      }
      else if (evObj.type === "dm") then {
        drrr.dm(u, "Список пуст.");
      }
    }
  }
// Говорить за бота
  event [dm] (u, m: "!say") => {
    if (!m.match("leave")) then {
      drrr.print(m.substring(5));
    }
  }
// Вся живность
  event [msg, dm] (u, m: "!all", url, trip, evObj) => {
    let animals = {};
    let text = "Все облики комнаты:";

    Object.values(usersDB).forEach((x) => {
      if (!Object.keys(animals).includes(x.Type)) then {
        animals[x.Type] = {
          name: x.Name,
          count: 1
        }
      }
      else {
        animals[x.Type].count++;
      }
    });

   Object.keys(animals).forEach((x) => {
     text = text + "\n" + x + animals[x].name + " - " + animals[x].count;
   });

   if (evObj.type === "msg") then {
     batch_print("print", u, text);
   }
   else if (evObj.type === "dm") then {
     batch_print("dm", u, text);
   }
 }

  console.log("Бот полностью запущен.");
}

drrr = new Bot(__this__, "Astro", "gg", "en-US", "Tv");

state ReloadBot {
  BotLogin();
}

joinRoom = () => {
  drrr.join(room.id, (x) => {

    if (drrr.room.roomId === room.id) then {
      console.log("Бот присоединился к комнате..");

      if (drrr.room.description !== room.desc) then {
        drrr.descr(room.desc);
        console.log("Описание изменено на - " + room.desc);
        going StartBot;
      }
      else going StartBot;

    }
    else {
console.log(x);
      if (x.error.match("full")) then {
        console.log("Комната переполнена, попытка перезайти...")
        later 5000 BotLogin();
      }
      else if (x.error.match("not found")) then {
        console.log("Комната не найдена, создаем новую...");
        drrr.create("✨", room.desc, "20", "ru-RU", true, false, false, () => {
          console.log("Комната пересоздана..");
          room.id = drrr.room.roomId;
          fs.writeFile("./saves/room.json", JSON.stringify(room), () => {
            console.log("Новый id комнаты сохранен..");
            going StartBot;
          })
        })
      }
    }
  })
}

BotLogin = () => {
  // Логин и вход в руму
  if (drrr.load()) then {
    joinRoom();
  }
  else {
    drrr.login(() => {
      drrr.save();

      if (room.id === false) then {
        drrr.create("✨", room.desc, "20", "ru-RU", true, false, false, () => {
          console.log("Комната создана..");
          room.id = drrr.room.roomId;
          fs.writeFile("./saves/room.json", JSON.stringify(room), () => {
            console.log("Новый id комнаты сохранен..");
            going StartBot;
          })
        })
      }
      else {
        joinRoom();
      }
    })
  }
}

BotLogin();
