const { Bot, listen } = require('./bot');
const axios = require('axios');
var finder = new Bot("finder", "gg");

let drrr = {};
let rooms = [];
let blacklist = [];
let times = {};
let leaveCheck = {};

const ytReg = new RegExp("^/m\\s|\\s/m$", "gi");

finder.timers = {};
// transfer host to random user
randHost = (num, min, max) => {
  drrr[num].getLoc(() => {
    let uL = drrr[num].users.length;
    let arg = Math.floor(Math.random() * (max - min + 1)) + min;
    let uN = drrr[num].users[arg].name;

    if (uN !== "MusicBot") {
      drrr[num].handOver(uN);
      console.log("Transfer host to - ", uN);
    } else rand(num, min, uL - 1);
  })

}
// get music
yt = (req, num, call) => {
  url = encodeURIComponent(req);

  axios("https://astro-tyan.loca.lt/ytsearch?title=" + url, {
    'method': 'GET',
    'headers': {
      'Bypass-Tunnel-Reminder': '*'
    }
  })
    .then((res) => {

      call(res.data);

    }).catch((err) => {
      console.log("MUSIC REQUEST ERROR: ", err);
      drrr[num].print("Произошла ошибка.");
    })
}
// rand songs
ytRand = (num, call) => {
  axios("https://astro-tyan.loca.lt/rand", {
    'method': 'GET',
    'headers': {
      'Bypass-Tunnel-Reminder': '*'
    }
  })
    .then((res) => call(res.data)).catch((err) => {
      console.log("MUSIC RAND REQUEST ERROR: ", err);
      drrr[num].print("Произошла ошибка.");
    })
}
// deleting events and profile after exiting
delEv = (num, id) => {
  if (leaveCheck[id] === true) {
    drrr[num].leave(() => {
      rooms.find((item, ind) => {
        if (item === id) {
          rooms.splice(ind, 1);
        }
      });
      clearInterval(times[id]);
      delete times[id];
      delete drrr[num];
      console.log("MusicBot " + num + " exit ok.");
    })
  }
  else setTimeout(() => delEv(num, id), 1000);
}
// launches separate events for the room
getStart = (num, id) => {
  leaveCheck[id] = false;

  if (!drrr[num]) {
    drrr[num] = new Bot("MusicBot", "setton");
    drrr[num].login(() => {
      console.log("MusicBot " + num + " login ok.");

      drrr[num].join(id, () => {
        drrr[num].specId = id;
        setTimeout(() => leaveCheck[id] = true, 8000);
        console.log("MusicBot " + num + " join ok.");

        times[id] = setInterval(() => drrr[num].dm("MusicBot", "keep"), 60000*10);

        drrr[num].event(["msg", "dm"], (u, m) => {
          if (m.match("/m")) {
            if (m.match(ytReg)) {
              yt(m.replace(ytReg, ""), num, (y) => {
                drrr[num].music(y.title, y.link);
              });
            }
          }
          else if (m.match("/rand")) {
            ytRand(num, (y) => {
              drrr[num].music(y.title, y.link);
            });
          }
        });

        drrr[num].event(["new-description"], (u) => {
          drrr[num].getLoc(() => {
            if (!drrr[num].room.description.match("/getmusic")) {
              delEv(num, id);
            }
          })
        });

        drrr[num].event(["new-host"], (u, m, url, trip, e) => {
          drrr[num].getLoc(() => {
            if (e.user === drrr[num].profile.name) {
              if (drrr[num].users.length > 1) {
                randHost(num, 0, drrr[num].users.length - 1);
              }
              else {
                delEv(num, id);
              }
            }
          })
        });

        drrr[num].event(["kick", "ban"], (u, m, url, trip, e) => {
          drrr[num].getLoc(() => {
            if (drrr[num].lastTalk.message.match("kicked|banned")) {
              console.log(num + " you get a " + e.type)
              blacklist.push(drrr[num].specId);
              delEv(num, id);
            }
          })
        });

        drrr[num].print("Командa:\n/m [название или ссылка с YouTube].\n/rand - рандомная песня.\nЧтобы бот вышел из комнаты, просто сотрите из описания /getmusic."); // description of functions at the entrance to the room
      })
    })
  }
  else {
    num++;
    getStart(num, id);
  }
}
// looking for a room that needs music
finder.state("Start", () => {

  finder.timers.head = setInterval(() => {
    if (!finder.profile) {
      console.log("Profile undefined, try login...");
      finder.going("Reload");
    }
  }, 60000*15);

  finder.timers.undefined = setInterval(() => {
    if (Object.keys(drrr).length > 0) {
      Object.keys(drrr).forEach((num) => {
        drrr[num].getLoc(() => {
          if (!drrr[num].room.roomId) {
            console.log(num + " room ID undefined");
            delEv(num, drrr[num].specId);
          }
        })
      });
    }
  }, 60000);

  finder.timers.lounge = setInterval(() => {

    finder.getLounge(() => {
      finder.rooms.forEach((room) => {
        if (room.language === "ru-RU") {
          if (room.music === true) {
            if (room.description.match("/getmusic")) {
              if (!blacklist.includes(room.roomId)) {
                if (room.total !== room.limit) {
                  if (!rooms.includes(room.roomId)) {
                    if (rooms.length !== 5) {
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
  }, 5000);
});

finder.state("Reload", () => {
  clearInterval(finder.timers.head);
  clearInterval(finder.timers.undefined);
  clearInterval(finder.timers.lounge);
  tryLog();
});

tryLog = () => {
  if (finder.load()) {
    console.log("Finder reloaded");
    finder.going("Start");
  } else {
    finder.login(() => {
      finder.save();
      console.log("Finder started.");

      if (!finder.profile) {
        console.log("Login error.");
        setTimeout(() => tryLog(), 5000);
      }
      else {
        finder.going("Start");
      }
    })
  }
}

tryLog();
