rooms = [];
drrr = {};
times = {};

ytReg = new RegExp("^!yt\\s|\\s!yt$", "gi");
// get music
yt = (req, num, call) => {
  axios("http://astro-tyan.ejemplo.me/ytsearch?title=" + req)
    .then((res) => {

      call(res.data);

    }).catch((err) => {
      console.log("MUSIC REQUEST ERROR: ", err);
      drrr[num].print("Произошла ошибка.");
    })
}
// deleting events and profile after exiting
delEv = (num, id) => {
  rooms.find((item, ind) => {
    if (item === id) then {
      rooms.splice(ind, 1);
    }
  });
  delete times[id];
  delete drrr[num];
  console.log("MusicBot " + num + " exit ok.");
}
// launches separate events for the room
getStart = (num, id) => {
  if (!drrr[num]) then {
    drrr[num] = new Bot("MusicBot", "gg");
    drrr[num].login(() => {
      console.log("MusicBot " + num + " login ok.");

      drrr[num].join(id, () => {
        console.log("MusicBot " + num + " join ok.");

        times[id] = setInterval(() => drrr[num].dm("MusicBot", "keep"), 60000*10);

        drrr[num].event(["msg"], (u, m) => {
          if (m.match("!yt")) then {
            if (m.match(ytReg)) then {
              yt(m.replace(ytReg, ""), num, (y) => {
                drrr[num].music(y.title, y.link);
              });
            }
          }
          else if (m.match("^!ty")) then {
            drrr[num].leave(() => {
              delEv(num, id);
            })
          }
        });

        drrr[num].print("Команды:\n!yt название песни или ссылка с ютуба.\n!ty - бот сваливает(перед этим уберите в описании /getmusic или он придет снова)."); // description of functions at the entrance to the room
      })
    })
  }
  else {
    num++;
    getStart(num, id);
  }
}
// looking for a room that needs music
state Start {
  timer 60000 {
    finder.getLounge(() => {
      finder.rooms.forEach((room) => {
        if (room.language === "ru-RU") then {
          if (room.description.match("/getmusic")) then {
            if (room.users.length !== room.users.limit) then {
              if (!rooms.includes(room.roomId)) then {
                rooms.push(room.roomId);
                getStart(1, room.roomId);
              }
            }
          }
        }
      })
    })
  }
}

finder = new Bot(__this__, "gg", "gg");

finder.login(() => {
  console.log("Finder started.");
  going Start;
});
