rooms = [];
drrr = {};
finder = {};
times = {
  keep: {},
  desc: {}
};

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

        times.keep[id] = setInterval(() => drrr[num].dm("MusicBot", "keep"), 60000*10);

        drrr[num].event(["msg"], (u, m) => {
          if (m.match("!yt")) then {
            if (m.match(ytReg)) then {
              yt(m.replace(ytReg, ""), num, (y) => {
                drrr[num].music(y.title, y.link);
              });
            }
          }
        });

        drrr[num].event(["new-description"], (u) => {
          drrr[num].getLoc(() => {
            if (!drrr[num].room.name.match("/getmusic")) then {
              drrr[num].leave(() => {
                delEv(num, id);
              })
            }
          })
        });

        drrr[num].print("!yt [название или ссылка с ютуба].\nЧтобы бот вышел из комнаты, просто сотрите из описания /getmusic."); // description of functions at the entrance to the room
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

timer 60000*15 {
  if (!finder.profile) then {
    tryLog();
  }
}

tryLog = () => {
  finder = new Bot(__this__, "gg", "gg");

  finder.login(() => {
    console.log("Finder started.");

    if (!finder.profile) then {
      later 5000 tryLog();
    }
    else {
      going Start;
    }
  })
}

tryLog();
