catcherZ = "djkfdj4k121";
catcherT = "54dsaj35ja";

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

if lucky.length < 1 then {
  upZod();
}

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
ytSwitch = true;
ytList = {};
ytText = "";
ytQText = "";
ytQueue = {
	"on": [],
	"title": [],
	"time": [],
	"name": [],
	"link": []
};

queue = (num) => {
	console.log(ytQueue.title.length);
	if ytQueue.title.length >= 2 then {
		
		if num < (ytQueue.title.length - 1) then {
			num++;
			ytQText = ytQText + ("\n⤷" + num + ". " + ytQueue.title[num] + " - добавил " + ytQueue.name[num]);
			queue(num);
		}
		else return ytQText;
	}
}

listText = (num) => {
	if num < Object.keys(ytList).length then {
		num++;
	  ytText = ytText + "\n⤷" + num + ": " + ytList[num][0] + " - " + ytList[num][1];
		listText(num);
	}
	else return ytText;
}

ytLink = (id, call) => {
	
	axios("https://api.allorigins.win/raw?url=http://michaelbelgium.me/ytconverter/convert.php?youtubelink=https://www.youtube.com/watch?v=" + id)
	  .then(resp => {
			data = resp.data;
			
			if data.error !== true then {
			  call(data.file);
			}
			else {
				if data.error.match("duration") then {
				  console.log(data.error);
				  call("Длина трека больше 5 минут, выберите в !list другой или же просто добавьте по ссылке - !у 'ссылка'.");
				}
				else {
					console.log(data.error);
					call("Ошибка.");
				}
			}
		}).catch( err => {
			ytSwitch = true;
			console.log(err.response.status + " - " + err.response.statusText);
			a.print("Запрос не прошел, повторите еще раз.");
		})
}

//-------------------YOUTUBE-------------------↑

//-------------------LONGMSG-------------------↓

chunkString = (size, str) => {
  pos = 0;
  chunks = []while pos < str.length {
    len = str.substr(pos, size).lastIndexOf(" ")
      len = (if len > size - 30 then len else
          size)
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
      if (buffer.length + chk.length)
         > 135
        then {
          msgs.push(buffer);
          buffer = chk
        }
      else {
        buffer = buffer + chk;
      }
    })
  })
  if (buffer.length)
    then msgs.push(buffer);

  if !type.match("music|aries|taurus|gemini|cancer|leo|virgo|libra|scorpio|sagittarius|capricorn|aquarius|pisces") then {
    msgs.reverse();
    msgs.forEach(m => a.print(m));
    a.print(Cards[type][1] + ":", Cards[type][0]);
  }
  else if type !== "music" then {
    a.print("Оценка:\n" + "⤷Бизнес: " + lucky[type][0] + "\n⤷Любовь: " + lucky[type][1] + "\n⤷Число дня: " + lucky[type][2]);
    msgs.reverse();
    msgs.forEach(m => a.print(m));
    a.print(Object.keys(zPic[type])[0], Object.values(zPic[type])[0]);
    call();
  }
  else {
    msgs.reverse();
    msgs.forEach(m => a.print(m));
  }
}

batch_dm = (name, msg) => {
  delimiter = ".";
  buffer = "";
  msgs = []
  msg.split(delimiter).forEach(ctx => {
    if ctx.length then
    chunkString(135, ctx + delimiter).forEach(chk => {
      if (buffer.length + chk.length)
         > 135
        then {
          msgs.push(buffer);
          buffer = chk
        }
      else {
        buffer = buffer + chk;
      }
    })
  })
  if (buffer.length)
    then msgs.push(buffer);

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
  if time("getHours") == 21 then {
    upZod();
    names = [];
  }
}

timer 3000 {
	if Object.values(ytQueue.on).length then {
	  if ytQueue.on[0] == false then {
		  ytQueue.on[0] = true;
			a.music(ytQueue.title[0], ytQueue.link[0], () => {
				later ytQueue.time[0] {
			    ytQueue.on.splice(0,1);
				  ytQueue.title.splice(0,1);
				  ytQueue.time.splice(0,1);
				  ytQueue.name.splice(0,1);
				  ytQueue.link.splice(0,1);
		    }
			});
	  }
  }
}

timer 60000 * 15 {
	a.getLoc(() => {
		if a.room.roomId == roomchik then
		  a.dm(a.profile.name, ".");
		else going restartBot;
	});
}

//-------------------TIMERS-------------------↑

//-------------------EVENTS-------------------↓

event [msg, dm] (u, m: "^!h") => {
  batch_dm(u, "Команды:\n⤷!zod 'знак' - гороскоп по зодиаку.\n⤷!у 'исполнитель - название' - музыкa с ютуба.\n⤷!q - список треков в очереди.\n⤷!next - пропустить текущую песню и поставить следующую(работает только у того, кто ставил текущий трек).\n⤷!list - 5 найденных песен по результатам последнего поиска.\n⤷!taro - узнать о мыслях и эмоциях человека по отношению к вам.\n⤷!say - C:\n⤷!upd - последнее обновление.");
}

event [msg, dm] (u, m: "^!upd") => {
	a.print("v1.9\n⤷Добавлена очередь в музыке и пропуск (пропускать может только тот, кто заказал).");
}

event [msg, me] (u, m: "!y") => {
	if ytSwitch == true then {
		ytText = "";
		ytSwitch = false;
		
	  reY = new RegExp("!y\\s|\\s!y", "gi");
	  if m.match(reY) then {
      ytSearch(m.replace(reY, ""), ylist =>  {
			  ytList = ylist;
			  ytLink(ytList[1][2], data => {
				  if data.match("^Длина") then
				    a.print(data, "", () => {
							ytSwitch = true;
						});
				  else if !ytQueue.title.length then {
						ytQueue.on.push(false);
				    ytQueue.title.push(ytList[1][0]);
				    ytQueue.time.push(((ytList[1][1].substring(0, 1) * 60) * 1000) + (ytList[1][1].substring(2) * 1000));
				    ytQueue.name.push(u);
				    ytQueue.link.push(data);
						ytSwitch = true
				  }
					else if ytQueue.title.length < 6 then {
						ytQueue.on.push(false);
				    ytQueue.title.push(ytList[1][0]);
				    ytQueue.time.push(((ytList[1][1].substring(0, 1) * 60) * 1000) + (ytList[1][1].substring(2) * 1000));
				    ytQueue.name.push(u);
				    ytQueue.link.push(data);
						a.print(ytList[1][0] + " - добавлен в очередь");
						ytSwitch = true
					}
					else a.print("Максимум 5 треков в очереди, текущие количество - !q.");
			  });
		  });
    }
	}
}

event [msg, me] (u, m: "^!q") => {
	ytQText = "";
	batch_print((if ytQueue.title.length > 1 then { return "В очереди:" + queue(0); } else { return "В очереди ничего нет." }), "music");
}

event [msg, me] (u, m: "^!next") => {
	if u === ytQueue.name[0] then {
		ytQueue.on.splice(0,1);
		ytQueue.title.splice(0,1);
		ytQueue.time.splice(0,1);
		ytQueue.name.splice(0,1);
		ytQueue.link.splice(0,1);
	}
}

event [msg, me] (u, m: "^!list") => {
  num = m.substring(6);
  if m.match("^!list$") then
    batch_print("Пять песен по результатам последнего поиска:" + (if ytText.length > 0 then { return ytText } else { listText(0) }) + ".\n\nЧтобы выбрать одну из них, введите: !list 'номер'", "music");
  else if (num < 1 || num > 5) then
    a.print("Такого числа нет в списке.");
  else if num.match("^\\d$") then {
    ytLink(ytList[m.substring(6)][2], data => {
			if data.match("^Длина") then
				  a.print(data);
			else if ytQueue.title.length !== 6 then {
				ytQueue.on.push(false);
				ytQueue.title.push(ytList[m.substring(6)][0]);
				ytQueue.time.push(((ytList[m.substring(6)][1].substring(0, 1) * 60) * 1000) + (ytList[m.substring(6)][1].substring(2) * 1000));
				ytQueue.name.push(u);
				ytQueue.link.push(data);
			}
			else a.print("Максимум 5 треков в очереди, текущие количество - !q.");
    });
  }
}

event msg (u, m: "^!zod") => {
	
  if zodSwitch == true then {
    zodSwitch = false;
    taroSwitch = false;

    if m.match("[Рр][Ыы][Бб][Ыы]|[Pp][Ii][Ss][Cc][Ee][Ss]") then
    zodiac("pisces", x => batch_print(x, "pisces", () => {
        catcherZ = "Рыбы:";
      }));
    else if m.match("[Оо][Вв][Ее][Нн]|[Aa][Rr][Ii][Ee][Ss]") then
    zodiac("aries", x => batch_print(x, "aries", () => {
        catcherZ = "Овен:";
      }));
    else if m.match("[Тт][Ее][Лл][Ее][Цц]|[Tt][Aa][Uu][Rr][Uu][Ss]") then
    zodiac("taurus", x => batch_print(x, "taurus", () => {
        catcherZ = "Телец:";
      }));
    else if m.match("[Бб][Лл][Ии][Зз][Нн][Ее][Цц][Ыы]|[Gg][Ee][Mm][Ii][Nn][Ii]") then
    zodiac("gemini", x => batch_print(x, "gemini", () => {
        catcherZ = "Близнецы:";
      }));
    else if m.match("[Рр][Аа][Кк]|[Cc][Aa][Nn][Cc][Ee][Rr]") then
    zodiac("cancer", x => batch_print(x, "cancer", () => {
        catcherZ = "Рак:";
      }));
    else if m.match("[Лл][Ее][Вв]|[Ll][Ee][Oo]") then
    zodiac("leo", x => batch_print(x, "leo", () => {
        catcherZ = "Лев:";
      }));
    else if m.match("[Дд][Ее][Вв][Аа]|[Vv][Ii][Rr][Gg][Oo]") then
    zodiac("virgo", x => batch_print(x, "virgo", () => {
        catcherZ = "Дева:";
      }));
    else if m.match("[Вв][Ее][Сс][Ыы]|[Ll][Ii][Bb][Rr][Aa]") then
    zodiac("libra", x => batch_print(x, "libra", () => {
        catcherZ = "Весы:";
      }));
    else if m.match("[Сс][Кк][Оо][Рр][Пп][Ии][Оо][Нн]|[Ss][Cc][Oo][Rr][Pp][Ii][Oo]") then
    zodiac("scorpio", x => batch_print(x, "scorpio", () => {
        catcherZ = "Скорпион:";
      }));
    else if m.match("[Сс][Тт][Рр][Ее][Лл][Ее][Цц]|[Ss][Aa][Gg][Ii][Tt][Tt][Aa][Rr][Ii][Uu][Ss]") then
    zodiac("sagittarius", x => batch_print(x, "sagittarius", () => {
        catcherZ = "Стрелец:";
      }));
    else if m.match("[Кк][Оо][Зз][Ее][Рр][Оо][Гг]|[Cc][Aa][Pp][Rr][Ii][Cc][Oo][Rr][Nn]") then
    zodiac("capricorn", x => batch_print(x, "capricorn", () => {
        catcherZ = "Козерог:";
      }));
    else if m.match("[Вв][Оо][Дд][Оо][Лл][Ее][Йй]|[Aa][Qq][Uu][Aa][Rr][Ii][Uu][Ss]") then
    zodiac("aquarius", x => batch_print(x, "aquarius", () => {
        catcherZ = "Водолей:";
      }));
		else {
			zodSwitch = true;
      taroSwitch = true;
		}
  }
}

event msg (u, m: "^!taro") => {

  if taroSwitch == true then {
    zodSwitch = false;
    taroSwitch = false;

    a.getLoc(() => {
      user = a.users.find(
          user => user.name === u)

      if user.tripcode then {
        if names.includes(user.tripcode) then {
          a.print("@" + u + " ты сегодня уже гадал, хватит с тебя.");
          zodSwitch = true;
          taroSwitch = true;
        }
        else {
          names.push(user.tripcode);
          taro(x => Taro = x);
          tarFunc(u);
        }
      }
      else if names.includes(u) then {
        a.print("@" + u + " ты сегодня уже гадал, хватит с тебя.");
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
	a.print(m.substring(5));
}

event dm (u, m: "^!отдай$") => {
	a.getLoc(() => {
		user = a.users.find(
		  user => user.name == u)
			
		if user.tripcode == "Leu5XTRpi6" then
		  a.handOver(u);
	})
}

//logs

event [msg, me] (u, m) => {
	if u == "Астролог" then {
		if m.match(catcherZ) then {
		  zodSwitch = true;
			taroSwitch = true;
		}
		else if m.match(catcherT) then {
			taroSwitch = true;
			zodSwitch = true;
		}
	}
	else console.log(u.cyan + ": ".yellow + m.yellow);
}

event dm (u, m) => {
	console.log("ЛС(".yellow + u.cyan + "): ".yellow + m.yellow);
}

event join (u) => console.log("\" ".underline.gray + u.underline.gray + " \" в чате.".underline.gray);
event leave (u) => console.log("\" ".underline.gray + u.underline.gray + " \" покинул(а) чат.".underline.gray);

//logs

}


//-------------------EVENTS-------------------↑

BotLogin = () => {

  if a.load() then {
	  a.join(roomchik, () => {
			a.getLoc(() => {
			  if a.room.roomId == roomchik then {
				  console.log("bot loaded");
				  if a.room.description !== "night | !h - инфа по командам | v1.9" then {
					  a.descr("night | !h - инфа по командам | v1.9");
					  going beginBot;
				  }
				  else going beginBot;
			  }
			  else later 5000 BotLogin();
			})
	  });
  }
  else { 
    a.login(() => {
	    a.save();
	    a.join(roomchik, () => {
			  console.log("bot joined");
				going beginBot;
	    });
    });
  }
}

a = new Bot(__this__, "Астролог", "gg", "ru-RU", "Tv")

roomchik = "2jNEBMDj3E";

BotLogin();
