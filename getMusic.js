rooms = [];
blacklist = [];
drrr = {};
finder = {};
times = {};
leaveCheck = {};

ytReg = new RegExp("^/m\\s|\\s/m$", "gi");
// rand
rand = (min, max) => {
  Math.floor(Math.random() * (max - min + 1)) + min
}
// get music
yt = (req, num, call) => {
  url = encodeURIComponent(req);

  axios("http://astro-tyan.ejemplo.me/ytsearch?title=" + url)
    .then((res) => {

      call(res.data);

    }).catch((err) => {
      console.log("MUSIC REQUEST ERROR: ", err);
      drrr[num].print("Произошла ошибка.");
    })
}
// deleting events and profile after exiting
delEv = (num, id) => {
  if (leaveCheck[id] === true) then {
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
  else later 1000 delEv(num, id);
}
// launches separate events for the room
getStart = (num, id) => {
  leaveCheck[id] = false;

  if (!drrr[num]) then {
    drrr[num] = new Bot("MusicBot", "setton");
    drrr[num].login(() => {
      console.log("MusicBot " + num + " login ok.");

      drrr[num].join(id, () => {
        drrr[num].specId = id;
        later 8000 leaveCheck[id] = true;
        console.log("MusicBot " + num + " join ok.");

        times[id] = setInterval(() => drrr[num].dm("MusicBot", "keep"), 60000*10);

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
                drrr[num].handOver(drrr[num].users[rand(1, Math.floor(Math.random() * drrr[num].users.length) + 2)].name);
              }
              else {
                delEv(num, id);
              }
            }
          })
        });

        drrr[num].event(["kick", "ban"], (u, m, url, trip, e) => {
          drrr[num].getLoc(() => {
            if (drrr[num].lastTalk.message.match("kicked|banned")) then {
              console.log(num + " you get a " + e.type)
              blacklist.push(drrr[num].specId);
              delEv(num, id);
            }
          })
        });

        drrr[num].print("Командa:\n/m [название или ссылка с YouTube].\nЧтобы бот вышел из комнаты, просто сотрите из описания /getmusic."); // description of functions at the entrance to the room
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
      console.log("Profile undefined, try login...");
      going Reload;
    }
  }

  timer 60000 {
    if (Object.keys(drrr).length > 0) then {
      Object.keys(drrr).forEach((num) => {
        drrr[num].getLoc(() => {
          if (!drrr[num].room.roomId) then {
            delEv(num, drrr[num].specId);
          }
        })
      });
    }
  }

  timer 5000 {

    finder.getLounge(() => {
      finder.rooms.forEach((room) => {
        if (room.language === "ru-RU") then {
          if (room.music === true) then {
            if (room.description.match("/getmusic")) then {
              if (!blacklist.includes(room.roomId)) then {
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
      console.log("Login error.");
      later 5000 tryLog();
    }
    else {
      going Start;
    }
  })
}

tryLog();
