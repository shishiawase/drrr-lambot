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
}
lucky = {};

rand = (min,max) => {
  Math.floor(Math.random()*(max-min+1))+min
}

upZod = () => {
	lucky = {
		"aries": [rand(1,12), rand(1,12), rand(0,11)],
		"taurus": [rand(1,12), rand(1,12), rand(0,11)],
		"gemini": [rand(1,12), rand(1,12), rand(0,11)],
		"cancer": [rand(1,12), rand(1,12), rand(0,11)],
		"leo": [rand(1,12), rand(1,12), rand(0,11)],
		"virgo": [rand(1,12), rand(1,12), rand(0,11)],
		"libra": [rand(1,12), rand(1,12), rand(0,11)],
		"scorpio": [rand(1,12), rand(1,12), rand(0,11)],
		"sagittarius": [rand(1,12), rand(1,12), rand(0,11)],
		"capricorn": [rand(1,12), rand(1,12), rand(0,11)],
		"aquarius": [rand(1,12), rand(1,12), rand(0,11)],
		"pisces": [rand(1,12), rand(1,12), rand(0,11)]
	}
}

if lucky.length < 1 then {
	upZod();
}

time = (type) => {
  date = new Date();
  return date[type]();
}

timer 60000*60 {
	if time("getHours") == 20 then
	  upZod();
}

timer 60000*15 {
	a.dm(a.profile.name, ".");
} 

chunkString = (size, str) => {
    pos = 0; chunks = []
    while pos < str.length {
      len = str.substr(pos, size).lastIndexOf(" ")
      len = (if len > size - 30 then len else size)
      chunks.push(str.substr(pos, len))
      pos += len
    }
    return chunks
  }

  batch_print = (msg, type) => {
    delimiter = "."
    buffer = ""; msgs = []
    msg.split(delimiter).forEach(ctx => {
      if ctx.length then
        chunkString(135, ctx + delimiter).forEach(chk => {
          if (buffer.length + chk.length) > 135
          then { msgs.push(buffer); buffer = chk }
          else { buffer = buffer + chk; }
        })
    })
    if(buffer.length) then msgs.push(buffer)
		
	  a.print("Оценка:\n" + "⤷Бизнес: " + lucky[type][0] + "\n⤷Любовь: " + lucky[type][1] + "\n⤷Число дня: " + lucky[type][2]);
	  msgs.reverse();
    msgs.forEach(m => a.print(m));
		a.print(Object.keys(zPic[type])[0], Object.values(zPic[type])[0]);
  }
	
event msg (u, m: "!zod") => {
	
	if m.match("[Рр]ыбы") then
	  zodiac("pisces", x => batch_print(x, "pisces"));
	else if m.match("[Оо]вен") then
	  zodiac("aries", x => batch_print(x, "aries"));
	else if m.match("[Тт]елец") then
	  zodiac("taurus", x => batch_print(x, "taurus"));
	else if m.match("[Бб]лизнецы") then
	  zodiac("gemini", x => batch_print(x, "gemini"));
	else if m.match("[Рр]ак") then
	  zodiac("cancer", x => batch_print(x, "cancer"));
	else if m.match("[Лл]ев") then
	  zodiac("leo", x => batch_print(x, "leo"));
	else if m.match("[Дд]ева") then
	  zodiac("virgo", x => batch_print(x, "virgo"));
	else if m.match("[Вв]есы") then
	  zodiac("libra", x => batch_print(x, "libra"));
	else if m.match("[Сс]корпион") then
	  zodiac("scorpio", x => batch_print(x, "scorpio"));
	else if m.match("[Сс]трелец") then
	  zodiac("sagittarius", x => batch_print(x, "sagittarius"));
	else if m.match("[Кк]озерог") then
	  zodiac("capricorn", x => batch_print(x, "capricorn"));
	else if m.match("[Вв]одолей") then
	  zodiac("aquarius", x => batch_print(x, "aquarius"));
}

event [msg, me] (u, m) => {
	if u !== a.profile.name then
	console.log(u + ": " + m);
}

a = new Bot(__this__, "Астролог", "gg", "ru-RU", "Tv")
a.login(() => {
	a.create("Гороскоп", "night | Когда-нибудь здесь будет таро... | !zod знак", "12", "ru-RU", true, false, false, () => {
		console.log(a.room.roomId);
	})
})