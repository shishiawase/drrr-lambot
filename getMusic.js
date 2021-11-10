rooms = [];
drrr = {};
finder = {};
times = {};

ytReg = new RegExp("^/m\\s|\\s/m$", "gi");
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
  drrr[num].leave(() => {
    rooms.find((item, ind) => {
      if (item === id) then {
        rooms.splice(ind, 1);
      }
    });
    clearInterval(times[id]);
    delete times[id];
    delete drrr[num];
    console.log("MusicBot " + num + " exit ok.");
  })
}
// launches separate events for the room
getStart = (num, id) => {
  if (!drrr[num]) then {
    drrr[num] = new Bot("MusicBot", "setton");
    drrr[num].login(() => {
      console.log("MusicBot " + num + " login ok.");

      drrr[num].join(id, () => {
        console.log("MusicBot " + num + " join ok.");

        times[id] = setInterval(() => {
          if (drrr[num].room.roomId) then {
            drrr[num].dm("MusicBot", "keep");
          }
          else {
            delEv(num, id);
          }
        }, 60000*10);

        drrr[num].event(["msg", "dm"], (u, m) => {
          if (m.match("/m")) then {
            if (m.match(ytReg)) then {
              yt(m.replace(ytReg, ""), num, (y) => {
                drrr[num].music(y.title, y.link);
              });
            }
          }
        });

        drrr[num].event(["new-description"], (u) => {
          drrr[num].getLoc(() => {
            if (!drrr[num].room.description.match("/getmusic")) then {
              delEv(num, id);
            }
          })
        });

        drrr[num].event(["new-host"], (u, m, url, trip, e) => {
          drrr[num].getLoc(() => {
            if (e.user === drrr[num].profile.name) then {
              if (drrr[num].users.length > 1) then {
                drrr[num].handOver(drrr[num].users[Math.floor(Math.random() * drrr[num].users.length)].name);
              }
              else {
                delEv(num, id);
              }
            }
          })
        });

        drrr[num].print("/m [название или ссылка с YouTube].\nЧтобы бот вышел из комнаты, просто сотрите из описания /getmusic."); // description of functions at the entrance to the room
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

  timer 60000*15 {
    if (!finder.profile) then {
      going Reload;
    }
  }

  timer 5000 {
    finder.getLounge(() => {
      finder.rooms.forEach((room) => {
        if (room.language === "ru-RU") then {
          if (room.description.match("/getmusic")) then {
            if (room.users.length !== room.users.limit) then {
              if (!rooms.includes(room.roomId)) then {
                if (rooms.length !== 5) then {
                  rooms.push(room.roomId);
                  getStart(1, room.roomId);
                }
              }
            }
          }
        }
      })
    })
  }
}

state Reload {
  tryLog();
}

tryLog = () => {
  finder = new Bot(__this__, "gg", "gg");

  finder.login(() => {
    console.log("Finder started.");

    if (!finder.profile) then {
      console.log("Profile undefined.")
      later 5000 tryLog();
    }
    else {
      going Start;
    }
  })
}

tryLog();
