catcherZ = "djkfdj4k121";
catcherT = "54dsaj35ja";
tg = JSON.parse(fs.readFileSync("./tg/toks.json", "utf8"));
pred = {};
greet = {};

if !(JSON.parse(fs.readFileSync("./saves/p.json", "utf8"))) then {
  pred = {};
}
else pred = JSON.parse(fs.readFileSync("./saves/p.json", "utf8"));
if (!JSON.parse(fs.readFileSync("./saves/greet.json", "utf8"))) then {
  greet = {};
}
else greet = JSON.parse(fs.readFileSync("./saves/greet.json", "utf8"));

//-------------------ZODIAC-------------------↓

zodSwitch = true;
lucky = {};
zPic = {
  "aries": {
    "Овен:": "https://files.catbox.moe/65uy62.jpg"
  },
  "taurus": {
    "Телец:": "https://files.catbox.moe/flk1l3.jpg"
  },
  "gemini": {
    "Близнецы:": "https://files.catbox.moe/mter93.jpg"
  },
  "cancer": {
    "Рак:": "https://files.catbox.moe/5phxk5.jpg"
  },
  "leo": {
    "Лев:": "https://files.catbox.moe/eoqhur.jpg"
  },
  "virgo": {
    "Дева:": "https://files.catbox.moe/bcq3fd.jpg"
  },
  "libra": {
    "Весы:": "https://files.catbox.moe/ibwkt8.jpg"
  },
  "scorpio": {
    "Скорпион:": "https://files.catbox.moe/ianc31.jpg"
  },
  "sagittarius": {
    "Стрелец:": "https://files.catbox.moe/7fw4ez.jpg"
  },
  "capricorn": {
    "Козерог:": "https://files.catbox.moe/5g9efk.jpg"
  },
  "aquarius": {
    "Водолей:": "https://files.catbox.moe/vt2oq8.jpg"
  },
  "pisces": {
    "Рыбы:": "https://files.catbox.moe/o2ndv0.jpg"
  }
};

rand = (min, max) => {
  Math.floor(Math.random() * (max - min + 1)) + min
}

upZod = () => {
  lucky = {
    "aries": [rand(1, 12), rand(1, 12), rand(0, 11)],
    "taurus": [rand(1, 12), rand(1, 12), rand(0, 11)],
    "gemini": [rand(1, 12), rand(1, 12), rand(0, 11)],
    "cancer": [rand(1, 12), rand(1, 12), rand(0, 11)],
    "leo": [rand(1, 12), rand(1, 12), rand(0, 11)],
    "virgo": [rand(1, 12), rand(1, 12), rand(0, 11)],
    "libra": [rand(1, 12), rand(1, 12), rand(0, 11)],
    "scorpio": [rand(1, 12), rand(1, 12), rand(0, 11)],
    "sagittarius": [rand(1, 12), rand(1, 12), rand(0, 11)],
    "capricorn": [rand(1, 12), rand(1, 12), rand(0, 11)],
    "aquarius": [rand(1, 12), rand(1, 12), rand(0, 11)],
    "pisces": [rand(1, 12), rand(1, 12), rand(0, 11)]
  }
}

if (!JSON.parse(fs.readFileSync("./saves/zod.json", "utf8"))) then {
  upZod();
  later 2000 fs.writeFile("./saves/zod.json", JSON.stringify(lucky), () => {
    console.log("Зодиак записан.");
  });
}
else lucky = JSON.parse(fs.readFileSync("./saves/zod.json", "utf8"));

//-------------------ZODIAC-------------------↑

//-------------------TARO-------------------↓

taroSwitch = true;
Taro = {};
names = [];
Cards = {
  shut: ["https://files.catbox.moe/0tpo8p.png", "Шут"],
  mag: ["https://files.catbox.moe/0owgi6.png", "Маг"],
  "verhovaya-zhrica": ["https://files.catbox.moe/yq6t64.png", "Верховная жрица"],
  imperatrica: ["https://files.catbox.moe/ub8z21.png", "Императрица"],
  imperator: ["https://files.catbox.moe/qaz8sb.png", "Император"],
  "verhovnyi-zhrec": ["https://files.catbox.moe/waykmr.png", "Верховный жрец"],
  vlublennye: ["https://files.catbox.moe/v1eqrx.png", "Влюбленные"],
  kolesnica: ["https://files.catbox.moe/mgrz79.png", "Колесница"],
  sila: ["https://files.catbox.moe/35fu2b.png", "Равновесие"],
  otshelnik: ["https://files.catbox.moe/i8efz1.png", "Отшельник"],
  "koleso-fortuny": ["https://files.catbox.moe/sjh90u.png", "Фортуна"],
  spravedlivost: ["https://files.catbox.moe/fu0zv1.png", "Вожделение"],
  poveshennyi: ["https://files.catbox.moe/hhpjaf.png", "Повешенный"],
  smert: ["https://files.catbox.moe/yrtwdx.png", "Смерть"],
  umerennost: ["https://files.catbox.moe/bhmqq3.png", "Искусство"],
  diyavol: ["https://files.catbox.moe/xg76sl.png", "Дьявол"],
  "padayushaya-bashnya": ["https://files.catbox.moe/bwhov6.png", "Война"],
  zvezda: ["https://files.catbox.moe/giou74.png", "Звезда"],
  luna: ["https://files.catbox.moe/y5z0ua.png", "Луна"],
  solnce: ["https://files.catbox.moe/2f2ud7.png", "Солнце"],
  "strashnyi-sud": ["https://files.catbox.moe/aza9kv.png", "Эон"],
  mir: ["https://files.catbox.moe/qydfft.png", "Вселенная"]
};

tarFunc = (name) => {
  a.print("@" + name + " подумай о человеке, о котором хочешь узнать, поделись своей энергией с бот-чан.~ И вернемся через минуту.");
  later 60000 {
    a.print("/meИтадакимас..~ Съела всю приготовленную для гадания энергию.");
    later 5000 a.print("Кхм-кхм.. Так о чем мы, будет 3 карты:\n1. Мысли\n2. Эмоции\n3. Подсознательное");
    later 10000 a.print("/meПеремешивает и выкладывает 3 карты на стол...");
    later 17000 a.print("Первая карта, карта мыслей...");
    later 20000 a.print("/meПереворачивает первую карту...");
    later 26000 {
      batch_print(Taro["Мысли"][1], Taro["Мысли"][0]);
      later 27000 a.print("Вторая карта, карта эмоций...");
      later 30000 {
        a.print("/meПереворачивает вторую карту...");
        later 6000 batch_print(Taro["Эмоции"][1], Taro["Эмоции"][0]);
        later 33000 a.print("Третья карта, карта подсознательного...");
        later 36000 {
          a.print("/meПереворачивает третью карту...");
          later 6000 {
            batch_print(Taro["Подсознательное"][1], Taro["Подсознательное"][0]);
            later 5000 catcherT = Cards[Taro["Подсознательное"][0]][1];
          }
        }
      }
    }
  }
}

//-------------------TARO-------------------↑

//-------------------YOUTUBE-------------------↓
ytList = {};
ytText = "";

listText = (num) => {
  if (num < Object.keys(ytList).length) then {
    num++;
    ytText = ytText + "\n⤷" + num + ": " + ytList[num][0] + " - " + ytList[num][1];
    listText(num);
  }
  else return ytText;
}

ytLink = (id, call) => {

  axios("https://api.allorigins.win/raw?url=https://youtube.michaelbelgium.me/api/converter/convert?api_token=E67btg2VDpEWax1HhwXJmfTH51bKM4PKESfnncSIJcQOzsyIqixkjURVgykf&url=https://www.youtube.com/watch?v=" + id)
    .then(resp => {

      call(resp);

    }).catch( err => {
      console.log(err.response.status + " - " + err.response.statusText);
      a.print("Запрос не прошел, повторите еще раз.");
      call("no");
    })
}

ythuyut = (resp) => {
  if (resp !== "no") then {
    if (resp.data.error == true) then {
      a.print("Длина трека больше 5 минут, выберите в !list другой или же просто добавьте по ссылке - !у 'ссылка'.");
    }
    else a.music(resp.data.title, resp.data.file);
  }
}

//-------------------YOUTUBE-------------------↑



//-------------------LONGMSG-------------------↓

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

batch_print = (msg, type, call) => {
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

  if (!type.match("music|aries|taurus|gemini|cancer|leo|virgo|libra|scorpio|sagittarius|capricorn|aquarius|pisces")) then {
    msgs.reverse();
    msgs.forEach(m => a.print(m));
    a.print(Cards[type][1] + ":", Cards[type][0]);
  }
  else if (type !== "music") then {
    a.print("Оценка:\n" + "⤷Бизнес: " + lucky[type][0] + "\n⤷Любовь: " + lucky[type][1] + "\n⤷Число дня: " + lucky[type][2]);
    msgs.reverse();
    msgs.forEach(m => a.print(m));
    a.print(Object.keys(zPic[type])[0], Object.values(zPic[type])[0]);
    call();
  }
  else {
    msgs.reverse();
    msgs.forEach(m => a.print(m));
    call();
  }
}

batch_dm = (name, msg) => {
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
  msgs.forEach(m => a.dm(name, m));
}

//-------------------LONGMSG-------------------↑

state restartBot {
  BotLogin();
}

state beginBot {
//-------------------TIMERS-------------------↓

  time = (type) => {
    date = new Date();
    return date[type]();
  }

  timer 60000 * 60 {
    if (time("getHours") == 21) then {
      upZod();
      names = [];
      fs.writeFile("./saves/zod.json", JSON.stringify(lucky), () => {
        console.log("Перезапись ЗЗ");
      });
    }
  }

  checkRoom = (num) => {
    if (num !== 3) then {
      if (a.room.roomId !== roomchik) then {
        later 5000 checkRoom(num++);
      }
      else a.dm(a.profile.name, ".");
    }
    else going restartBot;
  }

  timer 60000 * 10 {
    a.getLoc(() => {
      checkRoom(0);
    })
  }

//-------------------TIMERS-------------------↑

//-------------------EVENTS-------------------↓

//-------------------TELEGRAM-------------------↓
  const tgBot = new Telegraf(tg.botTok);
  const tgChannel = new Telegraf(tg.channelTok);
  regID = new RegExp("" + tg.chatTok.join("|"), "gi");
  chars = {
    "_": "\\_",
    "*": "\\*",
    "[": "\\[",
    "`": "\\`"
  };
  reChar = new RegExp("_|\\*|\\[|`", "gi");
  event [dm] (u, m: "^!v", url) => {
    if (m === "!v") then {
      batch_dm(u, "Пример: !v (о ком хотите что-то рассказать) сообщение. В скобках ник, кличка, паспорт, что хотите в общем связанное с кем либо, после сообщение через пробел. Скобки обязательны.\n!box(можно не в ЛС) - посмотреть, что наотправляли в коробку и как вообще это выглядит.");
    }
    else if (m.match("\\(")) then {

      msg = m.substring(3);
      msg = msg.replace(reChar, m => chars[m]);

      later 60000*rand(1, 17) tgChannel.telegram.sendMessage("-1001358047219", "*О ком:* " + msg.substring(msg.indexOf("(") + 1, msg.indexOf(")")) + "\n*⤷ Сплетня:*" + msg.substring(msg.indexOf(") ") + 1) + (if url then " [URL](" + url + ")" else ""), { parse_mode: "Markdown" });
      a.dm(u, "Что бы это ни было, оно сохранено.");
    }
  }

  event [dm, msg] (u, m: "!greet", url, trip) => {
    msg = m.substring(7);
    nt = msg.substring(msg.indexOf("(") + 1, msg.indexOf(")"));
    ntRe = nt.replace(reChar, m => chars[m]);

    if (m.match("-h")) then {
      batch_dm(u, "Добавляет приветствие для себя или же для кого другого, флаг вам в руки как говорится. Пример: !greet (ник или #трип, трип всегда с решеткой) добро пожаловать. Вывод: @ник, добро пожаловать. Скобочки обязательны и можно с пикчей, если хочется.");
    }
    else if (m.match("\\(")) then {
      if (!Object.keys(greet).includes(nt)) then {
        if (url) then {
          greet[nt] = {
            text: msg.substring(msg.indexOf(")") + 2),
            url: url
          };
          fs.writeFile("./saves/greet.json", JSON.stringify(greet), () => {
            console.log("Приветствие сохранено.");
          });
          a.dm(u, "Приветствие сохранено.");
          tgChannel.telegram.sendMessage("-1001358047219", "Приветствие для - *" + ntRe + "*, сохранено.", { parse_mode: "Markdown" });
        }
        else {
          greet[nt] = {
            text: msg.substring(msg.indexOf(")") + 2)
          };
          fs.writeFile("./saves/greet.json", JSON.stringify(greet), () => {
            console.log("Приветствие сохранено.");
          });
          a.dm(u, "Приветствие сохранено.");
          tgChannel.telegram.sendMessage("-1001358047219", "Приветствие для - *" + ntRe + "*, сохранено.", { parse_mode: "Markdown" });
        }
      }
		  else {
        if (url) then {
          greet[nt] = {
            text: msg.substring(msg.indexOf(")") + 2),
            url: url
          };
          fs.writeFile("./saves/greet.json", JSON.stringify(greet), () => {
            console.log("Приветствие перезаписано.");
          });
          a.dm(u, "Приветствие перезаписано.");
          tgChannel.telegram.sendMessage("-1001358047219", "Приветствие для - *" + ntRe + "*, перезаписано.", { parse_mode: "Markdown" });
        }
        else {
          greet[nt] = {
            text: msg.substring(msg.indexOf(")") + 2)
          };
          fs.writeFile("./saves/greet.json", JSON.stringify(greet), () => {
            console.log("Приветствие перезаписано.");
          });
          a.dm(u, "Приветствие перезаписано.");
          tgChannel.telegram.sendMessage("-1001358047219", "Приветствие для - *" + ntRe + "*, перезаписано.", { parse_mode: "Markdown" });
        }
      }
    }
  }

  tgBot.start(ctx => ctx.reply("Добро пожаловать c:"));

  tgBot.command("dm", ctx => {
    mTgText = ctx.message.text.substring(ctx.message.text.indexOf(" ", ctx.message.text.indexOf(" ") + 1));
    mTgName = ctx.message.text.substring(ctx.message.text.indexOf(" ") + 1, ctx.message.text.indexOf(" ", ctx.message.text.indexOf(" ") + 1));
    mTgLink = ctx.message.text.substring(ctx.message.text.search("http|https"));
    if (JSON.stringify(ctx.message.chat.id).match(regID)) then {
      a.dm(mTgName, mTgText.replace(mTgLink, ""), (if mTgLink.match("http|https") then mTgLink else ""))
    }
  });

  tgBot.command("kick", ctx => {
    mTg = ctx.message.text.replace("/kick ", "");
    if (JSON.stringify(ctx.message.chat.id).match(regID)) then {
      a.kick(mTg);
      tg.chatTok.forEach(id => ctx.telegram.sendMessage(id, mTg + " идет нах."));
    }
  });

  tgBot.command("ban", ctx => {
    mTg = ctx.message.text.replace("/ban ", "");
    if (JSON.stringify(ctx.message.chat.id).match(regID)) then {
      a.ban(mTg);
      tg.chatTok.forEach(id => ctx.telegram.sendMessage(id, mTg + " идет в далекую писдень."));
    }
  });

  tgBot.command("unban", ctx => {
    mTg = ctx.message.text.replace("/unban ", "");
    if (JSON.stringify(ctx.message.chat.id).match(regID)) then {
      a.unban(mTg);
      tg.chatTok.forEach(id => ctx.telegram.sendMessage(id, mTg + " оправдан."));
    }
  });

  tgBot.on("text", ctx => {
    mTgLink = ctx.message.text.substring(ctx.message.text.search("http|https"));
    mTg = ctx.message.text;
    if (JSON.stringify(ctx.message.chat.id).match(regID)) then {
      rep = {};
      rep[tg.chatTok[0]] = "Каору:\n⤷";
      rep[tg.chatTok[1]] = "Кроль:\n⤷";

      ctx.telegram.sendMessage((if ctx.message.chat.id == tg.chatTok[0] then tg.chatTok[1] else tg.chatTok[0]), rep[JSON.stringify(ctx.message.chat.id)] + " " + mTg + (if mTgLink.match("http|https") then " [URL](" + mTgLink + ")" else ""));
      a.print((if !mTg.replace(mTgLink, "") then mTg else mTg.replace(mTgLink, "")), (if mTgLink.match("http|https") then mTgLink else ""));
    }
  });

  tgBot.on("sticker", ctx => {
    if (JSON.stringify(ctx.message.chat.id).match(regID)) then {
      rep = {};
      rep[tg.chatTok[0]] = "Каору:";
      rep[tg.chatTok[1]] = "Кроль:";

      ctx.reply("Отправка...");
      file_id = ctx.message.sticker.file_id;
      ctx.telegram.getFileLink(file_id).then(x => {
        StickCon(x.href, link => {
          if (link !== "error") then {
            a.print("Стикер:", link, () => {
              ctx.reply("Стикер отправлен.");
              ctx.telegram.sendMessage((if ctx.message.chat.id == tg.chatTok[0] then tg.chatTok[1] else tg.chatTok[0]), rep[JSON.stringify(ctx.message.chat.id)]);
              ctx.telegram.sendSticker((if ctx.message.chat.id == tg.chatTok[0] then tg.chatTok[1] else tg.chatTok[0]), file_id);
            });
          }
          else ctx.reply("Ошибка отправки.");
        })
      });
    }
  });

  tgBot.launch();
  tgChannel.launch();

//-------------------TELEGRAM-------------------↑

  event [msg, dm] (u, m: "^!h") => {
    batch_dm(u, "Команды:\n⤷!zod 'знак' - гороскоп по зодиаку.\n⤷!у 'исполнитель - название' - музыкa с ютуба.\n⤷!list - 5 найденных песен по результатам последнего поиска.\n⤷!taro - узнать о мыслях и эмоциях человека по отношению к вам.\n⤷!say(в ЛС) - C:\n⤷!v(в ЛС) - сплетница.\n⤷!greet - приветствия, подробнее !greet -h.\n⤷!p 'сообщение' - предложка своих идей.\n⤷!upd - последнее обновление.");
  }

  event [msg, dm] (u, m: "^!upd") => {
    a.print("v2.4\n⤷Добавлены приветствия, подробнее !greet -h.");
  }

  event [dm, msg] (u, m: "^!box") => {
    a.print("Ссылка на письмена:", "https://t.me/joinchat/Mqu-vA03JMoxODNi");
  }

  event [dm] (u, m: "^!p") => {
    if (Object.keys(pred).includes(u)) then {
      pred[u].push(m.substring(3));
      fs.writeFile("./saves/p.json", JSON.stringify(pred), () => {
        console.log("+1 предложение.".green);
        a.dm(u, "+1 к вашим сообщениям.");
      });
    }
    else {
      pred[u] = [m.substring(3)];
      fs.writeFile("./saves/p.json", JSON.stringify(pred), () => {
        console.log("+1 предложение.".green);
        a.dm(u, "Ваше сообщение сохранено.");
      });
    }
  }

  event [msg, me] (u, m: "!y") => {
    ytText = "";

    reLink = new RegExp("\\?v=|be/", "gi");
    reY = new RegExp("!y\\s|\\s!y", "gi");

    if (m.match(reLink)) then {
      mes = m.substring(m.search(reLink) + 3);
      if (mes.match(" ")) then {
        mes = mes.substring(0, mes.search(" "));
        ytLink(mes, data => {
          ythuyut(data);
        });
      }
      else {
        ytLink(mes, data => {
          ythuyut(data);
        });
      }
    }
    else if (m.match(reY)) then {
      ytSearch(m.replace(reY, ""), ylist =>  {
        ytList = ylist;
        ytLink(ytList[1][2], data => {
          ythuyut(data);
        });
      });
    }
  }

  event [msg, me] (u, m: "^!list") => {
    num = m.substring(6);
    if (m.match("^!list$")) then {
      batch_print("Пять песен по результатам последнего поиска:" + (if ytText.length > 0 then { return ytText } else { listText(0) }) + ".\n\nЧтобы выбрать одну из них, введите: !list 'номер'", "music");
    }
    else if (num < 1 || num > 5) then {
      a.print("Такого числа нет в списке.");
    }
    else if (num.match("^\\d$")) then {
      ytLink(ytList[m.substring(6)][2], resp => {
        ythuyut(resp);
      });
    }
  }

  event msg (u, m: "^!zod") => {

    if zodSwitch == true then {
      zodSwitch = false;
      taroSwitch = false;

      if (m.match("[Рр][Ыы][Бб][Ыы]|[Pp][Ii][Ss][Cc][Ee][Ss]")) then {
        zodiac("pisces", x => batch_print(x, "pisces", () => {
          catcherZ = "Рыбы:";
        }));
      }
      else if (m.match("[Оо][Вв][Ее][Нн]|[Aa][Rr][Ii][Ee][Ss]")) then {
        zodiac("aries", x => batch_print(x, "aries", () => {
          catcherZ = "Овен:";
        }));
      }
      else if (m.match("[Тт][Ее][Лл][Ее][Цц]|[Tt][Aa][Uu][Rr][Uu][Ss]")) then {
        zodiac("taurus", x => batch_print(x, "taurus", () => {
          catcherZ = "Телец:";
        }));
      }
      else if (m.match("[Бб][Лл][Ии][Зз][Нн][Ее][Цц][Ыы]|[Gg][Ee][Mm][Ii][Nn][Ii]")) then {
        zodiac("gemini", x => batch_print(x, "gemini", () => {
          catcherZ = "Близнецы:";
        }));
      }
      else if (m.match("[Рр][Аа][Кк]|[Cc][Aa][Nn][Cc][Ee][Rr]")) then {
        zodiac("cancer", x => batch_print(x, "cancer", () => {
          catcherZ = "Рак:";
        }));
      }
      else if (m.match("[Лл][Ее][Вв]|[Ll][Ee][Oo]")) then {
        zodiac("leo", x => batch_print(x, "leo", () => {
          catcherZ = "Лев:";
        }));
      }
      else if (m.match("[Дд][Ее][Вв][Аа]|[Vv][Ii][Rr][Gg][Oo]")) then {
        zodiac("virgo", x => batch_print(x, "virgo", () => {
          catcherZ = "Дева:";
        }));
      }
      else if (m.match("[Вв][Ее][Сс][Ыы]|[Ll][Ii][Bb][Rr][Aa]")) then {
        zodiac("libra", x => batch_print(x, "libra", () => {
          catcherZ = "Весы:";
        }));
      }
      else if (m.match("[Сс][Кк][Оо][Рр][Пп][Ии][Оо][Нн]|[Ss][Cc][Oo][Rr][Pp][Ii][Oo]")) then {
        zodiac("scorpio", x => batch_print(x, "scorpio", () => {
          catcherZ = "Скорпион:";
        }));
      }
      else if (m.match("[Сс][Тт][Рр][Ее][Лл][Ее][Цц]|[Ss][Aa][Gg][Ii][Tt][Tt][Aa][Rr][Ii][Uu][Ss]")) then {
        zodiac("sagittarius", x => batch_print(x, "sagittarius", () => {
          catcherZ = "Стрелец:";
        }));
      }
      else if (m.match("[Кк][Оо][Зз][Ее][Рр][Оо][Гг]|[Cc][Aa][Pp][Rr][Ii][Cc][Oo][Rr][Nn]")) then {
        zodiac("capricorn", x => batch_print(x, "capricorn", () => {
          catcherZ = "Козерог:";
        }));
      }
      else if (m.match("[Вв][Оо][Дд][Оо][Лл][Ее][Йй]|[Aa][Qq][Uu][Aa][Rr][Ii][Uu][Ss]")) then {
        zodiac("aquarius", x => batch_print(x, "aquarius", () => {
          catcherZ = "Водолей:";
        }));
      }
      else {
        zodSwitch = true;
        taroSwitch = true;
      }
    }
  }

  event msg (u, m: "^!taro") => {

    if (taroSwitch == true) then {
      zodSwitch = false;
      taroSwitch = false;

      a.getLoc(() => {
        user = a.users.find(
          user => user.name === u)

        if (user.tripcode) then {
          if (names.includes(user.tripcode)) then {
            a.print("@" + u + " ты сегодня уже гадал(a), хватит с тебя.");
            zodSwitch = true;
            taroSwitch = true;
          }
          else {
            names.push(user.tripcode);
            taro(x => Taro = x);
            tarFunc(u);
          }
        }
        else if (names.includes(u)) then {
          a.print("@" + u + " ты сегодня уже гадал(a), хватит с тебя.");
          zodSwitch = true;
          taroSwitch = true;
        }
        else {
          names.push(u);
          taro(x => Taro = x);
          tarFunc(u);
        }
      })
    }
  }

  event dm (u, m: "^!say") => {
    if (!m.match("/leave")) then {
      a.print(m.substring(5));
    }
  }

  event join (u, m, url, trip) => {
    if (trip === "Leu5XTRpi6") then {
      a.handOver(u);
    }
    else if (trip) then {
      Object.keys(greet).find(name => {
        if (name === ("#" + trip)) then {
          a.print("@" + u + ", " + greet["#" + trip].text, (if greet["#" + trip].url then greet["#" + trip].url else ""));
        }
      });
    }
    else {
      Object.keys(greet).find(name => {
        if (name === (u)) then {
          a.print("@" + u + ", " + greet[u].text, (if greet[u].url then greet[u].url else ""));
        }
      });
    }
  }

//-------------------LOGS-------------------↓

  log2mkd = (type, e) => {

    e.user = e.user.replace(reChar, m => chars[m]);
    e.text = e.text.replace(reChar, m => chars[m]);

    if (type === "msg")
      then "*" + e.user + "*" + (if e.trip then ("`#" + e.trip + "`: ") else ": ") + e.text + (if e.url then " [URL](" + e.url + ")" else "");
    else if (type === "me")
      then "Действие | " + "*" + e.user + "*" + (if e.trip then ("`#" + e.trip + "`: _") else ": _") + e.text + "_" + (if e.url then " [URL](" + e.url + ")" else "");
    else if (type === "dm")
      then "ЛС | " + "*" + e.user + "*" + (if e.trip then ("`#" + e.trip + "`: ") else ": ") + e.text + (if e.url then " [URL](" + e.url + ")" else "");
    else if (type === "join")
      then e.user + (if e.trip then ("`#" + e.trip + "` в чате.") else " в чате.");
    else if (type === "leave")
      then e.user + (if e.trip then ("`#" + e.trip + "` покинул(а) чат.") else " покинул(а) чат.");
  }

  sendTg = (token, chat_id, type, e) => {

    if (e.text.match("^!v")) then {
      axios({
        "method": "POST",
        "url": "https://api.telegram.org/bot" + token + "/sendMessage",
        "headers": {
          "dataType": "json",
        },
        "data": {
          "chat_id": chat_id[0],
          "text": log2mkd(type, e),
          "parse_mode": "Markdown",
          "disable_web_page_preview": false,
        }
      }).catch(err => {
        console.log("failed:", err.response.data);
      });
    }
    else {
      chat_id.forEach(chat_ID => {
        axios({
          "method": "POST",
          "url": "https://api.telegram.org/bot" + token + "/sendMessage",
          "headers": {
            "dataType": "json",
          },
          "data": {
            "chat_id": chat_ID,
            "text": log2mkd(type, e),
            "parse_mode": "Markdown",
            "disable_web_page_preview": false,
          }
        }).catch(err => {
          console.log("failed:", err.response.data);
        });
      })
    }
  }

  event [msg, dm, me, join, leave] (u, m, url, trip, eventObject) => {
    if (u !== a.profile.name) then {
      sendTg(tg.botTok, tg.chatTok, eventObject.type, eventObject);

      if (eventObject.type === "msg") then console.log(u.cyan + ": ".yellow + m.yellow);
      else if (eventObject.type === "dm") then console.log("ЛС(".yellow + u.cyan + "): ".yellow + m.yellow);
      else if (eventObject.type === "me") then console.log("Действие(".yellow + u.cyan + "): ".yellow + m.yellow);
      else if (eventObject.type === "join") then console.log("\" ".underline.gray + u.underline.gray + " \" в чате.".underline.gray);
      else if (eventObject.type === "leave") then console.log("\" ".underline.gray + u.underline.gray + " \" покинул(а) чат.".underline.gray);
    }
    else {
      if (m.match(catcherZ)) then {
        zodSwitch = true;
        taroSwitch = true;
      }
      else if (m.match(catcherT)) then {
        taroSwitch = true;
        zodSwitch = true;
      }
    }
  }
//-------------------LOGS-------------------↑

}


//-------------------EVENTS-------------------↑

BotLogin = () => {

  if (a.load()) then {
    a.join(roomchik, () => {
      a.getLoc(() => {
        if (a.room.roomId == roomchik) then {
          console.log("bot loaded");
          if (a.room.description !== "night | !h - инфа по командам | !greet -h v2.4") then {
            a.descr("night | !h - инфа по командам | !greet -h v2.4");
            going beginBot;
          }
          else going beginBot;
        }
        else later 5000 BotLogin();
      })
    })
  }
  else {
    a.login(() => {
      a.save();
      a.join(roomchik, () => {
        console.log("bot joined");
        going beginBot;
      })
    })
  }
}

a = new Bot(__this__, "Астролог", "gg", "ru-RU", "Tv")

roomchik = "2jNEBMDj3E";

BotLogin();
