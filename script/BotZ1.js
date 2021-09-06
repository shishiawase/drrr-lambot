BotStart = () => {
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

ytList = {};
numKey = 0;
rapKey = {
	1: "17615408e7msh1bffadfd7506010p1e6ec8jsnc358091cccad",
	2: "9fe6f22586msh294d1b87e05bfa1p188795jsn3ddfe3dd9656",
	3: "9b76d881ffmsh97745cf6d098766p1e5dc1jsncadb8c99aba1",
	4: "2369d56d6bmsh25612cddbfb8cf0p19fd4fjsn92c60017e9e6",
	5: "9f9c174335msh44b8168f4ac9f4cp11ff5cjsn43dbdd28cd76"
}

listDel = (num) => {
	if num > 5 then {
	  delete ytList[num + ""];
		num = num - 1;
		listDel(num);
	}
}

rapKeys = (num) => {
	if num < 5 then {
		numKey++;
		return rapKey[numKey];
	}
	else {
		numKey = 0;
		rapKeys(numKey);
	}
}

//-------------------YOUTUBE-------------------↑

//-------------------TIMERS-------------------↓

time = (type) => {
  date = new Date();
  return date[type]();
}

timer 60000 * 60 {
  if time("getHours") == 20 then {
    upZod();
    names = [];
  }
}

timer 60000 * 15 {
  a.dm(a.profile.name, ".");
}

//-------------------TIMERS-------------------↑

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

//-------------------LONGMSG-------------------↑

//-------------------EVENTS-------------------↓

event [msg, dm] (u, m: "^!h") => {
  batch_print("Команды:\n⤷!zod 'знак' - гороскоп по зодиаку.\n⤷!у 'исполнитель - название' - музыкa с ютуба(на доработке).\n⤷!list - 5 найденных песен по результатам последнего поиска.\n⤷!taro - узнать о мыслях и эмоциях человека по отношению к вам.\n⤷!upd - последнее обновление.", "music");
}

event [msg, dm] (u, m: "^!upd") => {
	a.print("v1.7\n⤷Мелкие правки для зодиака.");
}

event [msg, me] (u, m: "!y") => {
	reY = new RegExp("!y\\s|\\s!y", "gi");
	if m.match(reY) then {
    ytSearch(m.replace(reY, ""), ylist =>  {
			ytList = ylist;
			listDel(ytList.length);
			console.log(ytList);
			ytDownload(ytList[1][2], data => {
				a.music(ytList[1][0], data + "");
			});
		});
  }
}

event msg (u, m) => {
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

event [msg, me] (u, m: "^!list") => {
	console.log(ytList);
  num = m.substring(6);
  if m.match("^!list$") then
    batch_print("Пять песен по результатам последнего поиска:\n⤷1: " + ytList[1][0] + " - " + ytList[1][1] + "\n⤷2: " + ytList[2][0] + " - " + ytList[2][1] + "\n⤷3: " + ytList[3][0] + " - " + ytList[3][1] + "\n⤷4: " + ytList[4][0] + " - " + ytList[4][1] + "\n⤷5: " + ytList[5][0] + " - " + ytList[5][1] + ".\n\nЧтобы выбрать одну из них, введите: !list 'номер'", "music");
  else if (num < 1 || num > 5) then
    a.print("Такого числа нет в списке.");
  else if num.match("^\\d$") then {
    ytDownload(ytList[m.substring(6)][2], rapKeys(numKey), data => {
			if data.msg.match("Long audio") then
				a.print("Длина трека больше 2-х часов, максимум 2 часа. Длина - " + ytList[m.substring(6)][1] + ". !list - выбрать другой.");
      else a.music(ytList[m.substring(6)][0], data.link);
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

event dm (u, m: "^!отдай$") => {
	a.getLoc(() => {
		user = a.users.find(
		  user => user.name == u)
			
		if user.tripcode == "Leu5XTRpi6" then
		  a.handOver(u);
	})
}

}
//-------------------EVENTS-------------------↑

BotLogin = () => {

  if a.load() then {
	  a.join(roomchik, () => {
			if a.room.roomId == roomchik then {
				BotStart();
		    console.log("bot loaded");
			}
			else later 5000 BotLogin();
	  });
  }
  else { 
    a.login(() => {
	    a.save();
	    a.join(roomchik, () => {
			  BotStart();
		    console.log("bot joined");
	    });
    });
  }
}

a = new Bot(__this__, "Астролог", "gg", "ru-RU", "Tv")

roomchik = "Y3XTbeuPNI";

BotLogin();
